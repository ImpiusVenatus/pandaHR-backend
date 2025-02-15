import express from "express";

import {
  getUserData,
  getAuthDataByUserId,
} from "../controllers/user/getUserData.controller.js";

const router = express.Router();

// Define the route for getting user data by userId
router.get("/:userId", getUserData);
router.get("/auth/:userId", getAuthDataByUserId);

export default router;
