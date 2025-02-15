import mongoose from "mongoose";
import Payroll from "../../models/companyModels/Payroll.js";

// Create Payroll
export const createPayroll = async (req, res) => {
  try {
    const { employeeId, monthlySalary, CTC } = req.body;

    console.log(req.body);

    if (!employeeId || !monthlySalary || !CTC) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const payroll = await Payroll.create({
      employeeId, // Mapping employeeId to user
      monthlySalary, // Mapping monthlySalary to salary
      CTC,
      status: "Pending", // Default status
    });

    res.status(201).json({ success: true, data: payroll });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating payroll",
      error: error.message,
    });
  }
};

// Get all payroll entries
export const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("employeeId", "name");
    res.status(200).json({ success: true, data: payrolls });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payrolls",
      error: error.message,
    });
  }
};

// Get payroll entry by ID
export const getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate(
      "employeeId"
    );
    if (!payroll) {
      return res
        .status(404)
        .json({ success: false, message: "Payroll entry not found" });
    }
    res.status(200).json({ success: true, data: payroll });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payroll",
      error: error.message,
    });
  }
};

// Update payroll entry by ID
export const updatePayroll = async (req, res) => {
  try {
    const { status } = req.body; // Only extract status from the request body

    // Only update the status field
    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      { status }, // Update only the status field
      { new: true, runValidators: true }
    );

    if (!payroll) {
      return res
        .status(404)
        .json({ success: false, message: "Payroll entry not found" });
    }

    res.status(200).json({ success: true, data: payroll });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating payroll",
      error: error.message,
    });
  }
};

// Delete payroll entry by ID
export const deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id);
    if (!payroll) {
      return res
        .status(404)
        .json({ success: false, message: "Payroll entry not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Payroll entry deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting payroll",
      error: error.message,
    });
  }
};
