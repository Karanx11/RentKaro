import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ChatItem from "./ChatItem";
import axios from "axios";

function ChatList() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchChats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/chat/my-chats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setChats(res.data);
    } catch (err) {
      console.error("Failed to load chats", err);
    }
  };

  fetchChats();
}, []);


  return (
    <>
      <NavBar />

      <div className="pt-24 px-6 min-h-screen bg-gray-500/10">
        <div className="max-w-4xl mx-auto bg-gray-400/40 backdrop-blur-xl rounded-3xl border border-gray-500/30 p-6">

          <h2 className="text-2xl font-bold mb-6 text-black">
            Your Chats
          </h2>

          {chats.length === 0 ? (
            <p className="text-gray-700">
              No chats yet. Start a chat from a product page.
            </p>
          ) : (
            <div className="divide-y">
              {chats.map((chat) => (
                <ChatItem
                  key={chat._id}
                  name={chat.otherUser?.name || "Unknown"}
                  message={chat.lastMessage?.text || "Start chatting"}
                  unreadCount={chat.unreadCount || 0}
                  onClick={() => navigate(`/chat/${chat._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatList;
