import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {

        }).then((mongoose) => {
            console.log("MongoDB Connected");
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default connectDb;

//Connect in local Machine
// import mongoose from "mongoose";
// const connectDb = async () => {
//     try {
//         const conn = await mongoose.connect('mongodb://localhost:27017/chai');
//     } catch (error) {
//         console.error(error.message);
//         process.exit(1);
//     }
// }


// export default connectDb;