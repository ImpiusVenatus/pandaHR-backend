import express from "express";
import {
  createLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

// Route to create a new leave request
router.post("/", createLeave);

// Route to get all leave requests
router.get("/", getAllLeaves);

// Route to get a leave request by ID
router.get("/:id", getLeaveById);

// Route to update a leave request by ID
router.put("/:id", updateLeave);

// Route to delete a leave request by ID
router.delete("/:id", deleteLeave);

export default router;
