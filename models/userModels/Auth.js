import mongoose from "mongoose";

const { Schema, model } = mongoose;

const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      enum: ["Admin", "HR Manager", "Employee"],
      default: "Employee",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = model("Auth", authSchema);

export default Auth;
