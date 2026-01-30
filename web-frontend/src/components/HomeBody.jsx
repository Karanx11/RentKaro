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
        bg-gray-500/10
        px-4 sm:px-6
        pt-24 pb-16
        flex flex-col items-center
      "
    >
      {/* ================= HERO CARD ================= */}
      <div
        className="
          w-full max-w-6xl
          rounded-2xl overflow-hidden
          bg-gray-400/40
          border border-gray-500/30
          shadow-lg
          flex flex-col lg:flex-row
          items-center gap-8
          p-6 sm:p-8
        "
      >
        {/* LEFT IMAGE */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/src/assets/Home-Side.png"
            className="w-[60%] sm:w-[55%] lg:w-[70%]"
            alt="RentKaro hero"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
            Find the Perfect Item <br /> to Rent Today
          </h1>

          <p className="mt-3 text-base text-[#140c08] max-w-md">
            From electronics to daily essentials — RentKaro makes renting simple
            and affordable.
          </p>

          {/* ================= SEARCH BAR ================= */}
          <div className="mt-6 w-full max-w-md bg-gray-500 rounded-xl flex flex-col sm:flex-row gap-3 px-3 py-3">
            <div className="flex items-center flex-1 bg-white rounded-lg px-3 py-2">
              <IoSearch className="text-gray-600 text-lg mr-2" />
              <input
                type="text"
                placeholder="Search for items..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              />
            </div>

            <button
              onClick={handleSearch}
              className="
                bg-black hover:bg-gray-800
                text-white hover:text-[#C76A46]
                px-4 py-2 rounded-lg
                text-sm font-semibold flex items-center gap-2
                w-full sm:w-auto justify-center
              "
            >
              <IoSearch className="text-base" />
              Search
            </button>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="flex gap-4 mt-6 flex-wrap justify-center lg:justify-start">
            <button
              onClick={() => navigate("/market")}
              className="bg-black hover:text-[#C76A46] px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
            >
              Market
            </button>

            <button
              onClick={() => navigate("/sell")}
              className="bg-black hover:text-[#C76A46] px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
            >
              Rent / Sell
            </button>

            <button
              onClick={() => navigate("/my-listings")}
              className="bg-black hover:text-[#C76A46] px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
            >
              My Listings
            </button>
          </div>
        </div>
      </div>

      {/* ================= SPACING ================= */}
      <div className="h-8" />

      {/* ================= RECENTLY VIEWED ================= */}
      <RecentlyViewed />
    </div>
  );
}

export default HomeBody;
