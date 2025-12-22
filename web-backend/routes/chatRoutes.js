import express from "express";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   START / GET CHAT
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
    console.error("Chat start error:", error.message);
    res.status(500).json({ message: "Chat creation failed" });
  }
});

/* =========================
   GET USER CHATS
========================= */
router.get("/", protect, async (req, res) => {
  try {
    const chats = await Chat.find({
      users: req.user._id,
    })
      .populate("product", "title images")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats" });
  }
});

/* =========================
   UNREAD COUNT
========================= */
router.get("/unread/:chatId", protect, async (req, res) => {
  try {
    const count = await Message.countDocuments({
      chat: req.params.chatId,
      read: false,
      sender: { $ne: req.user._id },
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
});

export default router;
