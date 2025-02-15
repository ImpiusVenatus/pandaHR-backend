import express from "express";
import {
  createProject,
  getProjectsByCompany,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/company/projects.controller.js";

const router = express.Router();

// Create a new project
router.post("/", createProject);

// Get all projects for a specific company
router.get("/", getProjectsByCompany);

// Get a single project by ID
router.get("/:projectId", getProjectById);

// Update a project
router.put("/:projectId", updateProject);

// Delete a project
router.delete("/:projectId", deleteProject);

export default router;
