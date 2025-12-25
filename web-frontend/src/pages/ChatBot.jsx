import NavBar from "../components/NavBar";
import KokkieBot from "../components/KokkieBot";

function ChatBot() {
  return (
    <>
      <NavBar />

      {/* PAGE BACKGROUND */}
      <div
        className="
          w-full min-h-screen
          bg-gray-500/10 backdrop-blur-lg
          pt-28 pb-28 px-6
        "
      >
        {/* Chatbot is floating, no wrapper needed */}
        <KokkieBot />
      </div>
    </>
  );
}

export default ChatBot;
