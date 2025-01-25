import Job from "../../models/companyModels/Job.js";

// Create a new job listing
export const createJob = async (req, res) => {
  try {
    const {
      title,
      department,
      description,
      requirements,
      salaryRange,
      postedBy,
    } = req.body;
    const job = await Job.create({
      title,
      department,
      description,
      requirements,
      salaryRange,
      postedBy,
    });
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message,
    });
  }
};

// Get all job listings
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("department").populate("postedBy");
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

// Get a job listing by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("department")
      .populate("postedBy");
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching job",
      error: error.message,
    });
  }
};

// Update a job listing by ID
export const updateJob = async (req, res) => {
  try {
    const {
      title,
      department,
      description,
      requirements,
      salaryRange,
      status,
    } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { title, department, description, requirements, salaryRange, status },
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};

// Delete a job listing by ID
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting job",
      error: error.message,
    });
  }
};
