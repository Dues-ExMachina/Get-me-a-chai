'use server'

import connectDb from "@/utils/db/connectDb";
import User from "@/models/User";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";


export const initiate = async (amount, to_user, paymentform) => {
    await connectDb();

    const user = await User.findOne({ username: to_user });
    if (!user) {
        throw new Error("User not found");
    }

    var instance = new Razorpay({

        key_id: user.Razorpayid,
        key_secret: user.Razorpaysecret
    });

    let options = {
        amount: Number.parseInt(amount), // amount in the smallest currency unit
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
            name: paymentform.name,
            message: paymentform.message
        }
    };
    let x = await instance.orders.create(options);

    // Create a payment object which shows pending payment
    await Payment.create({
        amount: amount / 100,
        to_user: user.username,
        oid: x.id, // This must match razorpay_order_id sent to your webhook/callback
        status: "pending",
        message: paymentform.message,
        name: paymentform.name,
    });
    return x;
}

export const fetchuser = async (username) => {
    await connectDb();
    let u = await User.findOne({ username: username }).lean();
    if (!u) return null;
    // Convert _id and dates to string
    return {
        ...u,
        _id: u._id.toString(),
        createdAt: u.createdAt?.toISOString?.() || null,
        updatedAt: u.updatedAt?.toISOString?.() || null,
    };

}

//fetchpayments
export const fetchpayments = async (username) => {
    await connectDb();
    let p = await Payment.find({ to_user: username, done: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();
    // Convert _id and dates to string for each payment
    return p.map(pay => ({
        ...pay,
        _id: pay._id.toString(),
        createdAt: pay.createdAt?.toISOString?.() || null,
        updatedAt: pay.updatedAt?.toISOString?.() || null,
    }));
}


// Update Profile
export const updateProfile = async (data, oldusername) => {
    await connectDb();
    let ndata = data;
    try {
        // Check if username is being changed, cehck if new username is available
        if (oldusername !== ndata.username) {
            let u = await User.findOne({ username: oldusername });
            if (u) {
                return { error: "Username already exists" };
            }
        }
        await User.updateOne({ username: oldusername }, ndata);
        return { success: true };
    } catch (error) {
        return { error: error.message || "Update failed" };
    }
    await User.updateOne({ email: ndata.email }, ndata);
}


