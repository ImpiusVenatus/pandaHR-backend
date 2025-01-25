import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/company/department.controller.js"; // Import controller functions

const router = express.Router();

// Route to create a new department
router.post("/", createDepartment);

// Route to get all departments
router.get("/", getAllDepartments);

// Route to get a single department by ID
router.get("/:id", getDepartmentById);

// Route to update a department by ID
router.put("/:id", updateDepartment);

// Route to delete a department by ID
router.delete("/:id", deleteDepartment);

export default router;
