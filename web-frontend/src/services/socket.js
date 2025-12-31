import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";


export const socket = io(SOCKET_URL, {
  autoConnect: false,        // manual control (good)
  transports: ["websocket"], // avoid polling issues
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

/* =====================
   DEBUG / STATUS LOGS
===================== */
socket.on("connect", () => {
  console.log("🟢 Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Socket disconnected:", reason);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});
