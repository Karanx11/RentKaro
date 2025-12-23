import express from "express";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   GET MY CHATS (FIRST!)
========================= */
router.get("/my-chats", protect, async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const chats = await Chat.find({
      users: userId,
    }).sort({ updatedAt: -1 });

    const result = [];

    for (const chat of chats) {
      const otherUserId = chat.users.find(
        (u) => u.toString() !== userId
      );

      const otherUser = await User.findById(otherUserId).select(
        "name avatar"
      );

      const lastMessage = await Message.findOne({
        chatId: chat._id,
      }).sort({ createdAt: -1 });

      result.push({
        _id: chat._id,
        otherUser,
        lastMessage: lastMessage
          ? { text: lastMessage.text }
          : null,
      });

    }

    res.json(result);
  } catch (err) {
    console.error("my-chats error:", err.message);
    res.status(500).json([]);
  }
});

/* =========================
   GET CHAT BY ID
========================= */
router.get("/:chatId", protect, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("users", "name avatar")
      .populate("product", "title images");

    if (
      !chat ||
      !chat.users.some((u) => u._id.equals(req.user._id))
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(chat);
  } catch (err) {
    console.error("get chat error:", err.message);
    res.status(500).json({ message: "Failed to load chat" });
  }
});

/* =========================
   START / CREATE CHAT
========================= */
router.post("/start", protect, async (req, res) => {
  try {
    const { ownerId, productId } = req.body;

    if (!ownerId || !productId) {
      return res.status(400).json({
        message: "ownerId and productId are required",
      });
    }

    let chat = await Chat.findOne({
      product: productId,
      users: { $all: [req.user._id, ownerId] },
    });

    if (!chat) {
      chat = await Chat.create({
        product: productId,
        users: [req.user._id, ownerId],
      });
    }

    res.json(chat);
  } catch (error) {
    console.error("chat start error:", error.message);
    res.status(500).json({ message: "Chat creation failed" });
  }
});

/* =========================
   UNREAD COUNT
========================= */
router.get("/unread/:chatId", protect, async (req, res) => {
  try {
    const count = await Message.countDocuments({
      chatId: req.params.chatId,
      read: false,
      sender: { $ne: req.user._id },
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ count: 0 });
  }
});

export default router;
