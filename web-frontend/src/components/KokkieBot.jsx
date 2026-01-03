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
     SESSION ID (IMPORTANT)
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
    { from: "bot", text: "Hi! I'm Kokkie 🤖 How can I help you today?" }
  ]);

  /* =========================
     LOAD CHAT HISTORY (ON LOGIN)
  ========================= */
  useEffect(() => {
    if (!token) {
      setMessages([
        { from: "bot", text: "Hi! I'm Kokkie 🤖 How can I help you today?" }
      ]);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/chatbot/history`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setMessages(
            data.map((chat) => ({
              from: chat.sender,
              text: chat.message,
              products: chat.products || []
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
  }, [messages]);

  /* =========================
     SEND MESSAGE
  ========================= */
 const sendMessage = async () => {
  if (!input.trim() || isTyping) return;

  // 🔒 TOKEN CHECK (UI SAFETY)
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
      body: JSON.stringify({
        message: userMessage,
        sessionId,
      }),
    });

    // 🔴 HANDLE AUTH ERROR
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

    // 🔴 HANDLE SERVER ERROR
    if (!res.ok) {
      throw new Error("Server error");
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
  } catch (error) {
    console.error("Chatbot error:", error);
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
     CLEAR CHAT (UI ONLY)
  ========================= */
 const clearChat = async () => {
  try {
    await fetch(`${API_URL}/api/chatbot/clear`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessages([
      { from: "bot", text: "Hi! I'm Kokkie 🤖 How can I help you today?" }
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
        className="fixed bottom-20 md:bottom-5 right-6 z-50
                   w-16 h-16 rounded-full overflow-hidden
                   bg-black shadow-xl hover:scale-105 transition"
      >
        <img
          src="/src/assets/ChatBot.png"
          alt="Kokkie"
          className="w-full h-full object-cover"
        />
      </button>

      {/* CHAT PANEL */}
      {open && (
        <div className="fixed bottom-36 md:bottom-24 right-6 z-50
                        w-[90%] sm:w-[350px] h-[480px]
                        bg-white/30 backdrop-blur-xl
                        border border-gray-500/30
                        shadow-xl rounded-3xl
                        flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="bg-black text-white px-4 py-3 flex justify-between items-center">
            <h2 className="text-lg font-bold">Kokkie Bot</h2>
            <div className="flex items-center gap-4">
              <IoTrash
                title="Clear chat"
                onClick={clearChat}
                className="text-xl cursor-pointer hover:text-red-400"
              />
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-3 rounded-xl
                  ${
                    msg.from === "bot"
                      ? "bg-white text-black border border-gray-300"
                      : "bg-black text-white ml-auto"
                  }`}
              >
                {msg.text && <p>{msg.text}</p>}

                {msg.products && msg.products.length > 0 && (
                  <div className="mt-3 space-y-3">
                    {msg.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-3 p-2 border rounded-lg bg-white shadow-sm"
                      >
                        {product.image ? (
                          <img
                            src={`${API_URL}${product.image}`}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs">
                            No Image
                          </div>
                        )}

                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {product.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            ₹{product.price}{" "}
                            {product.type === "rent" && "/ day"}
                          </p>

                          <a
                            href={`/products/${product.id}`}
                            className="inline-block mt-1 text-xs text-blue-600 underline"
                          >
                            View Product
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
          <div className="p-3 flex gap-3 border-t bg-white/40 backdrop-blur-md">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              type="text"
              placeholder="Ask Kokkie..."
              disabled={isTyping}
              className="flex-1 px-4 py-2 rounded-xl bg-white shadow outline-none disabled:opacity-60"
            />
            <button
              onClick={sendMessage}
              disabled={isTyping}
              className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-60"
            >
              <IoSend className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default KokkieBot;
