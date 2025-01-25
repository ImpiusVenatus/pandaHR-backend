import express from "express";
import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from "../controllers/company/attendance.controller.js";

const router = express.Router();

// Route to create a new attendance record
router.post("/", createAttendance);

// Route to get all attendance records
router.get("/", getAllAttendance);

// Route to get a single attendance record by ID
router.get("/:id", getAttendanceById);

// Route to update an attendance record by ID
router.patch("/:id", updateAttendance);

// Route to delete an attendance record by ID
router.delete("/:id", deleteAttendance);

export default router;
