import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  chatWithBot,
  getChatHistory,
  clearChatHistory,
} from "../controllers/BotChat.js";

const router = express.Router();

router.post("/", protect, chatWithBot);
router.get("/history", protect, getChatHistory);
router.delete("/clear", protect, clearChatHistory); 

export default router;
