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
            Authorization: `Bearer ${token}`
          }
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

      <div className="pt-28 px-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          🤖 Your Chatbot History
        </h1>

        {loading ? (
          <p>Loading chat history...</p>
        ) : chats.length === 0 ? (
          <p>No chatbot conversations yet.</p>
        ) : (
          <div className="space-y-4">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-3 rounded-xl
                  ${
                    chat.sender === "bot"
                      ? "bg-white border border-gray-300 text-black"
                      : "bg-black text-white ml-auto"
                  }`}
              >
                <p>{chat.message}</p>

                {/* PRODUCTS IF ANY */}
                {chat.products && chat.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {chat.products.map((p) => (
                      <div
                        key={p.id}
                        className="text-sm bg-gray-100 p-2 rounded"
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
