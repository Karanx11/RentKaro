import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  registerUser,
  verifySignupOtp,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword,          // ✅ MUST BE IMPORTED
  sendChangeEmailOtp,
  verifyChangeEmailOtp,
} from "../controllers/authController.js";

const router = express.Router();

// AUTH
router.post("/register", registerUser);
router.post("/verify-signup-otp", verifySignupOtp);
router.post("/login", loginUser);

// PROFILE
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

// 🔐 CHANGE PASSWORD (✅ THIS FIXES 404)
router.put("/change-password", protect, changePassword);

// FORGOT PASSWORD
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// CHANGE EMAIL
router.post("/send-change-email-otp", protect, sendChangeEmailOtp);
router.post("/verify-change-email-otp", protect, verifyChangeEmailOtp);

export default router;
