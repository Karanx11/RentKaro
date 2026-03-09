import dns from "dns";

// Fix SRV DNS issues (sometimes happens on hotspot networks)
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv";
dotenv.config({ path: "./backend.env" });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

/* =======================
   CONNECT DATABASE
======================= */

console.log("Connecting to MongoDB...");
await connectDB();

/* =======================
   EXPRESS APP
======================= */

const app = express();

/* =======================
   CORS CONFIG
======================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://rentkaro-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

/* =======================
   MIDDLEWARE
======================= */

app.use(express.json());
app.use(cookieParser());

/* =======================
   STATIC FILES
======================= */

app.use("/uploads", express.static("uploads"));

/* =======================
   API ROUTES
======================= */

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chatbot", chatbotRoutes);

/* =======================
   HEALTH CHECK
======================= */

app.get("/", (req, res) => {
  res.send("🚀 RentKaro backend running");
});

/* =======================
   HTTP SERVER
======================= */

const server = http.createServer(app);

/* =======================
   SOCKET.IO
======================= */

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

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

export default app;