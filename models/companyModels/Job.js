import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract"],
      required: true,
    },
    salary: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Completed"],
      default: "Active",
    },
    location: { type: String, enum: ["Remote", "On-site"], required: true },
    place: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // HR or manager
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
