import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    listingType: {
      type: String,
      enum: ["rent", "sell"],
      required: true,
    },

    category: { type: String, required: true },

    price: {
      day: Number,
      month: Number,
      year: Number,
      sell: Number,
    },

    images: [String],

    location: { type: String, default: "India" },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
