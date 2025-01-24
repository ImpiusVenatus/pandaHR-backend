import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    description: { type: String, required: true },
    requirements: [String],
    salaryRange: { min: Number, max: Number },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // HR or manager
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
