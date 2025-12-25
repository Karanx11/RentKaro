import mongoose from "mongoose";

const botChatSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    sender: {
      type: String,
      enum: ["user", "bot"],
      required: true
    },

    message: {
      type: String
    },

    products: [
      {
        id: mongoose.Schema.Types.ObjectId,
        title: String,
        price: Number,
        image: String,
        type: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("BotChat", botChatSchema);
