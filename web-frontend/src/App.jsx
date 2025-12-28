import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import InstallAppButton from "./components/InstallAppButton";
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

function App() {

  // ✅ SERVICE WORKER REGISTER
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return (
    <BrowserRouter>

      {/* 🔹 ROUTES ONLY */}
      <Routes>
        {/* PUBLIC ROUTES */}
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

        {/* 🔒 PROTECTED ROUTES */}
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
          path="/edit-listing/:id"
          element={
            <ProtectedRoute>
              <EditListing />
            </ProtectedRoute>
          }
        />
      </Routes>
      

      {/*FLOATING GLOBAL COMPONENTS */}
     
      <KokkieBot />

    </BrowserRouter>
  );
}

export default App;
