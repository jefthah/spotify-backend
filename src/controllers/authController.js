import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah email sudah ada
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Membuat user baru
    const user = new User({ username, email, password });

    // Simpan user ke MongoDB
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Mengirimkan response sukses dengan token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token, // Menyertakan token JWT
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering user" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah user ada berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verifikasi password
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Mengirimkan response sukses dengan token
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token, // Menyertakan token JWT
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while logging in user" });
  }
};
