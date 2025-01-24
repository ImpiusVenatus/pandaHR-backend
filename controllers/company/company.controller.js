import Company from "../models/Company.js";

// Create a new company
export const createCompany = async (req, res) => {
  try {
    const {
      name,
      logo,
      address,
      phoneNumber,
      email,
      departments,
      employees,
      jobs,
      holidays,
      createdBy,
    } = req.body;
    const company = await Company.create({
      name,
      logo,
      address,
      phoneNumber,
      email,
      departments,
      employees,
      jobs,
      holidays,
      createdBy,
    });
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating company",
        error: error.message,
      });
  }
};

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate(
      "departments employees jobs holidays createdBy"
    );
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching companies",
        error: error.message,
      });
  }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate(
      "departments employees jobs holidays createdBy"
    );
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching company",
        error: error.message,
      });
  }
};

// Update company by ID
export const updateCompany = async (req, res) => {
  try {
    const {
      name,
      logo,
      address,
      phoneNumber,
      email,
      departments,
      employees,
      jobs,
      holidays,
    } = req.body;
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name,
        logo,
        address,
        phoneNumber,
        email,
        departments,
        employees,
        jobs,
        holidays,
      },
      { new: true, runValidators: true }
    );
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating company",
        error: error.message,
      });
  }
};

// Delete company by ID
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting company",
        error: error.message,
      });
  }
};
