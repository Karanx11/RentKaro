import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import ChatScreen from "./pages/ChatScreen";
import ChatBot from "./pages/ChatBot"; // fixed import
import EditProfile from "./components/EditProfile";

import KokkieBot from "./components/KokkieBot"; // floating bot

function App() {
  return (
    <BrowserRouter>

      {/* 🔥 Floating chatbot visible everywhere */}
      <KokkieBot />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
