import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// GET messages of a chat
router.get("/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to load messages" });
  }
});
// Mark messages as read
router.put("/read/:chatId", async (req, res) => {
  try {
    await Message.updateMany(
      { chatId: req.params.chatId, read: false },
      { read: true }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark read" });
  }
});
// Get total unread messages for user
router.get("/unread-count/:userId", async (req, res) => {
  try {
    const count = await Message.countDocuments({
      sender: { $ne: req.params.userId },
      read: false,
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
});

export default router;
