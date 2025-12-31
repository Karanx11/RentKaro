import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

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
import Notifications from "./pages/Notifications";

import { socket } from "./services/socket";

function App() {

  /* =====================
     SOCKET CONNECTION
  ===================== */
  useEffect(() => {
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

    // 🔌 Connect socket once
    if (!socket.connected) {
      socket.connect();
    }

    // 👤 Join user room
    socket.emit("join", user._id);
    console.log("🟢 Socket joined room for user:", user._id);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
      console.log("🔴 Socket disconnected");
    };
  }, []); // ⛔ DO NOT add token/user here

  /* =====================
     SERVICE WORKER
  ===================== */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return (
    <BrowserRouter>
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
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
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

      </Routes>

      {/* ===== GLOBAL FLOATING COMPONENT ===== */}
      <KokkieBot />
    </BrowserRouter>
  );
}

export default App;
