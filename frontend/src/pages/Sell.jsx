import HomeBody from "../components/HomeBody"; // remove if not needed

function Sell() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-orange-300 via-peach-200 to-white overflow-hidden">

      {/* CLOUDS */}
      <div className="absolute bottom-0 left-0 w-full h-[180px]
        bg-[radial-gradient(circle_at_50%_80%,_white_40%,_rgba(255,255,255,0)_70%)]
        opacity-90">
      </div>

      {/* Cloud Layer 2 */}
      <div className="absolute bottom-[-40px] left-0 w-full h-[200px]
        bg-[radial-gradient(circle_at_20%_70%,_white_50%,_transparent_75%)]
        opacity-60">
      </div>

      {/* Cloud Layer 3 */}
      <div className="absolute bottom-[-70px] right-0 w-full h-[200px]
        bg-[radial-gradient(circle_at_80%_70%,_white_50%,_transparent_75%)]
        opacity-70">
      </div>

      {/* SELL PAGE CONTENT */}
      <div className="relative z-10 w-full flex flex-col items-center pt-32 px-4">

        <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg text-center">
          Sell Your Items with Ease
        </h1>

        <p className="text-xl text-gray-700 mt-4 opacity-80 text-center max-w-2xl">
          List your items and connect with renters instantly. Start earning today!
        </p>

        {/* Example Sell Form Section */}
        <div className="mt-10 w-full max-w-3xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Item Details</h2>

          <input
            type="text"
            placeholder="Item Name"
            className="w-full p-3 rounded-lg border mb-4 outline-none"
          />

          <input
            type="number"
            placeholder="Price per Day"
            className="w-full p-3 rounded-lg border mb-4 outline-none"
          />

          <textarea
            placeholder="Describe your item..."
            className="w-full p-3 rounded-lg border mb-4 outline-none h-32"
          />

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
            Submit Listing
          </button>
        </div>

      </div>
    </div>
  );
}

export default Sell;
