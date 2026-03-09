import { io } from "socket.io-client";

const SOCKET_URL = "https://rentkaro-backend.onrender.coms";

export const socket = io(SOCKET_URL, {
  autoConnect: false,        // manual control
  transports: ["websocket"],
  withCredentials: true,    
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
