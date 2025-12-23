function MessageBubble({ msg }) {
  const isMe = msg.from === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[75%] px-5 py-3 rounded-2xl shadow-md
          flex flex-col gap-1
          ${
            isMe
              ? "bg-black text-white rounded-br-none"
              : "bg-white/80 text-gray-900 border border-gray-300 rounded-bl-none"
          }
        `}
      >
        {/* MESSAGE TEXT */}
        <p className="break-words">{msg.text}</p>

        {/* OPTIONAL TIMESTAMP */}
        {msg.createdAt && (
          <span
            className={`text-[10px] ${
              isMe ? "text-gray-300" : "text-gray-500"
            } self-end`}
          >
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
