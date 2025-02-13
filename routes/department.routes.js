import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  addEmployeeToDepartment,
} from "../controllers/company/department.controller.js";

const router = express.Router();

// Route to create a new department
router.post("/", createDepartment);

// Route to get all departments
router.get("/:companyId", getAllDepartments);

// Route to get a single department by ID
router.get("/:companyId/:id", getDepartmentById);

// Route to update a department by ID
router.patch("/:companyId/:id", updateDepartment);

// Route to delete a department by ID
router.delete("/:companyId/:id", deleteDepartment);

// Route to add employees to a department
router.patch("/:companyId/:id/employees", addEmployeeToDepartment);

export default router;
