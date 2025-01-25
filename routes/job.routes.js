import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/company/job.controller.js";

const router = express.Router();

// Route to create a new job listing
router.post("/", createJob);

// Route to get all job listings
router.get("/", getAllJobs);

// Route to get a job listing by ID
router.get("/:id", getJobById);

// Route to update a job listing by ID
router.put("/:id", updateJob);

// Route to delete a job listing by ID
router.delete("/:id", deleteJob);

export default router;
