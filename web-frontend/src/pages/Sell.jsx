import { useState } from "react";
import NavBar from "../components/NavBar"; // <-- make sure the path is correct

const CATEGORIES = [
  "Electronics",
  "Camera",
  "Computers",
  "Books",
  "Tools",
  "Gaming",
  "Camping",
  "Furniture",
  "Other",
];

function Sell() {
  const [images, setImages] = useState([null, null, null]);
  const [mode, setMode] = useState("rent");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");



  // Handle image upload and preview
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = [...images];
    updatedImages[index] = URL.createObjectURL(file);
    setImages(updatedImages);
  };

  return (
    <>
      {/* NAVBAR */}
      <NavBar />

      {/* PAGE BODY */}
      <div className="w-full min-h-screen bg-gray-500/10 border border-gray-500/10 px-6 md:px-20 py-28">

        <div className="max-w-4xl mx-auto bg-gray-400/40 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-black">
            List Your Product
          </h1>
          <p className="text-center text-gray-700 mt-2">
            Add product details and choose whether you want to Rent or Sell.
          </p>

          {/* FORM */}
          <div className="mt-10 space-y-10">

            {/* IMAGE INPUTS */}
            <div>
              <label className="block text-xl font-semibold mb-3 text-gray-800">
                Upload Images (3 required)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {images.map((img, i) => (
                  <label
                    key={i}
                    className="
                      w-full h-40 bg-white/50 border border-gray-300 
                      rounded-xl cursor-pointer flex items-center justify-center 
                      overflow-hidden shadow-md hover:shadow-lg transition
                    "
                  >
                    {img ? (
                      <img src={img} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500">Click to Upload</span>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, i)}
                      required
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* PRODUCT NAME */}
            <div>
              <label className="block text-xl font-semibold mb-2 text-gray-800">
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g. DSLR Camera, Electric Drill..."
                className="w-full px-5 py-3 rounded-xl bg-white/80 border border-gray-300 text-gray-900 text-lg outline-none shadow-md"
                required
              />
            </div>
            
            {/* CATEGORY SELECTION */}
            <div>
              <label className="block text-xl font-semibold mb-3 text-gray-800">
                Select Category
              </label>

              <div className="flex gap-4 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`
                      px-6 py-3 rounded-xl text-sm font-semibold
                      backdrop-blur-xl border shadow-md transition
                      ${
                        category === cat
                          ? "bg-black text-white border-black"
                          : "bg-white/60 text-black border-gray-300 hover:bg-white"
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT DESCRIPTION */}
            <div>
              <label className="block text-xl font-semibold mb-2 text-gray-800">
                Product Description
              </label>

              <textarea
                maxLength={500}
                rows={3}
                placeholder="Describe your product (condition, usage, accessories, etc.)"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="
                  w-full px-5 py-4 rounded-xl
                  bg-white/80 border border-gray-300
                  text-gray-900 text-lg
                  outline-none resize-none
                  shadow-md
                  focus:border-black
                  transition
                "
                required
              />

              {/* CHARACTER COUNTER */}
              <div className="mt-1 text-right text-sm text-gray-600">
                {description.length} / 500
              </div>
            </div>

            {/* PRICING */}
              <div>
                <label className="block text-xl font-semibold mb-3 text-gray-800">
                  Pricing
                </label>

                {mode === "rent" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <input
                      type="number"
                      placeholder="Per Day (₹)"
                      className="px-5 py-3 rounded-xl bg-white/80 border border-gray-300 shadow-md text-lg"
                    />
                    <input
                      type="number"
                      placeholder="Per Month (₹)"
                      className="px-5 py-3 rounded-xl bg-white/80 border border-gray-300 shadow-md text-lg"
                    />
                    <input
                      type="number"
                      placeholder="Per Year (₹)"
                      className="px-5 py-3 rounded-xl bg-white/80 border border-gray-300 shadow-md text-lg"
                    />
                  </div>
                ) : (
                  <input
                    type="number"
                    placeholder="Selling Price (₹)"
                    className="w-full px-5 py-3 rounded-xl bg-white/80 border border-gray-300 shadow-md text-lg"
                  />
                )}
              </div>



            {/* RENT / SELL TOGGLE */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Choose Listing Type
              </h3>

              <div className="flex justify-center gap-6">

                <button
                  onClick={() => setMode("rent")}
                  className={`
                    px-10 py-3 text-lg rounded-xl font-semibold
                    shadow-lg border transition
                    ${mode === "rent"
                      ? "bg-black text-white border-black"
                      : "bg-white/60 text-black border-gray-400 hover:bg-white"}
                  `}
                >
                  Rent
                </button>

                <button
                  onClick={() => setMode("sell")}
                  className={`
                    px-10 py-3 text-lg rounded-xl font-semibold
                    shadow-lg border transition
                    ${mode === "sell"
                      ? "bg-black text-white border-black"
                      : "bg-white/60 text-black border-gray-400 hover:bg-white"}
                  `}
                >
                  Sell
                </button>

              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="text-center mt-10">
              <button
                className="
                  px-14 py-4 bg-[#C76A46] text-white rounded-2xl 
                  text-xl font-bold shadow-xl hover:bg-[#b65e3f] transition
                "
              >
                Submit Listing
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default Sell;
