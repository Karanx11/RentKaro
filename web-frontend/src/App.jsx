import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import ChatScreen from "./pages/ChatScreen";
import ChatBot from "./pages/ChatBot"; 
import Login from "./pages/Login";
import Market from "./pages/Market";
import EditProfile from "./components/EditProfile";
import ProductDetails from "./components/ProductDetails"
import KokkieBot from "./components/KokkieBot";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import HelpSupport from "./pages/HelpSupport"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
function App() {
  return (
    <BrowserRouter>

      {/* Floating chatbot visible everywhere */}
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
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
