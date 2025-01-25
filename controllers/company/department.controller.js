import Department from "../../models/companyModels/Department.js";
import Company from "../../models/companyModels/Company.js"; // Assuming departments belong to a company

// CREATE a new department
export const createDepartment = async (req, res) => {
  try {
    const { name, manager, employees, companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    // Create the department
    const department = await Department.create({ name, manager, employees });

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

// READ all departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("manager employees");
    res.status(200).json({ departments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
};

// READ a single department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id).populate(
      "manager employees"
    );

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ department });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching department", error: error.message });
  }
};

// UPDATE a department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, manager, employees } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { name, manager, employees },
      { new: true }
    ).populate("manager employees");

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
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

// DELETE a department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Remove the department from the company
    await Company.findOneAndUpdate(
      { departments: id },
      { $pull: { departments: id } }
    );

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting department", error: error.message });
  }
};
