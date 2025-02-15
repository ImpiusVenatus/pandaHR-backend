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

// Route to get all jobs by companyId
router.get("/getAllJobs/:companyId", getAllJobs);

// Route to get a job listing by ID
router.get("/getJobById/:jobId", getJobById);

// Route to update a job listing by ID
router.patch("/:id", updateJob);

// Route to delete a job listing by ID
router.delete("/:id", deleteJob);

export default router;
