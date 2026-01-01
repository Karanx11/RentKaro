import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    listingType: {
      type: String,
      enum: ["rent", "sell"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      day: { type: Number },
      month: { type: Number },
      year: { type: Number },
      sell: { type: Number },
    },

    images: {
      type: [String],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    /* ================= TRUST SYSTEM ================= */
    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    // 🔒 Prevent fake likes / dislikes
    voters: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        vote: {
          type: String,
          enum: ["like", "dislike"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
