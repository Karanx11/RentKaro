
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import { generateOtp } from "../utils/generateOtp.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import Product from "../models/Product.js"; 

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
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  if (!user.isEmailVerified) {
    return res.status(403).json({ message: "Verify email first" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false, // true in production (HTTPS)
  sameSite: "lax", 
  maxAge: 7 * 24 * 60 * 60 * 1000,
});


  res.json({
    accessToken,
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
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // true in prod
  });

  res.json({ message: "Logged out successfully" });
};

/* =========================================================
   REFRESH ACCESS TOKEN
========================================================= */
export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = generateAccessToken(decoded.id);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

/* =========================================================
   GET CURRENT USER
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

// ================= CHANGE PASSWORD =================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
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
//send otp for new email
/**
 * @route POST /api/auth/send-email-otp
 * @access Private
 */
// ================= CHANGE EMAIL OTP =================
export const sendChangeEmailOtp = async (req, res) => {
  try {
    const { newEmail } = req.body;

    if (!newEmail) {
      return res.status(400).json({ message: "New email required" });
    }

    // check if email already exists
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const otp = generateOtp();

    req.user.emailOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    req.user.emailOtpExpire = Date.now() + 10 * 60 * 1000;

    await req.user.save();

    await sendEmail({
      to: newEmail,
      subject: "Verify new email - RentKaro",
      html: `
        <h2>Email Change Verification</h2>
        <p>Your OTP:</p>
        <h1>${otp}</h1>
        <p>Valid for 10 minutes</p>
      `,
    });

    res.json({ message: "OTP sent to new email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ================= VERIFY CHANGE EMAIL OTP =================
export const verifyChangeEmailOtp = async (req, res) => {
  try {
    const { newEmail, otp } = req.body;

    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (
      req.user.emailOtp !== hashedOtp ||
      req.user.emailOtpExpire < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    req.user.email = newEmail;
    req.user.isEmailVerified = true;
    req.user.emailOtp = undefined;
    req.user.emailOtpExpire = undefined;

    await req.user.save();

    res.json({
      message: "Email updated successfully",
      email: req.user.email,
      isEmailVerified: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email verification failed" });
  }
};
/* =========================================================
   DELETE ACCOUNT (PASSWORD CONFIRMATION)
========================================================= */
export const deleteAccount = async (req, res) => {
  try {
    console.log("DELETE ACCOUNT HIT");

    const userId = req.user._id;
    const { password } = req.body;

    console.log("Password received:", !!password);

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const user = await User.findById(userId);
    if (!user || !user.password) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // 🔥 DELETE USER PRODUCTS
    await Product.deleteMany({ owner: userId });

    // 🔥 DELETE USER
    await User.findByIdAndDelete(userId);

    // 🍪 CLEAR COOKIE
    res.clearCookie("refreshToken");

    return res.json({
      message: "Account and products deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
