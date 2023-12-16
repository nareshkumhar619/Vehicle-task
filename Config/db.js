import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.log(`Error in connecting to the Database:`, error);
  }
};
