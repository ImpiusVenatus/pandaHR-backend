import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
