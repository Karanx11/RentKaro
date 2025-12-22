import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import webpush from "web-push";
import jwt from "jsonwebtoken";

import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// MODELS
import Message from "./models/Message.js";
import User from "./models/User.js";
import Chat from "./models/Chat.js";
import orderRoutes from "./routes/orderRoutes.js";

/* =======================
   ENV + DB
======================= */
dotenv.config();
connectDB();

/* =======================
   WEB PUSH CONFIG
======================= */
webpush.setVapidDetails(
  "mailto:support@rentkaro.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

/* =======================
   EXPRESS APP
======================= */
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// STATIC FILES
app.use("/uploads", express.static("uploads"));

/* =======================
   API ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => {
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

/* 🔐 SOCKET AUTH (JWT) */
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("Unauthorized"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  /* JOIN CHAT */
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });

  /* TYPING */
  socket.on("typing", (chatId) => {
    socket.to(chatId).emit("typing");
  });

  socket.on("stopTyping", (chatId) => {
    socket.to(chatId).emit("stopTyping");
  });

  /* SEND MESSAGE */
  socket.on("sendMessage", async ({ chatId, text }) => {
    try {
      // 1️⃣ SAVE MESSAGE
      const newMessage = await Message.create({
        chat: chatId,
        sender: socket.userId,
        content: text,
        read: false,
      });

      // 2️⃣ EMIT MESSAGE
      io.to(chatId).emit("receiveMessage", {
        _id: newMessage._id,
        chat: chatId,
        sender: socket.userId,
        content: text,
        createdAt: newMessage.createdAt,
      });

      // 3️⃣ FIND RECEIVER
      const chat = await Chat.findById(chatId);
      if (!chat) return;

      const receiverId = chat.users.find(
        (u) => u.toString() !== socket.userId
      );
      if (!receiverId) return;

      const receiver = await User.findById(receiverId);

      // 4️⃣ PUSH NOTIFICATION
      if (receiver?.pushSubscription) {
        try {
          await webpush.sendNotification(
            receiver.pushSubscription,
            JSON.stringify({
              title: "New message on RentKaro",
              body: text,
            })
          );
        } catch (err) {
          if (err.statusCode === 410) {
            await User.findByIdAndUpdate(receiverId, {
              pushSubscription: null,
            });
          }
          console.error("Push error:", err.message);
        }
      }
    } catch (err) {
      console.error("sendMessage error:", err.message);
    }
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
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});
