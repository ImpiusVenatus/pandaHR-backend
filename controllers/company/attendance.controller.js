import Attendance from "../../models/companyModels/Attendance.js";

// Create a new attendance record
export const createAttendance = async (req, res) => {
  try {
    const { user, date, status, checkIn, checkOut } = req.body;
    const attendance = await Attendance.create({
      user,
      date,
      status,
      checkIn,
      checkOut,
    });
    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating attendance record",
      error: error.message,
    });
  }
};

// Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate(
      "user",
      "fullName"
    );
    res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching attendance records",
      error: error.message,
    });
  }
};

// Get a single attendance record by ID
export const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate(
      "user",
      "fullName"
    );
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found" });
    }
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching attendance record",
      error: error.message,
    });
  }
};

// Update an attendance record by ID
export const updateAttendance = async (req, res) => {
  try {
    const { status, checkIn, checkOut } = req.body;
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status, checkIn, checkOut },
      { new: true, runValidators: true }
    );
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found" });
    }
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating attendance record",
      error: error.message,
    });
  }
};

// Delete an attendance record by ID
export const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found" });
    }
    res.status(200).json({
      success: true,
      message: "Attendance record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting attendance record",
      error: error.message,
    });
  }
};
