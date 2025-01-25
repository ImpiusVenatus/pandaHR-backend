import express from "express";

import { getUserData } from "../controllers/user/getUserData.controller.js";

const router = express.Router();

// Define the route for getting user data by userId
router.get("/:userId", getUserData);

export default router;
