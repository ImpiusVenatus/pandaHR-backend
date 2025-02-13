import express from "express";
import {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  removeEmployee,
  getEmployeesByCompany,
  getEmployeeCountByCompanyId,
} from "../controllers/employee/employee.controller.js";

const router = express.Router();

// Route to create a new job listing
router.post("/", addEmployee);

// Route to get all job listings
router.get("/", getAllEmployees);

// Route to get a job listing by ID
router.get("/:id", getEmployeeById);

// Route to update a job listing by ID
router.patch("/:id", updateEmployee);

// Route to delete a job listing by ID
router.delete("/:id", removeEmployee);

// Route to get employees by company ID
router.get("/:companyId/employees", getEmployeesByCompany);

// Route to get employee count by company ID
router.get("/:companyId/employee-count", getEmployeeCountByCompanyId);

export default router;
