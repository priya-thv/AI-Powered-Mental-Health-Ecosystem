
import User from "../models/User.models.js";
import Profile from "../models/profile.models.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generatetoken.js";

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  if (!emailRegex.test(email)) return false;
  
  // Additional check for consecutive dots anywhere
  if (email.includes('..')) return false;
  
  return true;
};


export const signup = async (req, res) => {
  const { fullname, email, password, confirmpassword } = req.body;

  try {
    // Check for missing fields
    if (!fullname || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    // Email format validation
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // Password match check
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match. Please try again." });
    }

    // Password strength check
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      username: email,
    });

    await user.save();

    // Create default profile
    const profile = new Profile({
      email,
      name: fullname,
      bio: '',
      mood: 'neutral',
    });
    await profile.save();

    res.status(201).json({ message: 'Signup successful! Welcome aboard 🎉' });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: 'Signup failed due to a server issue. Please try again later.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide both email and password." });
    }

    // Email format validation
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "No account found with this email." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password. Please try again." });
    }

    const token = generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      message: "Login successful! 🎉",
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    res.status(500).json({ error: "Login failed due to a server issue. Please try again later." });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ result: "You have been logged out successfully. 👋" });
  } catch (error) {
    console.log("Logout Error:", error.message);
    res.status(500).json({ error: "Logout failed. Please try again." });
  }
};

