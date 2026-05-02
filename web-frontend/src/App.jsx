import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import KokkieBot from "./components/KokkieBot";
import ProtectedRoute from "./components/ProtectedRoute";

/* ===== AUTH ===== */
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

/* ===== HOME ===== */
import Home from "./pages/home/Home";
import Market from "./pages/home/Market";
import Sell from "./pages/home/Sell";
import Profile from "./pages/home/Profile";
import MyListings from "./pages/home/MyListings";
import EditListing from "./pages/home/EditListing";

/* ===== CHAT ===== */
import ChatBot from "./pages/chatbot/ChatBot";
import ChatHistory from "./pages/chatbot/ChatHistory";

/* ===== SETTINGS ===== */
import Settings from "./pages/settings/Settings";
import HelpSupport from "./pages/settings/HelpSupport";
import Terms from "./pages/settings/Terms";
import Privacy from "./pages/settings/Privacy";
import MyRequests from "./pages/settings/MyRequests";

/* ===== OTHER COMPONENTS ===== */
import ProductDetails from "./components/ProductDetails";
import EditProfile from "./components/EditProfile";
import CompleteProfile from "./pages/auth/CompleteProfile";

/* ===== SOCKET ===== */
import { socket } from "./services/socket";

function App() {
  const socketInitialized = useRef(false);

  /* SOCKET CONNECTION */
  useEffect(() => {
    if (socketInitialized.current) return;
    socketInitialized.current = true;

    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userStr || !token || userStr === "undefined") return;

    let user;
    try {
      user = JSON.parse(userStr);
    } catch {
      localStorage.removeItem("user");
      return;
    }

    if (!socket.connected) socket.connect();

    socket.on("connect", () => {
      socket.emit("join", user._id);
      console.log("🟢 Socket connected:", user._id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);

  /* DISABLE SERVICE WORKER */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
    }
  }, []);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <HashRouter>
      <Routes>

        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* AUTH */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/profile" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/profile" /> : <Signup />}
        />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* PUBLIC SETTINGS */}
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* ===== PROTECTED ===== */}
        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <Sell />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat-history"
          element={
            <ProtectedRoute>
              <ChatHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-listings"
          element={
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-listing/:id"
          element={
            <ProtectedRoute>
              <EditListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {/* GLOBAL BOT */}
      <KokkieBot />
    </HashRouter>
  );
}

export default App;