import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      connectTimeoutMS: 10000, // Timeout after 10 seconds if initial connection fails.
      socketTimeoutMS: 45000, // Timeout after 45 seconds of inactivity.
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message);
    process.exit(1); // Exit the process if the connection fails.
  }
};

export default connectToMongoDB;
