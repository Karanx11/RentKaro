import { useState } from "react";
import { IoClose, IoSend } from "react-icons/io5";
import { SiProbot } from "react-icons/si";

function KokkieBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Kokkie 🤖 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: input },
      { from: "bot", text: "Kokkie will soon reply with smart suggestions ✨" }
    ]);

    setInput("");
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-50
          w-16 h-16 rounded-full
          bg-black text-white
          flex items-center justify-center
          shadow-xl hover:bg-gray-800
          transition
        "
      >
        <SiProbot />
      </button>

      {/* CHATBOT PANEL */}
      {open && (
        <div
          className="
            fixed bottom-24 right-6 z-50
            w-[90%] sm:w-[350px] h-[480px]
            bg-white/30 backdrop-blur-xl
            border border-gray-500/30
            shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            rounded-3xl overflow-hidden
            flex flex-col
          "
        >
          {/* HEADER */}
          <div className="bg-black text-white px-5 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Kokkie Bot 🤖</h2>
            <IoClose className="text-2xl cursor-pointer" onClick={() => setOpen(false)} />
          </div>

          {/* MESSAGE AREA */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`
                  max-w-[80%] px-4 py-3 rounded-xl
                  ${msg.from === "bot"
                    ? "bg-white text-black border border-gray-300"
                    : "bg-black text-white ml-auto"}
                `}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT AREA */}
          <div className="p-3 flex gap-3 border-t border-gray-500/30 bg-white/40 backdrop-blur-md">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              type="text"
              placeholder="Ask Kokkie..."
              className="flex-1 px-4 py-2 rounded-xl bg-white shadow-md outline-none"
            />
            <button
              onClick={sendMessage}
              className="p-3 bg-black text-white rounded-xl shadow hover:bg-gray-800"
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
