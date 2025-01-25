import express from "express";
import {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
} from "../controllers/company/payroll.controller.js";

const router = express.Router();

// Route to create a new payroll entry
router.post("/", createPayroll);

// Route to get all payroll entries
router.get("/", getAllPayrolls);

// Route to get a payroll entry by ID
router.get("/:id", getPayrollById);

// Route to update a payroll entry by ID
router.put("/:id", updatePayroll);

// Route to delete a payroll entry by ID
router.delete("/:id", deletePayroll);

export default router;
