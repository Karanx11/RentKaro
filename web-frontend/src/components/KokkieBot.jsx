import { useState, useRef, useEffect } from "react";
import { IoClose, IoSend, IoTrash } from "react-icons/io5";

const API_URL = "http://localhost:5000";

function KokkieBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");

  /* =========================
     SESSION ID
  ========================= */
  const [sessionId] = useState(() => {
    const existing = localStorage.getItem("kokkie-session");
    if (existing) return existing;

    const id = crypto.randomUUID();
    localStorage.setItem("kokkie-session", id);
    return id;
  });

  /* =========================
     CHAT STATE
  ========================= */
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Kokkie 🤖 How can I help you today?" },
  ]);

  /* =========================
     LOAD CHAT HISTORY
  ========================= */
  useEffect(() => {
    if (!token) {
      setMessages([
        { from: "bot", text: "Hi! I'm Kokkie 🤖 How can I help you today?" },
      ]);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/chatbot/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setMessages(
            data.map((chat) => ({
              from: chat.sender,
              text: chat.message,
              products: chat.products || [],
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load chatbot history", err);
      }
    };

    fetchHistory();
  }, [token]);

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  /* =========================
     SEND MESSAGE
  ========================= */
  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    if (!token) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Please login to chat with Kokkie 🤖" },
      ]);
      return;
    }

    const userMessage = input;
    setInput("");
    setIsTyping(true);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMessage },
      { from: "bot", text: "Kokkie is typing..." },
    ]);

    try {
      const res = await fetch(`${API_URL}/api/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage, sessionId }),
      });

      if (res.status === 401) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            from: "bot",
            text: "Session expired 😢 Please login again.",
          };
          return updated;
        });
        return;
      }

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: "bot",
          text: data.reply || "Sorry 😅 I didn’t get that.",
          products: data.products || [],
        };
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: "bot",
          text: "Server error 😢 Please try again.",
        };
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  /* =========================
     CLEAR CHAT
  ========================= */
  const clearChat = async () => {
    try {
      await fetch(`${API_URL}/api/chatbot/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages([
        { from: "bot", text: "Hi! I'm Kokkie 🤖 How can I help you today?" },
      ]);
    } catch (err) {
      console.error("Failed to clear chat", err);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 md:bottom-5 right-5 z-50
                   w-13 h-13 rounded-full overflow-hidden
                   bg-black shadow-lg hover:scale-105 transition"
      >
        <img
          src="/src/assets/ChatBot.png"
          alt="Kokkie"
          className="w-full h-full object-cover"
        />
      </button>

      {/* CHAT PANEL */}
      {open && (
        <div
          className="fixed bottom-32 md:bottom-20 right-5 z-50
                     w-[92%] sm:w-[320px] h-[420px]
                     bg-white/40 backdrop-blur-xl
                     border border-gray-500/30
                     shadow-xl rounded-2xl
                     flex flex-col overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-black text-white px-3 py-2 flex justify-between items-center">
            <h2 className="text-sm font-semibold">Kokkie Bot</h2>
            <div className="flex items-center gap-3">
              <IoTrash
                onClick={clearChat}
                className="text-lg cursor-pointer hover:text-red-400"
              />
              <IoClose
                className="text-xl cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-3 py-2 rounded-lg
                  ${
                    msg.from === "bot"
                      ? "bg-white text-black border border-gray-300"
                      : "bg-black text-white ml-auto"
                  }`}
              >
                <p>{msg.text}</p>

                {msg.products && msg.products.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-2 p-2 border rounded-lg bg-white"
                      >
                        <img
                          src={`${API_URL}${product.image}`}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-xs">
                            {product.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            ₹{product.price}
                          </p>
                          <a
                            href={`/products/${product.id}`}
                            className="text-xs text-blue-600 underline"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-2 flex gap-2 border-t bg-white/50">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask Kokkie..."
              disabled={isTyping}
              className="flex-1 px-3 py-2 rounded-lg bg-white outline-none text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={isTyping}
              className="p-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              <IoSend className="text-base" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default KokkieBot;
