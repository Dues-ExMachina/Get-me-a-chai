import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    to_user: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },
    oid: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    },

});

// Export the Payment model 
export default mongoose.models.Payment || model("Payment", PaymentSchema);
// export const Payment = mongoose.model('Payment', PaymentSchema);