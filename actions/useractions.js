
'use server'

import connectDb from "@/utils/db/connectDb";
import User from "@/models/User";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";

export const initiate = async (amount, to_user, paymentform) => {
    // ... (This function is fine)
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
        amount: Number.parseInt(amount),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
            name: paymentform.name,
            message: paymentform.message
        }
    };
    let x = await instance.orders.create(options);
    await Payment.create({
        amount: amount / 100,
        to_user: user.username,
        oid: x.id,
        status: "pending",
        message: paymentform.message,
        name: paymentform.name,
    });
    return x;
}

export const fetchuser = async (username) => {
    // ... (This function is fine)
    await connectDb();
    let u = await User.findOne({ username: username }).lean();
    if (!u) return null;
    return {
        ...u,
        _id: u._id.toString(),
        createdAt: u.createdAt?.toISOString?.() || null,
        updatedAt: u.updatedAt?.toISOString?.() || null,
    };
}

export const fetchpayments = async (username) => {
    // ... (This function is fine)
    await connectDb();
    let p = await Payment.find({ to_user: username, done: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();
    return p.map(pay => ({
        ...pay,
        _id: pay._id.toString(),
        createdAt: pay.createdAt?.toISOString?.() || null,
        updatedAt: pay.updatedAt?.toISOString?.() || null,
    }));
}

export const updateProfile = async (data, oldusername) => {
    await connectDb();
    let ndata = data;
    try {
        if (oldusername !== ndata.username) {
            // ✅ CORRECTED: Check if the NEW username is already taken
            let u = await User.findOne({ username: ndata.username });
            if (u) {
                return { error: "Username already exists" };
            }
            // If available, update the user found by their OLD username
            await User.updateOne({ username: oldusername }, ndata);
        } else {
            // If username is not changing, just update the data
            await User.updateOne({ username: oldusername }, ndata);
        }
        return { success: true };
    } catch (error) {
        return { error: error.message || "Update failed" };
    }
    // ❌ REMOVED: This line was unreachable and redundant
    // await User.updateOne({ email: ndata.email }, ndata);
}