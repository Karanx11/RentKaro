import express from "express";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   GET CHAT MESSAGES
========================= */
router.get("/:chatId", protect, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.json([]);

    if (!chat.users.some(u => u.equals(req.user._id))) {
      return res.json([]);
    }

    const messages = await Message.find({ chatId: chat._id })
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch {
    res.json([]);
  }
});


/* =========================
   MARK READ
========================= */
router.put("/read/:chatId", protect, async (req, res) => {
  try {
    await Message.updateMany(
      {
        chatId: req.params.chatId,
        sender: { $ne: req.user._id },
        read: false,
      },
      { read: true }
    );

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

/* =========================
   UNREAD COUNT (FIX)
========================= */
router.get("/unread-count/:userId", async (req, res) => {
  try {
    const count = await Message.countDocuments({
      sender: { $ne: req.params.userId },
      read: false,
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ count: 0 });
  }
});


export default router;
