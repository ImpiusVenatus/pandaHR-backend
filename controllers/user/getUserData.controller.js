// backend/controllers/user/getUserData.controller.js

import User from "../../models/userModels/User.js"; // Import your user model

export const getUserData = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(204).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
