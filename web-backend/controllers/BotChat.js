import BotChat from "../models/BotChat.js";
import { groq } from "../config/ai.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!req.user) {
      return res.status(401).json({ reply: "Unauthorized" });
    }

    if (!message) {
      return res.status(400).json({ reply: "Message required" });
    }

    const userId = req.user._id;

    // 💾 Save user message
    await BotChat.create({
      user: userId,
      sessionId,
      sender: "user",
      message,
    });

    // 🤖 FREE AI (Groq)
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are Kokkie, the RentKaro AI assistant. Answer ONLY questions related to RentKaro. If not related, say you can only help with RentKaro.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry 😅 I couldn’t understand that.";

    // 💾 Save bot reply
    await BotChat.create({
      user: userId,
      sessionId,
      sender: "bot",
      message: reply,
    });

    res.json({ reply });
  } catch (error) {
    console.error("🔥 CHATBOT ERROR:", error);
    res.status(500).json({ reply: "Bot failed 😢" });
  }
};

// 📜 CHAT HISTORY
export const getChatHistory = async (req, res) => {
  try {
    const chats = await BotChat.find({ user: req.user._id })
      .sort({ createdAt: 1 })
      .select("sender message");

    res.json(chats);
  } catch (error) {
    res.status(500).json([]);
  }
};

// 🗑️ CLEAR CHAT
export const clearChatHistory = async (req, res) => {
  try {
    await BotChat.deleteMany({ user: req.user._id });
    res.json({ message: "Chat cleared" });
  } catch (error) {
    console.error("Clear chat error:", error);
    res.status(500).json({ message: "Failed to clear chat" });
  }
};
