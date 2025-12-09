import { IoSearch } from "react-icons/io5";

function HomeBody() {
  return (
    <div className="w-full max-w-[1200px] mx-auto mt-28 px-4">

      {/* BIG CARD */}
      <div className="relative w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl">

        {/* Background Image */}
        <img
          src="/src/assets/home-bg.avif"
          className="absolute inset-0 h-full w-full object-cover scale-110"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-2xl">
            Find the Perfect Item to Rent Today
          </h1>

          {/* Subtext */}
          <p className="mt-3 text-lg md:text-xl opacity-90 drop-shadow-md text-center max-w-2xl">
            From electronics to daily essentials — RentKaro makes it super easy.
          </p>

          {/* BIG SEARCH BAR */}
          <div className="
            mt-8
            w-full max-w-3xl 
            bg-orange-200 backdrop-blur-lg
            border border-orange-200
            rounded-2xl 
            shadow-xl 
            px-4 md:px-6 
            py-4 
            flex flex-col md:flex-row gap-4 md:gap-3 items-center
          ">

            {/* Input field */}
            <div className="flex items-center w-full flex-1 bg-white rounded-xl px-4 py-3 shadow-md">
              <IoSearch className="text-gray-600 text-2xl mr-3" />
              <input
                type="text"
                placeholder="Search for items…"
                className="flex-1 bg-transparent outline-none text-gray-800 text-lg placeholder-gray-500"
              />
            </div>

            {/* Search Button */}
            <button
              className="
                bg-orange-400
                hover:bg-orange-300
                text-black
                rounded-xl 
                px-8 py-3 
                text-lg font-semibold 
                shadow-lg
                flex items-center gap-2 
                w-full md:w-auto justify-center
              "
            >
              <IoSearch className="hover:text-white-400 text-2xl" />
              Search
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default HomeBody;
