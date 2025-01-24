import Candidate from "../models/Candidate.js";

// Create a new candidate
export const createCandidate = async (req, res) => {
  try {
    const { job, name, email, phone, resume, status } = req.body;
    const candidate = await Candidate.create({
      job,
      name,
      email,
      phone,
      resume,
      status,
    });
    res.status(201).json({ success: true, data: candidate });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating candidate",
        error: error.message,
      });
  }
};

// Get all candidates
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().populate("job", "title");
    res.status(200).json({ success: true, data: candidates });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching candidates",
        error: error.message,
      });
  }
};

// Get a candidate by ID
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate(
      "job",
      "title"
    );
    if (!candidate) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching candidate",
        error: error.message,
      });
  }
};

// Update a candidate by ID
export const updateCandidate = async (req, res) => {
  try {
    const { status } = req.body; // Update status or other fields as needed
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!candidate) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating candidate",
        error: error.message,
      });
  }
};

// Delete a candidate by ID
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Candidate deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting candidate",
        error: error.message,
      });
  }
};
