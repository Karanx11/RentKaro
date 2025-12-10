import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import ChatScreen from "./pages/ChatScreen";
import ChatBot from "./pages/ChatBot"; 
import Market from "./pages/Market";
import EditProfile from "./components/EditProfile";
import ProductDetails from "./components/ProductDetails"
import KokkieBot from "./components/KokkieBot";
import About from "./pages/About";

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
        <Route path="/market" element={<Market />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
