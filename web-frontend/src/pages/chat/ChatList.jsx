import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import api from "../../services/api";

function ChatList() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get("/api/chat/my-chats");
        setChats(res.data);
      } catch (error) {
        console.error("Failed to load chats", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <>
      <NavBar />

      <div className="pt-24 px-6 min-h-screen bg-gray-500/10">
        <div className="max-w-4xl mx-auto
                        bg-gray-400/40 backdrop-blur-xl
                        rounded-3xl border border-gray-500/30
                        p-6">

          <h2 className="text-2xl font-bold mb-6 text-black">
            Your Chats
          </h2>

          {chats.length === 0 ? (
            <p className="text-gray-700">
              No chats yet. Start a chat from a product page.
            </p>
          ) : (
            <div className="space-y-4">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => navigate(`/chat/${chat._id}`)}
                  className="
                    p-4 rounded-xl cursor-pointer
                    bg-white/40 hover:bg-white/60
                    border border-gray-300
                  "
                >
                  <p className="font-semibold text-black">
                    {chat.otherUser.name}
                  </p>
                  <p className="text-sm text-gray-700 truncate">
                    {chat.lastMessage?.text || "Start chatting"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatList;
