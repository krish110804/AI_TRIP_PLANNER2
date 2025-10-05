import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: "Missing fields" });
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: "User exists" });
    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ username, password: hashed });
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
