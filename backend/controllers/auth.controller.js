import User from "../models/User.models.js";
import Profile from "../models/profile.models.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generatetoken.js";

export const signup = async (req, res) => {
  const { fullname, email, password, confirmpassword } = req.body;

  try {
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      username: email, // <-- ✅ fix here
    });

    await user.save();

    const profile = new Profile({
      email,
      name: fullname,
      bio: '',
      mood: 'neutral',
    });
    await profile.save();

    res.status(201).json({ message: 'User signed up successfully!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed, please try again.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ result: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
