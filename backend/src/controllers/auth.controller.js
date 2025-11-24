import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegx.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists, try logging in" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      password: hash,
      email,
    });

    if (!newUser) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    await newUser.save();

    // generate token AFTER saving
    generateToken(newUser._id, res);

    return res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
    // todo: send a welcome email to user

  } catch (error) {
    console.log("error in signup controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

