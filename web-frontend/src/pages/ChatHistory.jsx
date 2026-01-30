import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function ChatHistory() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/api/chatbot/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setChats(data);
      } catch (error) {
        console.error("Failed to load chat history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <NavBar />

      <div className="pt-24 px-4 max-w-2xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-4">
          🤖 Your Chatbot History
        </h1>

        {loading ? (
          <p className="text-sm text-gray-600">
            Loading chat history...
          </p>
        ) : chats.length === 0 ? (
          <p className="text-sm text-gray-600">
            No chatbot conversations yet.
          </p>
        ) : (
          <div className="space-y-3">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`
                  max-w-[75%] px-3 py-2 rounded-lg text-sm
                  ${
                    chat.sender === "bot"
                      ? "bg-white border border-gray-300 text-black"
                      : "bg-black text-white ml-auto"
                  }
                `}
              >
                <p className="leading-relaxed">
                  {chat.message}
                </p>

                {/* PRODUCTS IF ANY */}
                {chat.products && chat.products.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {chat.products.map((p) => (
                      <div
                        key={p.id}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        <strong>{p.title}</strong> – ₹{p.price}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ChatHistory;
