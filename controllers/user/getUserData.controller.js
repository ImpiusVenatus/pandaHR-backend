import User from "../../models/userModels/User.js";
import Auth from "../../models/userModels/Auth.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.params.userId;
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

export const getAuthDataByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const authData = await Auth.findById(user.authId);
    if (!authData) {
      return res.status(404).json({ message: "Auth data not found" });
    }

    res.status(200).json(authData);
  } catch (error) {
    console.error("Error fetching auth data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyUserAndSetCompany = async (req, res) => {
  try {
    const { email, companyId } = req.body;

    if (!email || !companyId) {
      return res
        .status(400)
        .json({ message: "Email and companyId are required" });
    }

    // Find the auth record by email
    const authData = await Auth.findOne({ email });
    if (!authData) {
      return res.status(404).json({ message: "Auth data not found" });
    }

    // Update the isVerified field to true
    authData.isVerified = true;
    await authData.save();

    // Find the user associated with the authId
    const user = await User.findOne({ authId: authData._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set the companyId in the user record
    user.companyId = companyId;
    await user.save();

    res
      .status(200)
      .json({ message: "User verified and company assigned successfully" });
  } catch (error) {
    console.error("Error verifying user and setting company:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
