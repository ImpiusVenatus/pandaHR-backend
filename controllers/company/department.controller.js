import Department from "../../models/companyModels/Department.js";
import Company from "../../models/companyModels/Company.js";
import Employee from "../../models/employeeModels/Employee.js";
import mongoose from "mongoose";

// CREATE a new department for a specific company
export const createDepartment = async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const name = req.body.name;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    const objectId = new mongoose.Types.ObjectId(companyId);
    const company = await Company.findById(objectId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Create the department
    const department = await Department.create({ name, companyId });
    console.log(department);
    // Add the department to the company
    await Company.findByIdAndUpdate(companyId, {
      $push: { departments: department._id },
    });

    res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating department", error: error.message });
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid Company ID format" });
    }

    // Find the company and its departments
    const company = await Company.findById(companyId).populate("departments");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Fetch all departments
    const departments = await Department.find({
      _id: { $in: company.departments },
    });

    // Fetch employees for each department
    const departmentsWithEmployees = await Promise.all(
      departments.map(async (department) => {
        const employees = await Employee.find({
          _id: { $in: department.employees },
        });
        return { ...department.toObject(), employees };
      })
    );

    res.status(200).json({ departments: departmentsWithEmployees });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
};
// READ a single department by ID and ensure it belongs to the given company
export const getDepartmentById = async (req, res) => {
  try {
    const { companyId, id } = req.params;

    const department = await Department.findOne({
      _id: id,
      companyId,
    }).populate("manager employees");

    if (!department) {
      return res.status(404).json({
        message: "Department not found or does not belong to this company",
      });
    }

    res.status(200).json({ department });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching department", error: error.message });
  }
};

// UPDATE a department ensuring it belongs to the specified company
export const updateDepartment = async (req, res) => {
  try {
    const { companyId, id } = req.params;
    const { name, manager, employees } = req.body;

    const updatedDepartment = await Department.findOneAndUpdate(
      { _id: id, companyId }, // Ensure the department belongs to the company
      { name, manager, employees },
      { new: true }
    ).populate("manager employees");

    if (!updatedDepartment) {
      return res.status(404).json({
        message: "Department not found or does not belong to this company",
      });
    }

    res.status(200).json({
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating department", error: error.message });
  }
};

// DELETE a department ensuring it belongs to the specified company
export const deleteDepartment = async (req, res) => {
  try {
    const { companyId, id } = req.params;

    const deletedDepartment = await Department.findOneAndDelete({
      _id: id,
      companyId,
    });

    if (!deletedDepartment) {
      return res.status(404).json({
        message: "Department not found or does not belong to this company",
      });
    }

    // Remove the department from the company
    await Company.findByIdAndUpdate(companyId, { $pull: { departments: id } });

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting department", error: error.message });
  }
};

// ADD employee(s) to a department ensuring it belongs to the specified company
export const addEmployeeToDepartment = async (req, res) => {
  try {
    const { companyId, id } = req.params; // Company ID and Department ID
    const { employees } = req.body;

    if (!employees || employees.length === 0) {
      return res.status(400).json({ message: "Employee(s) data is required" });
    }

    // Ensure the department belongs to the specified company
    const department = await Department.findOne({ _id: id, companyId });
    if (!department) {
      return res.status(404).json({
        message: "Department not found or does not belong to this company",
      });
    }

    // Update the department by adding new employees
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { $addToSet: { employees: { $each: employees } } },
      { new: true }
    ).populate("manager employees");

    res.status(200).json({
      message: "Employees added successfully to the department",
      department: updatedDepartment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding employees to department",
      error: error.message,
    });
  }
};
