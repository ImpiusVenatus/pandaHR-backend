import express from "express";
import {
  createHoliday,
  getAllHolidays,
  getHolidayById,
  updateHoliday,
  deleteHoliday,
} from "../controllers/holidayController.js";

const router = express.Router();

// Route to create a new holiday
router.post("/", createHoliday);

// Route to get all holidays
router.get("/", getAllHolidays);

// Route to get a holiday by ID
router.get("/:id", getHolidayById);

// Route to update a holiday by ID
router.put("/:id", updateHoliday);

// Route to delete a holiday by ID
router.delete("/:id", deleteHoliday);

export default router;
