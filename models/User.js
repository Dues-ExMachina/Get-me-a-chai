import mongoose from "mongoose";
const { Schema, model } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String, required: true, unique: true,
    },
    profilepic: {
        type: String, default: "",
    },
    coverpic: {
        type: String, default: "",
    },
    username: {
        type: String, required: true, unique: true,
    },
    createdAt: {
        type: Date, default: Date.now,
    },
    updatedAt: {
        type: Date, default: Date.now,
    },
    Razorpayid: {
        type: String,

    },
    Razorpaysecret: {
        type: String,

    },
});



const models = mongoose.models || {};

export default models.User || model("User", UserSchema);
