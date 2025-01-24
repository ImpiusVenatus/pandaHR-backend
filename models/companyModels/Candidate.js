import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    resume: { type: String }, // URL to uploaded resume
    status: {
      type: String,
      enum: ["Applied", "Interviewing", "Hired", "Rejected"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
