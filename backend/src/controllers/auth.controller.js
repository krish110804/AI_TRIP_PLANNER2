import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 Helper: Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// 🟢 Signup Controller
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    const token = generateToken(newUser._id);
    res.status(201).json({ token, username: newUser.username });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🟡 Login Controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔵 Google Login Controller (Firebase Integration)
export const googleLogin = async (req, res) => {
  try {
    const { email, name, uid } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username: name,
        email,
        password: uid, // Firebase users won't use password login
      });
    }

    // Generate token for session
    const token = generateToken(user._id);
    res.json({ token, username: user.username });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ msg: "Google login failed", error: err.message });
  }
};
