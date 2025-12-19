import express from "express";
import {
  registerUser,
  verifySignupOtp,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// SIGNUP
router.post("/register", registerUser);
router.post("/verify-signup-otp", verifySignupOtp);

// LOGIN
router.post("/login", loginUser);

// FORGOT PASSWORD (OTP)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
