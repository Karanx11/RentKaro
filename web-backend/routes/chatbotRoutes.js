import express from "express";
import fetch from "node-fetch";
import Product from "../models/Product.js";
import BotChat from "../models/BotChat.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

/* =========================
   CHATBOT ROUTE (AUTH AWARE)
========================= */
router.post("/", protect, async (req, res) => {
  const { message, sessionId } = req.body;
  const userId = req.user?._id || null;

  if (!message) {
    return res.json({ reply: "Please ask something 🙂" });
  }

  try {
    /* =========================
       SAVE USER MESSAGE
    ========================= */
    await BotChat.create({
      sessionId,
      userId,
      sender: "user",
      message
    });

    /* =========================
       PRODUCT SEARCH FIRST
    ========================= */
    const userText = message.toLowerCase();

    const productKeywords = [
      "bike",
      "laptop",
      "camera",
      "mobile",
      "phone",
      "car",
      "scooter"
    ];

    const matchedKeyword = productKeywords.find((word) =>
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

      const productPayload = products.map((p) => ({
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

      return res.json({
        reply,
        products: productPayload
      });
    }

    /* =========================
       AI FALLBACK (HF)
    ========================= */
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `
You are Kokkie, a helpful assistant for RentKaro app.
Keep replies short, friendly, and helpful.

User: ${message}
Assistant:
          `
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.[0]?.generated_text
        ?.split("Assistant:")
        ?.pop()
        ?.trim() ||
      "Sorry 😅 I couldn’t think of a good answer.";

    await BotChat.create({
      sessionId,
      userId,
      sender: "bot",
      message: reply
    });

    res.json({ reply });

  } catch (error) {
    console.error("Chatbot Error:", error.message);

    res.json({
      reply: "AI is busy right now 😴 Please try again."
    });
  }
});
/* =========================
   GET USER CHATBOT HISTORY
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
    console.error("Chat history error:", error.message);
    res.status(500).json({ message: "Failed to load chat history" });
  }
});

export default router;
