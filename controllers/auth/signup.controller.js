import bcrypt from "bcrypt";
import Auth from "../../models/userModels/Auth.js";
import User from "../../models/userModels/User.js";

const signup = async (req, res) => {
  const { fullName, companyName, email, password, firebaseUid } = req.body;

  if (!fullName || !companyName || !email || !password || !firebaseUid) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Auth document
    const auth = new Auth({
      email,
      password: hashedPassword,
      firebaseUid,
      isVerified: false,
    });

    const savedAuth = await auth.save();

    // Create User document with reference to Auth
    const user = new User({
      authId: savedAuth._id,
      fullName,
      companyName,
    });

    await user.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default signup;
