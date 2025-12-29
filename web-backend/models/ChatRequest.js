import mongoose from "mongoose";

const chatRequestSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
    },
    whatsappAllowed: {
    type: Boolean,
    default: false,
    },
    isSeenByBuyer: {
    type: Boolean,
    default: false,
    },

  },
  { timestamps: true }
);

export default mongoose.model("ChatRequest", chatRequestSchema);
