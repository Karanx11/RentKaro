import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

export const connectSocket = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("⚠️ No token found, socket not connected");
    return;
  }

  socket.auth = { token };   // 🔐 inject token FIRST
  socket.connect();          // 🔌 then connect
};

export default socket;
