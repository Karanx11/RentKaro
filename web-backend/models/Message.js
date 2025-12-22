import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    sender: {
      type: String, // later replace with userId (JWT)
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false, // 👈 unread by default
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
