import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // References a User as manager
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of employees in the department
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
