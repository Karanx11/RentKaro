function MessageBubble({ msg }) {
  const isMe = msg.from === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md
                       ${isMe
                         ? "bg-black text-white rounded-br-none"
                         : "bg-white/80 text-gray-900 border border-gray-300 rounded-bl-none"}`}>
        {msg.text}
      </div>
    </div>
  );
}

export default MessageBubble;
