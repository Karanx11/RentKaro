import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import NavBar from "../../components/NavBar";
import MessageBubble from "./MessageBubble";
import socket from "../../services/socket";
import axios from "axios";
import { getUserIdFromToken } from "../../hooks/useAuth";

function ChatRoom() {
  // 🔐 Logged-in user
  const userId = getUserIdFromToken();

  // 📌 Chat ID
  const { chatId } = useParams();

  // 🧠 State
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 🔽 Refs
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // 📥 Load old messages + mark read
  useEffect(() => {
    if (!chatId || !userId) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${chatId}`
        );

        setMessages(
          res.data.map((msg) => ({
            id: msg._id,
            from: msg.sender === userId ? "me" : "other",
            text: msg.text,
          }))
        );

        await axios.put(
          `http://localhost:5000/api/messages/read/${chatId}`
        );
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    };

    loadMessages();
  }, [chatId, userId]);

  // 🔌 Socket connection
  useEffect(() => {
    if (!chatId) return;

    if (!socket.connected) socket.connect();

    socket.emit("joinChat", chatId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === message.id)) return prev;

        return [
          ...prev,
          {
            id: message.id,
            from: message.from === userId ? "me" : "other",
            text: message.text,
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

  // 🔽 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ✉️ Send message
  const sendMessage = () => {
    if (!input.trim() || !userId) return;

    socket.emit("sendMessage", {
      chatId,
      message: {
        from: userId,
        text: input,
      },
    });

    socket.emit("stopTyping", chatId);
    setInput("");
  };

  // ⌨️ Typing handler
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
        <div
          className="max-w-5xl mx-auto
                     bg-gray-400/40 backdrop-blur-xl
                     rounded-3xl border border-gray-500/30
                     flex flex-col h-[75vh]"
        >
          {/* HEADER */}
          <div className="p-4 border-b border-gray-500/30 bg-white/30 flex items-center gap-4">
            <img
              src="https://i.imgur.com/6VBx3io.png"
              className="w-12 h-12 rounded-full"
              alt="user"
            />
            <div>
              <p className="font-semibold text-black">Rahul Kumar</p>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {isTyping && (
              <div className="text-sm italic text-gray-700 px-2">
                Rahul is typing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-gray-500/30 bg-white/40 flex gap-4">
            <input
              value={input}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl
                         bg-white/80 border border-gray-300 outline-none"
            />

            <button
              onClick={sendMessage}
              className="p-3 bg-black text-white rounded-xl
                         hover:bg-gray-800 transition"
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
