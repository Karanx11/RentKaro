import { useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import NavBar from "../../components/NavBar";
import MessageBubble from "./MessageBubble";
import socket from "../../services/socket";
import { connectSocket } from "../../services/socket";
import axios from "axios";
import { getUserIdFromToken } from "../../hooks/useAuth";

const API_URL = "http://localhost:5000";

function ChatRoom() {
  // 🔐 Logged-in user
  const userId = getUserIdFromToken();

  // 📌 Chat ID
  const { chatId } = useParams();

  // 📦 Navigation state (from ProductDetails)
  const location = useLocation();
  const product = location.state?.product;
  const autoMessage = location.state?.autoMessage;

  // 🧠 States
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const [isTyping, setIsTyping] = useState(false);
const [chatUser] = useState(null);
const autoSentRef = useRef(false);


  // 🔽 Refs
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  /* ======================
     LOAD CHAT INFO
  ====================== */
useEffect(() => {
  if (!chatId || !userId) return;

  connectSocket();
  socket.emit("joinChat", chatId);

  socket.on("receiveMessage", (msg) => {
    setMessages(prev => [
      ...prev,
      {
        id: msg.id,
        from: msg.from === userId ? "me" : "other",
        text: msg.text,
        createdAt: msg.createdAt,
      },
    ]);
  });

  return () => socket.off("receiveMessage");
}, [chatId, userId]);


  /* ======================
     LOAD OLD MESSAGES
  ====================== */
  useEffect(() => {
    if (!chatId || !userId) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(
  `http://localhost:5000/api/chat/${chatId}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

        const data = Array.isArray(res.data) ? res.data : [];

        setMessages(
          data.map((msg) => ({
            id: msg._id,
            from: msg.sender === userId ? "me" : "other",
            text: msg.text,
            createdAt: msg.createdAt,
          }))
        );


        await axios.put(
          `${API_URL}/api/messages/read/${chatId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    loadMessages();
  }, [chatId, userId]);

  /* ======================
     SOCKET CONNECTION
  ====================== */
  useEffect(() => {
    if (!chatId || !userId) return;

    socket.emit("joinChat", chatId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === message._id)) return prev;

        return [
          ...prev,
          {
            id: message._id,
            from: message.sender === userId ? "me" : "other",
            text: message.content,
            createdAt: message.createdAt,

          },
        ];
      });
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [chatId, userId]);

  /* ======================
     AUTO SEND FIRST MESSAGE
  ====================== */
  useEffect(() => {
  if (!autoMessage) return;
  if (!socket.connected) return;
  if (autoSentRef.current) return;

  socket.emit("sendMessage", {
    chatId,
    text: autoMessage,
  });

  autoSentRef.current = true;
}, [autoMessage, chatId]);


  /* ======================
     AUTO SCROLL
  ====================== */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ======================
     SEND MESSAGE
  ====================== */
  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      chatId,
      text: input,
    });

    socket.emit("stopTyping", chatId);
    setInput("");
  };

  /* ======================
     TYPING HANDLER
  ====================== */
  const handleTyping = (e) => {
    setInput(e.target.value);
    socket.emit("typing", chatId);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", chatId);
    }, 1000);
  };

  return (
    <>
      <NavBar />

      <div className="pt-24 px-4 md:px-10 min-h-screen bg-gray-500/10">
        <div className="max-w-5xl mx-auto bg-gray-400/40 backdrop-blur-xl rounded-3xl border border-gray-500/30 flex flex-col h-[75vh]">

          {/* ================= HEADER ================= */}
          <div className="p-4 border-b border-gray-500/30 bg-white/30 flex items-center gap-4">
            <img
              src={chatUser?.avatar || "https://i.imgur.com/6VBx3io.png"}
              className="w-12 h-12 rounded-full"
              alt="user"
            />
            <div className="flex-1">
              <p className="font-semibold text-black">
                {chatUser?.name || "Loading..."}
              </p>

              {product && (
                <p className="text-sm text-gray-600 truncate">
                  📦 {product.title}
                </p>
              )}
            </div>
          </div>

          {/* ================= MESSAGES ================= */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* ================= INPUT ================= */}
          <div className="p-4 border-t border-gray-500/30 bg-white/40 flex gap-4">
            <input
              value={input}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 outline-none"
            />

            <button
              onClick={sendMessage}
              className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              <IoSend className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
