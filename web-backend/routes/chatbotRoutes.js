import express from "express";
import fetch from "node-fetch";
import Product from "../models/Product.js";
import BotChat from "../models/BotChat.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   POST: CHATBOT MESSAGE
========================= */
router.post("/", protect, async (req, res) => {
  const { message, sessionId } = req.body;
  const userId = req.user?._id || null;

  /* ---------- HARD VALIDATION ---------- */
  if (!sessionId) {
    return res.status(400).json({
      reply: "Session expired. Please refresh the page."
    });
  }

  if (!message || !message.trim()) {
    return res.json({ reply: "Please ask something 🙂" });
  }

  try {
    /* ---------- SAVE USER MESSAGE ---------- */
    await BotChat.create({
      sessionId,
      userId,
      sender: "user",
      message
    });

    const userText = message.toLowerCase();

    /* =========================
       ALWAYS-ON RULE RESPONSES
    ========================= */
    const faqReplies = [
      {
        match: ["hi", "hello", "hey"],
        reply: "Hello 👋 How can I help you today?"
      },
      {
        match: ["how does rentkaro work", "what is rentkaro"],
        reply:
          "RentKaro lets you rent, buy, or sell items locally 🏠📦. Browse products, chat with sellers, and rent instantly."
      },
      {
        match: ["contact", "support", "help"],
        reply:
          "You can contact sellers directly via chat or WhatsApp from the product page 📱"
      },
      {
        match: ["login", "signup", "register"],
        reply:
          "You can login or signup using your email. If you face issues, try resetting your password 🔐"
      }
    ];

    for (const rule of faqReplies) {
      if (rule.match.some(keyword => userText.includes(keyword))) {
        await BotChat.create({
          sessionId,
          userId,
          sender: "bot",
          message: rule.reply
        });

        return res.json({ reply: rule.reply });
      }
    }

    /* =========================
       PRODUCT SEARCH
    ========================= */
    const productKeywords = [
      "bike",
      "laptop",
      "camera",
      "mobile",
      "phone",
      "car",
      "scooter"
    ];

    const matchedKeyword = productKeywords.find(word =>
      userText.includes(word)
    );

    const isRent = userText.includes("rent");

    if (matchedKeyword) {
      const products = await Product.find({
        title: { $regex: matchedKeyword, $options: "i" },
        ...(isRent && { type: "rent" })
      }).limit(3);

      if (products.length === 0) {
        const reply = `Sorry 😅 No ${matchedKeyword} found right now.`;

        await BotChat.create({
          sessionId,
          userId,
          sender: "bot",
          message: reply
        });

        return res.json({ reply });
      }

      const reply = `Here are some ${matchedKeyword}s you may like 👇`;

      const productPayload = products.map(p => ({
        id: p._id,
        title: p.title,
        price: p.price,
        image: p.images?.[0] || null,
        type: p.type
      }));

      await BotChat.create({
        sessionId,
        userId,
        sender: "bot",
        message: reply,
        products: productPayload
      });

      return res.json({ reply, products: productPayload });
    }

    /* =========================
       AI FALLBACK (GUARANTEED)
    ========================= */
    let reply = "";

    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/google/flan-t5-base",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ inputs: message })
        }
      );

      const rawText = await response.text();

      try {
        const data = JSON.parse(rawText);
        reply =
          data?.[0]?.generated_text ||
          data?.generated_text ||
          "";
      } catch {
        console.error("HF RAW RESPONSE:", rawText);
      }
    } catch (err) {
      console.error("HF FETCH ERROR:", err.message);
    }

    /* ---------- FINAL GUARANTEE ---------- */
    if (!reply || reply.trim().length === 0) {
      reply = `
I’m here to help 🙂  
You can ask me about:
• Renting products  
• Buying or selling items  
• Finding listings  
• Contacting sellers  

Try something like:
"rent bike", "sell laptop", or "how does rentkaro work"
`;
    }

    await BotChat.create({
      sessionId,
      userId,
      sender: "bot",
      message: reply
    });

    return res.json({ reply });

  } catch (error) {
    console.error("Chatbot Error:", error.message);

    const fallbackReply = `
Something went wrong 🤖  
But I can still help you with:
• Renting products  
• Buying & selling items  
• Finding listings  

Try asking:
"rent bike" or "how does rentkaro work"
`;

    await BotChat.create({
      sessionId,
      userId,
      sender: "bot",
      message: fallbackReply
    });

    return res.json({ reply: fallbackReply });
  }
});

/* =========================
   GET: USER CHAT HISTORY
========================= */
router.get("/history", protect, async (req, res) => {
  try {
    const chats = await BotChat.find({
      userId: req.user._id
    })
      .sort({ createdAt: 1 })
      .select("sender message products createdAt");

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to load chat history" });
  }
});

export default router;
