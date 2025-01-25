import Holiday from "../../models/companyModels/Holiday.js";

// Create a new holiday
export const createHoliday = async (req, res) => {
  try {
    const { name, date, description } = req.body;
    const holiday = await Holiday.create({ name, date, description });
    res.status(201).json({ success: true, data: holiday });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating holiday",
      error: error.message,
    });
  }
};

// Get all holidays
export const getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.status(200).json({ success: true, data: holidays });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching holidays",
      error: error.message,
    });
  }
};

// Get a holiday by ID
export const getHolidayById = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) {
      return res
        .status(404)
        .json({ success: false, message: "Holiday not found" });
    }
    res.status(200).json({ success: true, data: holiday });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching holiday",
      error: error.message,
    });
  }
};

// Update a holiday by ID
export const updateHoliday = async (req, res) => {
  try {
    const { name, date, description } = req.body;
    const holiday = await Holiday.findByIdAndUpdate(
      req.params.id,
      { name, date, description },
      { new: true, runValidators: true }
    );
    if (!holiday) {
      return res
        .status(404)
        .json({ success: false, message: "Holiday not found" });
    }
    res.status(200).json({ success: true, data: holiday });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating holiday",
      error: error.message,
    });
  }
};

// Delete a holiday by ID
export const deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndDelete(req.params.id);
    if (!holiday) {
      return res
        .status(404)
        .json({ success: false, message: "Holiday not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Holiday deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting holiday",
      error: error.message,
    });
  }
};
