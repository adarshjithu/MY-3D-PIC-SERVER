import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
        console.log("Database connected successfully");
    } catch (error: any) {
        console.log(error?.message);
    }
};
