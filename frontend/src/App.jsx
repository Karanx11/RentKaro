import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
