import NavBar from "../components/NavBar";
import KokkieBot from "../components/KokkieBot";

function ChatBot() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <NavBar />

      {/* PAGE */}
      <div
        className="
          w-full min-h-screen
          bg-gray-500/10
          pt-24 pb-16 px-4
        "
      >
        {/* 🔒 LOGIN CHECK */}
        {!isLoggedIn ? (
          <div className="h-[50vh] flex items-center justify-center">
            <div
              className="
                bg-black/60 backdrop-blur-lg
                border border-white/20
                rounded-xl
                p-6
                text-center text-white
                max-w-sm w-full
              "
            >
              <h2 className="text-lg font-semibold mb-2">
                Please Login
              </h2>
              <p className="text-sm text-white/70">
                Login to chat with RentKaro AI Assistant 🤖
              </p>
            </div>
          </div>
        ) : (
          // 🤖 Floating Kokkie Bot
          <KokkieBot />
        )}
      </div>
    </>
  );
}

export default ChatBot;
