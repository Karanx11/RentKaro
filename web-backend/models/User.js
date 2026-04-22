
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

    // REMOVE required
    phone: {
      type: String,
      unique: true,
      sparse: true, 
      default: undefined
    },

    address: String,
    avatar: String,

    //  REMOVE required
    password: {
      type: String,
    },

    googleId: {
      type: String,
    },

    
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // ===== EMAIL VERIFICATION =====
    emailOtp: String,
    emailOtpExpire: Date,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    pendingEmail: String,

    resetOtp: String,
    resetOtpExpire: Date,

    pushSubscription: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

