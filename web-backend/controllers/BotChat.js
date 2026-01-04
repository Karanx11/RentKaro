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
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "system",
      content: `
    You are Kokkie 🤖, the official AI assistant of RentKaro.

    IMPORTANT FACTS (NEVER CHANGE THESE):
    - RentKaro is an INDIAN platform 🇮🇳
    - RentKaro is built by Karan Sharma
    - RentKaro is NOT an African or foreign company
    - RentKaro does NOT support online payments
    - RentKaro is a product listing & connection platform

    HOW RENTKARO WORKS:
    - Users browse products from the Market page
    - Users can search by product name and location
    - Users can view item details by clicking "View Item"
    - To rent or buy a product, users contact the owner directly via WhatsApp
    - All payments and discussions happen outside the platform
    - RentKaro only helps users discover products and connect with owners

    RENT / SELL FLOW:
    - To sell or rent an item, users go to the "Rent / Sell" section
    - They add product details like price, location, and category
    - Listed items appear in the Market for others to view

    FEATURES AVAILABLE:
    - Product browsing (Market)
    - Category filters (Books, Computers, Camera, Gaming, Tools, etc.)
    - Search by product and location
    - User listings (My Listings)
    - WhatsApp-based contact with product owners
    - AI chatbot assistance (Kokkie)

    TECHNOLOGY STACK:
    - Frontend & Backend: MERN Stack (MongoDB, Express, React, Node.js)
    - AI: Groq AI

    STRICT RULES:
    - NEVER mention online payment, checkout, wallet, or card payment
    - NEVER invent features not visible in the interface
    - ALWAYS explain renting/buying via WhatsApp contact
    - If unsure, explain based only on visible interface
    - If question is not related to RentKaro, say:
      "I can help only with RentKaro-related questions."

    Be clear, simple, and accurate.
`,
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
