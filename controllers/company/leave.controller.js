import Leave from "../../models/companyModels/Leave.js";

// Create a new leave request
export const createLeave = async (req, res) => {
  try {
    const { user, type, startDate, endDate, reason } = req.body;
    const leave = await Leave.create({
      user,
      type,
      startDate,
      endDate,
      reason,
    });
    res.status(201).json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating leave",
      error: error.message,
    });
  }
};

// Get all leave requests
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("user");
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching leaves",
      error: error.message,
    });
  }
};

// Get leave request by ID
export const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate("user");
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching leave",
      error: error.message,
    });
  }
};

// Update leave request by ID
export const updateLeave = async (req, res) => {
  try {
    const { type, startDate, endDate, status, reason } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { type, startDate, endDate, status, reason },
      { new: true, runValidators: true }
    );
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating leave",
      error: error.message,
    });
  }
};

// Delete leave request by ID
export const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting leave",
      error: error.message,
    });
  }
};
