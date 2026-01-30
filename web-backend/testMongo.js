import mongoose from "mongoose";
import dotenv from "dotenv";

// IMPORTANT: load the same env file
dotenv.config({ path: "./backend.env" });

console.log("MONGO_URI in test:", process.env.MONGO_URI);

await mongoose.connect(process.env.MONGO_URI);
console.log("Mongo connected outside app ✅");

process.exit(0);
