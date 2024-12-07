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
      required: true,
      unique: true,
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
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
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
