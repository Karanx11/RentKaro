import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import webpush from "web-push";

import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// MODELS
import Message from "./models/Message.js";
import Chat from "./models/Chat.js";
import User from "./models/User.js";

/* =======================
   ENV + DB
======================= */
dotenv.config();
connectDB();

/* =======================
   EXPRESS
======================= */
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (_, res) => {
  res.send("🚀 RentKaro backend running");
});

/* =======================
   SOCKET SERVER
======================= */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

/* 🔐 SOCKET AUTH */
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("No token"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id, socket.userId);

  socket.on("joinChat", async (chatId) => {
    const chat = await Chat.findById(chatId);
    if (!chat) return;

    if (!chat.users.some(u => u.toString() === socket.userId)) {
      console.log("❌ Unauthorized join");
      return;
    }

    socket.join(chatId);
    console.log("📥 Joined chat:", chatId);
  });

  socket.on("sendMessage", async ({ chatId, text }) => {
    const chat = await Chat.findById(chatId);
    if (!chat) return;

    if (!chat.users.some(u => u.toString() === socket.userId)) {
      console.log("❌ Unauthorized message");
      return;
    }

    const newMessage = await Message.create({
      chatId,
      sender: socket.userId,
      text,
      read: false,
    });

    io.to(chatId).emit("receiveMessage", {
      _id: newMessage._id,
      sender: socket.userId,
      text: newMessage.text,
      createdAt: newMessage.createdAt,
    });

    console.log("📨 Message sent");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});



/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
