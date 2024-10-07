import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO;

        if (!mongoURI) {
            throw new Error("MONGO URI is not defined in environment variables");
        }

        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectToDatabase;
