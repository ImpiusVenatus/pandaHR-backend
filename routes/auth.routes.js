import express from "express";

import signup from "../controllers/auth/signup.controller.js";
// import login from "../controllers/authControllers/login.controller.js";
// import logout from "../controllers/authControllers/logout.controller.js";
// import {
//   checkMongoUser,
//   checkFirebaseUser,
// } from "../controllers/authControllers/checkEmail.js";
// import protectRoute from "../middlewares/protectRoute.js";
// import updatePassword from "../controllers/authControllers/updatePassword.js";

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the user
 *                 example: John Doe
 *               companyName:
 *                 type: string
 *                 description: Name of the company
 *                 example: Example Corp
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: myStrongPassword123
 *               firebaseUid:
 *                 type: string
 *                 description: Firebase user ID
 *                 example: abc123firebaseuid
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Internal server error
 */
router.post("/signup", signup);

// Uncomment and document other routes as needed
// router.post("/login", login);
// router.post("/logout", logout);
// router.post("/update-password", protectRoute, updatePassword);

export default router;
