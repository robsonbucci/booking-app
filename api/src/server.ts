import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || "3000";

const conn = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO;

    if (!mongoURI) {
      throw new Error("MONGO URI is not defined in environment variables");
    }

    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
