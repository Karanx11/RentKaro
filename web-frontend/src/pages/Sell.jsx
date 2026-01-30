import { useState } from "react";
import NavBar from "../components/NavBar";

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
  const [imageFiles, setImageFiles] = useState([null, null, null]);

  const [mode, setMode] = useState("rent");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [prices, setPrices] = useState({
    day: "",
    month: "",
    year: "",
    sell: "",
  });

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    const updatedImages = [...images];
    const updatedFiles = [...imageFiles];

    updatedImages[index] = preview;
    updatedFiles[index] = file;

    setImages(updatedImages);
    setImageFiles(updatedFiles);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!title || !category || !description || !location) {
      alert("Please fill all required fields");
      return;
    }

    if (imageFiles.filter(Boolean).length !== 3) {
      alert("Please upload exactly 3 images");
      return;
    }

    if (mode === "sell" && !prices.sell) {
      alert("Please enter selling price");
      return;
    }

    if (mode === "rent" && !prices.day) {
      alert("Please enter rent price");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    const pricePayload =
      mode === "rent"
        ? {
            day: Number(prices.day),
            month: Number(prices.month || 0),
            year: Number(prices.year || 0),
          }
        : {
            sell: Number(prices.sell),
          };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("listingType", mode);
    formData.append("price", JSON.stringify(pricePayload));

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to list product");
        return;
      }

      alert("Product listed successfully 🎉");
      window.location.href = "/market";
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-4 md:px-10 py-20">
        <div className="max-w-3xl mx-auto bg-gray-400/40 backdrop-blur-xl shadow-xl rounded-2xl p-6 md:p-8 border border-white/40">

          <h1 className="text-2xl md:text-3xl font-bold text-center text-black">
            List Your Product
          </h1>

          <div className="mt-6 space-y-6">

            {/* IMAGES */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Upload Images (3 required)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <label
                    key={i}
                    className="w-full h-28 bg-white/50 border rounded-lg cursor-pointer flex items-center justify-center overflow-hidden"
                  >
                    {img ? (
                      <img
                        src={img}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        Click to Upload
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, i)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* TITLE */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Product Name
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/80 border shadow-sm text-sm"
                placeholder="e.g. DSLR Camera"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Select Category
              </label>
              <div className="flex gap-3 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      category === cat
                        ? "bg-black text-white"
                        : "bg-white/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-white/80 border shadow-sm resize-none text-sm"
              />
              <div className="text-right text-xs">
                {description.length} / 500
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Delhi, Mumbai, Pune"
                className="w-full px-4 py-2.5 rounded-lg bg-white/80 border shadow-sm text-sm"
              />
            </div>

            {/* PRICING */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Pricing
              </label>

              {mode === "rent" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    placeholder="Per Day (₹)"
                    type="number"
                    onChange={(e) =>
                      setPrices((p) => ({ ...p, day: e.target.value }))
                    }
                    className="px-4 py-2.5 rounded-lg bg-white/80 border text-sm"
                  />
                  <input
                    placeholder="Per Month (₹)"
                    type="number"
                    onChange={(e) =>
                      setPrices((p) => ({ ...p, month: e.target.value }))
                    }
                    className="px-4 py-2.5 rounded-lg bg-white/80 border text-sm"
                  />
                  <input
                    placeholder="Per Year (₹)"
                    type="number"
                    onChange={(e) =>
                      setPrices((p) => ({ ...p, year: e.target.value }))
                    }
                    className="px-4 py-2.5 rounded-lg bg-white/80 border text-sm"
                  />
                </div>
              ) : (
                <input
                  placeholder="Selling Price (₹)"
                  type="number"
                  onChange={(e) =>
                    setPrices((p) => ({ ...p, sell: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg bg-white/80 border text-sm"
                />
              )}
            </div>

            {/* TOGGLE */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setMode("rent")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold ${
                  mode === "rent"
                    ? "bg-black text-white hover:text-[#C76A46]"
                    : "bg-white"
                }`}
              >
                Rent
              </button>
              <button
                type="button"
                onClick={() => setMode("sell")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold ${
                  mode === "sell"
                    ? "bg-black text-white hover:text-[#C76A46]"
                    : "bg-white"
                }`}
              >
                Sell
              </button>
            </div>

            {/* SUBMIT */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="px-10 py-3 bg-[#C76A46] hover:bg-[#d48a6d] text-white rounded-xl text-base font-bold"
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
