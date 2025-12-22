import NavBar from "../../components/NavBar";
import ChatItem from "../../pages/chat/ChatItem";
import { useNavigate } from "react-router-dom";

function ChatList() {
  const navigate = useNavigate();

  const chats = [
    {
      id: "123",
      name: "Rahul Kumar",
      lastMessage: "Is this available?",
    },
  ];

  return (
    <>
      <NavBar />

      <div className="pt-24 px-4 md:px-10 min-h-screen bg-gray-500/10">
        <div className="max-w-4xl mx-auto
                        bg-gray-400/40 backdrop-blur-xl
                        rounded-3xl border border-gray-500/30
                        p-6">

          <h1 className="text-2xl font-bold text-black mb-6">
            Your Chats
          </h1>

          <div className="space-y-4">
            {chats.map(chat => (
              <ChatItem
                key={chat.id}
                name={chat.name}
                message={chat.lastMessage}
                onClick={() => navigate(`/chat/${chat.id}`)}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default ChatList;
