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
import { OAuth2Client } from "google-auth-library";

/* ================= REGISTER ================= */
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

    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      emailOtp: crypto.createHash("sha256").update(otp).digest("hex"),
      emailOtpExpire: Date.now() + 10 * 60 * 1000,
    });

    try {
      await sendEmail({
        to: email,
        subject: "Verify your RentKaro account",
        html: `<h2>Email Verification</h2><h1>${otp}</h1>`,
      });
    } catch (err) {
      console.error("Email failed:", err);
      return res.status(500).json({ message: "Failed to send OTP" });
    }

    res.status(201).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= GET CURRENT USER ================= */
export const getMe = async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      avatar: req.user.avatar,
      isEmailVerified: req.user.isEmailVerified,
    });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= REFRESH ACCESS TOKEN ================= */
export const refreshAccessToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = generateAccessToken(decoded.id);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
/* ================= VERIFY OTP ================= */
export const verifySignupOtp = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= SEND CHANGE EMAIL OTP ================= */
export const sendChangeEmailOtp = async (req, res) => {
  try {
    const { newEmail } = req.body;

    if (!newEmail) {
      return res.status(400).json({ message: "New email required" });
    }

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

    try {
      await sendEmail({
        to: newEmail,
        subject: "Verify new email - RentKaro",
        html: `<h2>Email Change</h2><h1>${otp}</h1>`,
      });
    } catch (err) {
      console.error("Email failed:", err);
      return res.status(500).json({ message: "Failed to send OTP" });
    }

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= VERIFY CHANGE EMAIL OTP ================= */
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
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= LOGIN ================= */
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
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    user,
  });
};

/* ================= LOGOUT ================= */
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({ message: "Logged out successfully" });
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOtp();

    user.resetOtp = crypto.createHash("sha256").update(otp).digest("hex");
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    try {
      await sendEmail({
        to: email,
        subject: "Reset Password OTP",
        html: `<h2>Password Reset</h2><h1>${otp}</h1>`,
      });
    } catch (err) {
      console.error("Email failed:", err);
      return res.status(500).json({ message: "Email failed" });
    }

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= CHANGE PASSWORD ================= */
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

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      email,
      resetOtp: hashedOtp,
      resetOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
  
};
/* ================= DELETE ACCOUNT ================= */
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Delete user products
    await Product.deleteMany({ owner: userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= UPDATE PROFILE ================= */
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
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= RESEND EMAIL OTP ================= */
export const resendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("🔥 RESEND OTP HIT:", email);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ USER NOT FOUND");
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const otp = generateOtp();
    console.log("Generated OTP:", otp);

    if (!otp) {
      return res.status(500).json({ message: "OTP generation failed" });
    }

    user.emailOtp = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    user.emailOtpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    try {
  await sendEmail({
    to: email,
    subject: "Verify your RentKaro account",
    html: `<h2>Email Verification</h2><h1>${otp}</h1>`,
  });
} catch (err) {
  console.error("❌ Email failed:", err);
  return res.status(500).json({ message: "Email sending failed" });
}

    res.json({ message: "OTP resent successfully" });

  } catch (error) {
    console.error("❌ RESEND ERROR FULL:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Google Signin
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    let user = await User.findOne({ email });

    // 🆕 Create new user
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        googleId: sub,
        isEmailVerified: true,
      });
    }

    // 🔗 Link existing account
    if (user && !user.googleId) {
      user.googleId = sub;
      user.isEmailVerified = true;
      await user.save();
    }

    // ✅ USE SAME TOKEN SYSTEM
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // ✅ SAME COOKIE LOGIC
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user,
    });

  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Google authentication failed" });
  }
};

