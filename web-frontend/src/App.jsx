import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import KokkieBot from "./components/KokkieBot";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import ChatBot from "./pages/ChatBot";
import Login from "./pages/Login";
import Market from "./pages/Market";
import EditProfile from "./components/EditProfile";
import ProductDetails from "./components/ProductDetails";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import HelpSupport from "./pages/HelpSupport";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ResetPassword from "./pages/ResetPassword";
import MyListings from "./pages/MyListings";
import EditListing from "./pages/EditListing";
import MyRequests from "./pages/MyRequests";

import { socket } from "./services/socket";

function App() {
  const socketInitialized = useRef(false);

  /* =====================
     SOCKET CONNECTION
  ===================== */
  useEffect(() => {
    if (socketInitialized.current) return;
    socketInitialized.current = true;

    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userStr || !token || userStr === "undefined") return;

    let user;
    try {
      user = JSON.parse(userStr);
    } catch (err) {
      console.warn("Invalid user in localStorage", err);
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      socket.emit("join", user._id);
      console.log("🟢 Socket joined room for user:", user._id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);

  /* =====================
     SERVICE WORKER (disabled)
  ===================== */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
    }
  }, []);

  return (
    <HashRouter>
      <Routes>

        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ===== PROTECTED ROUTES ===== */}
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
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editprofile"
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
          path="/my-requests"
          element={
            <ProtectedRoute>
              <MyRequests />
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

        {/* ===== FALLBACK ROUTE ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      {/* ===== GLOBAL FLOATING COMPONENT ===== */}
      <KokkieBot />
    </HashRouter>
  );
}

export default App;