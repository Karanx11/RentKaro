import dotenv from "dotenv";
import Groq from "groq-sdk";

// ✅ Load env RIGHT HERE (guaranteed)
dotenv.config({ path: "./backend.env" });

if (!process.env.GROQ_API_KEY) {
  throw new Error("❌ GROQ_API_KEY not loaded");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
