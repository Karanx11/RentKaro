import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import { generateOtp } from "../utils/generateOtp.js";

// ================= JWT =================
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

/* =========================================================
   REGISTER (with Email OTP)
========================================================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists =
      (await User.findOne({ email })) || (await User.findOne({ phone }));
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      emailOtp: crypto.createHash("sha256").update(otp).digest("hex"),
      emailOtpExpire: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail({
      to: email,
      subject: "Verify your RentKaro account",
      html: `<h2>Email Verification</h2><h1>${otp}</h1><p>Valid for 10 minutes</p>`,
    });

    res.status(201).json({
      message: "OTP sent to email. Please verify.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   VERIFY SIGNUP OTP
========================================================= */
export const verifySignupOtp = async (req, res) => {
  const { email, otp } = req.body;

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    email,
    emailOtp: hashedOtp,
    emailOtpExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.isEmailVerified = true;
  user.emailOtp = undefined;
  user.emailOtpExpire = undefined;

  await user.save();

  res.json({ message: "Email verified successfully" });
};

/* =========================================================
   LOGIN
========================================================= */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.isEmailVerified) {
    return res.status(403).json({ message: "Verify email before login" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified,
    },
  });
};

/* =========================================================
   GET CURRENT USER (PROFILE)
========================================================= */
export const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    address: req.user.address,
    avatar: req.user.avatar,
    isEmailVerified: req.user.isEmailVerified,
  });
};

/* =========================================================
   UPDATE PROFILE
========================================================= */
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.avatar = avatar || user.avatar;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      avatar: updatedUser.avatar,
      isEmailVerified: updatedUser.isEmailVerified,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   CHANGE PASSWORD (Logged in)
========================================================= */
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = await User.findById(req.user._id);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Current password incorrect" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
};

/* =========================================================
   FORGOT PASSWORD (OTP)
========================================================= */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOtp();

  user.resetOtp = crypto.createHash("sha256").update(otp).digest("hex");
  user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  await sendEmail({
    to: email,
    subject: "Reset Password OTP",
    html: `<h2>Password Reset</h2><h1>${otp}</h1>`,
  });

  res.json({ message: "Reset OTP sent to email" });
};

/* =========================================================
   RESET PASSWORD (OTP)
========================================================= */
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    email,
    resetOtp: hashedOtp,
    resetOtpExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};
