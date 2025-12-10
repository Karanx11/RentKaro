import { IoSearch } from "react-icons/io5";
import Market from "../pages/Market";

function HomeBody() {
  return (
    <div
      className="
        w-full min-h-screen 
        bg-gray-500/10 backdrop-blur-lg
        flex items-center justify-center
        px-4 sm:px-6 md:px-12 py-20
      "
    >
      {/* CENTER WRAPPER */}
      <div className="w-full flex justify-center">

        {/* HERO CARD */}
        <div
          className="
            relative w-full max-w-[1500px] 
            min-h-[650px] md:h-[650px]
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
              className="
                w-[70%] sm:w-[60%] md:w-[75%] lg:w-[85%]
                h-auto drop-shadow-xl
              "
              alt="hero"
            />
          </div>

          {/* RIGHT TEXT CONTENT */}
          <div
            className="
              w-full lg:w-1/2 h-full
              flex flex-col items-center lg:items-start
              text-center lg:text-left
            "
          >
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight">
              Find the Perfect Item <br /> to Rent Today
            </h1>

            {/* Subtext */}
            <p className="mt-4 text-lg md:text-xl text-[#140c08] max-w-lg">
              From electronics to daily essentials — RentKaro makes it super easy.
            </p>

            {/* SEARCH BAR */}
            <div
              className="
                mt-8 w-full max-w-lg
                bg-gray-500 rounded-2xl shadow-xl
                flex flex-col sm:flex-row gap-4 sm:gap-3
                px-4 py-4
              "
            >
              {/* Input */}
              <div className="flex items-center flex-1 bg-white rounded-xl px-4 py-3 shadow-md">
                <IoSearch className="text-gray-600 text-2xl mr-3" />
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="flex-1 bg-transparent outline-none text-lg text-gray-700"
                />
              </div>

              {/* Search Button */}
              <button
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

            {/* RENT + SELL BUTTONS */}
            <div className="flex gap-6 mt-8 flex-wrap justify-center lg:justify-start">

              

              <a
                href="/sell"
                className="
                  bg-black hover:bg-gray-800
                  text-white hover:text-[#C76A46]
                  px-10 py-3 rounded-xl
                  text-lg font-semibold shadow-lg
                "
              >
                Rent/Sell
              </a>
               <a
                href="/market"
                className="
                  bg-black hover:bg-gray-800
                  text-white hover:text-[#C76A46]
                  px-10 py-3 rounded-xl
                  text-lg font-semibold shadow-lg
                "
              >
                Market
              </a>
              <a
                href="/about"
                className="
                  bg-black hover:bg-gray-800
                  text-white hover:text-[#C76A46]
                  px-10 py-3 rounded-xl
                  text-lg font-semibold shadow-lg
                "
              >
                About
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default HomeBody;
