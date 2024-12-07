import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth", // Reference to the Auth model
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
    },
    companyName: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    hireDate: {
      type: Date,
    },
    joinDate: {
      type: Date,
    },
    leaveDate: {
      type: Date,
    },
    workHours: {
      type: Number,
    },
    salary: {
      type: Number,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zip: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    emergencyContacts: [
      {
        name: { type: String, trim: true },
        relationship: { type: String, trim: true },
        phone: { type: String, trim: true },
      },
    ],
    employmentStatus: {
      type: String,
      enum: ["Active", "On Leave", "Terminated"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
