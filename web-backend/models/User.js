import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ===== BASIC INFO =====
    name: {
      type: String,
      required: true,
      trim: true,
    },

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

    address: {
      type: String,
    },

    avatar: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    // ===== FORGOT / RESET PASSWORD =====
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    // ===== EMAIL OTP =====
    emailOtp: {
      type: String,
    },

    emailOtpExpire: {
      type: Date,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // ===== PHONE OTP =====
    phoneOtp: {
      type: String,
    },

    phoneOtpExpire: {
      type: Date,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
