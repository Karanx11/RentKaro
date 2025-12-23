import { IoSearch } from "react-icons/io5";
import RecentlyViewed from "./RecentlyViewed";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeBody() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/market?search=${encodeURIComponent(query)}`);
  };

  return (
    <div
      className="
        w-full min-h-screen 
        bg-gray-500/10 backdrop-blur-lg
        px-4 sm:px-6 md:px-12 
        pt-32 pb-20     
        flex flex-col items-center
      "
    >
      {/* ================= HERO CARD ================= */}
      <div
        className="
          w-full max-w-[1500px]
          min-h-[600px]
          rounded-3xl overflow-hidden
          bg-gray-400/40
          border border-gray-500/30 
          shadow-[0_8px_32px_rgba(31,38,135,0.37)]
          flex flex-col lg:flex-row 
          items-center justify-center gap-10
          p-6 sm:p-10
        "
      >
        {/* LEFT IMAGE */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/src/assets/Home-Side.png"
            className="w-[70%] sm:w-[60%] md:w-[75%] lg:w-[85%]"
            alt="RentKaro hero"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight">
            Find the Perfect Item <br /> to Rent Today
          </h1>

          <p className="mt-4 text-lg md:text-xl text-[#140c08] max-w-lg">
            From electronics to daily essentials — RentKaro makes it super easy.
          </p>

          {/* ================= SEARCH BAR ================= */}
          <div className="mt-8 w-full max-w-lg bg-gray-500 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-4 px-4 py-4">
            <div className="flex items-center flex-1 bg-white rounded-xl px-4 py-3 shadow-md">
              <IoSearch className="text-gray-600 text-2xl mr-3" />
              <input
                type="text"
                placeholder="Search for items..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-transparent outline-none text-lg text-gray-700"
              />
            </div>

            <button
              onClick={handleSearch}
              className="
                bg-black hover:bg-gray-800
                text-white hover:text-[#C76A46]
                px-6 py-3 rounded-xl
                text-lg font-semibold flex items-center gap-2
                shadow-lg w-full sm:w-auto justify-center
              "
            >
              <IoSearch className="text-2xl" />
              Search
            </button>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="flex gap-6 mt-8 flex-wrap justify-center lg:justify-start">
            <button
              onClick={() => navigate("/market")}
              className="bg-black px-10 py-3 rounded-xl text-white font-semibold shadow-lg"
            >
              Market
            </button>

            <button
              onClick={() => navigate("/sell")}
              className="bg-black px-10 py-3 rounded-xl text-white font-semibold shadow-lg"
            >
              Rent / Sell
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="bg-black px-10 py-3 rounded-xl text-white font-semibold shadow-lg"
            >
              Chats
            </button>
          </div>
        </div>
      </div>

      {/* ================= SPACING ================= */}
      <div className="h-12" />

      {/* ================= RECENTLY VIEWED ================= */}
      <RecentlyViewed />
    </div>
  );
}

export default HomeBody;
