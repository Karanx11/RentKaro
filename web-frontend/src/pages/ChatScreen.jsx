import { useState } from "react";
import { IoSend } from "react-icons/io5";
import NavBar from "../components/NavBar";

function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, from: "other", text: "Hi! Is this item available?" },
    { id: 2, from: "me", text: "Yes! It is available for rent." },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", text: input },
    ]);
    setInput("");
  };

  return (
    <>
      <NavBar />

      {/* PAGE WRAPPER */}
      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg
                      pt-24 pb-28 px-4 md:px-10">

        <div
          className="
            max-w-7xl mx-auto
            h-[calc(100vh-160px)]
            rounded-3xl overflow-hidden
            border border-gray-500/30
            bg-gray-400/40 backdrop-blur-xl
            shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            flex
          "
        >

          {/* ================= LEFT CHAT LIST (DESKTOP) ================= */}
          <div
            className="
              hidden md:block w-1/3 h-full
              border-r border-gray-500/30
              bg-gray-400/30 backdrop-blur-xl
              p-6 overflow-y-auto
            "
          >
            <h2 className="text-2xl font-bold text-black mb-6">
              Chats
            </h2>

            <ChatItem
              name="Rahul Kumar"
              message="Is this available?"
              active
            />
          </div>

          {/* ================= RIGHT CHAT WINDOW ================= */}
          <div className="flex-1 flex flex-col h-full">

            {/* CHAT HEADER */}
            <div
              className="
                px-6 py-4 border-b border-gray-500/30
                bg-white/30 backdrop-blur-xl
                flex items-center gap-4
              "
            >
              <img
                src="https://i.imgur.com/6VBx3io.png"
                alt="user"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-black text-lg">
                  Rahul Kumar
                </p>
                <p className="text-sm text-gray-700">
                  Online
                </p>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.from === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[80%] md:max-w-sm
                      px-5 py-3 rounded-2xl
                      shadow-md backdrop-blur-xl
                      ${
                        msg.from === "me"
                          ? "bg-black text-white"
                          : "bg-white/80 text-gray-900 border border-gray-300"
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT BAR */}
            <div
              className="
                p-4 border-t border-gray-500/30
                bg-white/40 backdrop-blur-xl
                flex items-center gap-4
              "
            >
              <input
                type="text"
                placeholder="Type a message..."
                className="
                  flex-1 px-4 py-3 rounded-xl
                  bg-white/80 outline-none text-gray-900
                  border border-gray-300 shadow-md
                "
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              <button
                onClick={handleSend}
                className="
                  p-3 rounded-xl bg-black text-white
                  hover:bg-gray-800 hover:text-[#C76A46]
                  shadow-lg transition
                "
              >
                <IoSend className="text-2xl" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ChatScreen;

/* ================= SMALL COMPONENT ================= */

function ChatItem({ name, message, active }) {
  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-xl cursor-pointer
        border border-gray-500/20 shadow-sm transition
        ${
          active
            ? "bg-white/40"
            : "bg-white/20 hover:bg-white/30"
        }
      `}
    >
      <img
        src="https://i.imgur.com/6VBx3io.png"
        alt={name}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-semibold text-black">
          {name}
        </p>
        <p className="text-gray-700 text-sm truncate w-40">
          {message}
        </p>
      </div>
    </div>
  );
}
