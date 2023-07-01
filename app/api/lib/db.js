import mongoose from "mongoose";

const password = encodeURIComponent("9150596306@sS");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://selva:${password}@my-demo-app.2y9dzxz.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
