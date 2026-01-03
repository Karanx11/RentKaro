import NavBar from "../components/NavBar";
import KokkieBot from "../components/KokkieBot";

function ChatBot() {
  const isLoggedIn = !!localStorage.getItem("token");

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
        {/* 🔒 LOGIN CHECK */}
        {!isLoggedIn ? (
          <div className="h-[60vh] flex items-center justify-center">
            <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center text-white max-w-md">
              <h2 className="text-xl font-semibold mb-3">
                Please Login
              </h2>
              <p className="text-white/70">
                Login to chat with RentKaro AI Assistant 🤖
              </p>
            </div>
          </div>
        ) : (
          // 🤖 Floating Gemini Bot
          <KokkieBot />
        )}
      </div>
    </>
  );
}

export default ChatBot;
