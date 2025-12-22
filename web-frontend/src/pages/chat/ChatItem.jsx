function ChatItem({ name, message, unreadCount, onClick }) {
  return (
    <div onClick={onClick} className="flex justify-between items-center p-4">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>

      {unreadCount > 0 && (
        <span className="
          bg-black text-white text-xs
          px-2 py-1 rounded-full
        ">
          {unreadCount}
        </span>
      )}
    </div>
  );
}

export default ChatItem;
