import NavBar from "../components/NavBar";
import KokkieBot from "../components/KokkieBot";

function ChatBot() {
  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg pt-28 flex justify-center px-6">
        <div className="max-w-3xl w-full">
          <KokkieBot />
        </div>
      </div>
    </>
  );
}

export default ChatBot;
