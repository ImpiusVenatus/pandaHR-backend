import Holiday from "../../models/companyModels/Holiday.js";

// Create a new holiday
export const createHoliday = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging: Log request body

    const { name, date, description, companyId } = req.body;

    if (!companyId) {
      console.error("Validation Error: Company ID is missing");
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    console.log("Creating holiday with data:", {
      name,
      date,
      description,
      companyId,
    }); // Debugging: Log data before DB operation

    const holiday = await Holiday.create({
      name,
      date,
      description,
      companyId,
    });

    console.log("Holiday created successfully:", holiday); // Debugging: Log created holiday

    res.status(201).json({ success: true, data: holiday });
  } catch (error) {
    console.error("Error creating holiday:", error); // Debugging: Log error details
    res.status(500).json({
      success: false,
      message: "Error creating holiday",
      error: error.message,
    });
  }
};

// Get all holidays for a specific company
export const getAllHolidays = async (req, res) => {
  try {
    let { companyId } = req.query;

    if (!companyId || companyId === "null") {
      return res.status(400).json({
        success: false,
        message: "Valid Company ID is required",
      });
    }

    // Ensure companyId is a valid ObjectId
    if (!companyId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Company ID format",
      });
    }

    const holidays = await Holiday.find({ companyId });

    res.status(200).json({ success: true, data: holidays });
  } catch (error) {
    console.error("Error fetching holidays:", error);
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
    const { name, date, description, companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    const holiday = await Holiday.findOneAndUpdate(
      { _id: req.params.id, companyId }, // Ensure the holiday belongs to the company
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
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    const holiday = await Holiday.findOneAndDelete({
      _id: req.params.id,
      companyId,
    });

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
