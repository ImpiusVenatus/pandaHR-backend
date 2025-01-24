import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, trim: true }, // URL for company logo
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zip: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    phoneNumber: { type: String, trim: true },
    email: { type: String, trim: true },
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    holidays: [{ type: mongoose.Schema.Types.ObjectId, ref: "Holiday" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
