import { useEffect, useState } from "react";

function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // stop browser mini popup
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("✅ App installed");
    } else {
      console.log("❌ App install dismissed");
    }

    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleInstall}
      className="
        fixed bottom-24 right-6 z-50
        px-4 py-3 rounded-xl
        bg-black text-white
        hover:text-[#C76A46]
        shadow-lg hover:scale-105 transition
      "
    >
      📲 Install App
    </button>
  );
}

export default InstallAppButton;
