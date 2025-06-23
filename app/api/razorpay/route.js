import { NextResponse } from "next/server";
import crypto from "crypto";
import Payment from "@/models/Payment";
import connectDb from "@/utils/db/connectDb";
import User from "@/models/User";

export const POST = async (request) => {
    await connectDb();
    let body = await request.formData();
    body = Object.fromEntries(body);

    // Check if payment exists
    const p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ success: false, message: "Order ID not found" });
    }

    //fetch thhe Razorpay secret from db
    let user = await User.findOne({ username: p.to_user });
    const razorpaySecret = user?.Razorpaysecret;

    // Manual signature verification
    const generated_signature = crypto
        .createHmac("sha256", razorpaySecret)
        .update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`)
        .digest("hex");

    if (generated_signature === body.razorpay_signature) {
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            to_user: updatedPayment.to_user,
        });
    } else {
        return NextResponse.json({ success: false, message: "Payment verification failed" });
    }
};
