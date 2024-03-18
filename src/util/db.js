import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
  const DB_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(DB_URI);

    console.log("Database connection established");
  } catch (error) {
    console.log("Failed to connect to Database");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
