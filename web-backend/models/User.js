import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    address: String,
    avatar: String,

    password: {
      type: String,
      required: true,
    },

    // ===== EMAIL VERIFICATION OTP =====
    emailOtp: String,
    emailOtpExpire: Date,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // ===== FORGOT PASSWORD OTP =====
    resetOtp: String,
    resetOtpExpire: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
