import Job from "../../models/companyModels/Job.js";
import Company from "../../models/companyModels/Company.js";
import User from "../../models/userModels/User.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const {
      companyId,
      title,
      departmentId,
      type,
      salary,
      location,
      place,
      postedBy,
    } = req.body;

    // Check if all required fields are present
    if (
      !companyId ||
      !title ||
      !departmentId ||
      !type ||
      !salary ||
      !location ||
      !place ||
      !postedBy
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate if company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company does not exist" });
    }

    // Validate if department exists in the company
    if (!company.departments.includes(departmentId)) {
      return res.status(400).json({
        success: false,
        message: "Department does not exist in this company",
      });
    }

    // Validate if the postedBy user exists
    const user = await User.findById(postedBy);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User (postedBy) does not exist" });
    }

    // Create the job after all validations pass
    const job = new Job(req.body);
    await job.save();

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all jobs by companyId
export const getAllJobs = async (req, res) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res
        .status(400)
        .json({ success: false, message: "Company ID is required" });
    }
    const jobs = await Job.find({ companyId });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a job by ID
export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Job ID is required" });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a job by ID
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Job ID is required" });
    }

    // Ensure the status is a valid value
    const allowedStatuses = ["Active", "Inactive", "Completed"];
    if (req.body.status && !allowedStatuses.includes(req.body.status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    // Update the job's status
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a job by ID
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Job ID is required" });
    }
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
