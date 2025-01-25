import express from "express";

import signup from "../controllers/auth/signup.controller.js";
import login from "../controllers/auth/login.controller.js";
// import logout from "../controllers/authControllers/logout.controller.js";
// import {
//   checkMongoUser,
//   checkFirebaseUser,
// } from "../controllers/authControllers/checkEmail.js";
// import protectRoute from "../middlewares/protectRoute.js";
// import updatePassword from "../controllers/authControllers/updatePassword.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

// router.post("/logout", logout);
// router.post("/update-password", protectRoute, updatePassword);

export default router;
