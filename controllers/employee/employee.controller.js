import Employee from "../../models/employeeModels/Employee.js";

// Add a new employee
export const addEmployee = async (req, res) => {
  try {
    const { name, department, designation, type, status, companyId } = req.body;

    const newEmployee = new Employee({
      name,
      department,
      designation,
      type,
      status,
      companyId,
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add employee", error: error.message });
  }
};

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Fetch employees with pagination
    const employees = await Employee.find()
      .skip((pageNumber - 1) * limitNumber) // Skip the documents for previous pages
      .limit(limitNumber); // Limit the number of documents

    // Get the total count of employees for pagination meta
    const totalEmployees = await Employee.countDocuments();

    res.status(200).json({
      employees,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalEmployees / limitNumber),
      totalEmployees,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employees", error: error.message });
  }
};

// Get an employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employee", error: error.message });
  }
};

// Update an employee by ID
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id },
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update employee", error: error.message });
  }
};

// Remove an employee by ID
export const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findOneAndDelete({ id });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete employee", error: error.message });
  }
};

export const getEmployeesByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Fetch employees belonging to the specified company
    const employees = await Employee.find({ companyId: companyId }).populate(
      "department"
    );

    if (!employees.length) {
      return res.status(404).json({
        success: false,
        message: "No employees found for this company",
      });
    }

    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching employees",
      error: error.message,
    });
  }
};

export const getEmployeeCountByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    const totalEmployees = await Employee.countDocuments({ companyId });

    res.json({ totalEmployees });
  } catch (error) {
    console.error("Error fetching employee count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
