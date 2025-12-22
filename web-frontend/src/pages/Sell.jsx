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
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

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
  if (!title || !category || !description) {
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
  formData.append("listingType", mode);
  formData.append("price", JSON.stringify(pricePayload));

  imageFiles.forEach((file) => formData.append("images", file));

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
      console.error(err);
      alert(err.message || "Failed to list product");
      return;
    }

    alert("Product listed successfully 🎉");
    window.location.href = "/market";
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};


  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-6 md:px-20 py-28">
        <div className="max-w-4xl mx-auto bg-gray-400/40 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">

          <h1 className="text-4xl font-extrabold text-center text-black">
            List Your Product
          </h1>

          <div className="mt-10 space-y-10">

            {/* IMAGES */}
            <div>
              <label className="block text-xl font-semibold mb-3">
                Upload Images (3 required)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {images.map((img, i) => (
                  <label
                    key={i}
                    className="w-full h-40 bg-white/50 border rounded-xl cursor-pointer flex items-center justify-center overflow-hidden"
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
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* TITLE */}
            <div>
              <label className="block text-xl font-semibold mb-2">
                Product Name
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/80 border shadow-md"
                placeholder="e.g. DSLR Camera"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-xl font-semibold mb-3">
                Select Category
              </label>
              <div className="flex gap-4 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-6 py-3 rounded-xl font-semibold ${
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
              <label className="block text-xl font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                className="w-full px-5 py-4 rounded-xl bg-white/80 border shadow-md resize-none"
              />
              <div className="text-right text-sm">
                {description.length} / 500
              </div>
            </div>

            {/* PRICING */}
            <div>
              <label className="block text-xl font-semibold mb-3">
                Pricing
              </label>

              {mode === "rent" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <input
                    placeholder="Per Day (₹)"
                    type="number"
                    onChange={(e) =>
                      setPrices((p) => ({ ...p, day: e.target.value }))
                    }
                    className="px-5 py-3 rounded-xl bg-white/80 border"
                  />
                  <input
                    placeholder="Per Month (₹)"
                    type="number"
                    onChange={(e) =>
                      setPrices((p) => ({ ...p, month: e.target.value }))
                    }
                    className="px-5 py-3 rounded-xl bg-white/80 border"
                  />
                  <input
                    placeholder="Per Year (₹)"
                    type="number"
                    onChange={(e) =>
                      setPrices((p) => ({ ...p, year: e.target.value }))
                    }
                    className="px-5 py-3 rounded-xl bg-white/80 border"
                  />
                </div>
              ) : (
                <input
                  placeholder="Selling Price (₹)"
                  type="number"
                  onChange={(e) =>
                    setPrices((p) => ({ ...p, sell: e.target.value }))
                  }
                  className="w-full px-5 py-3 rounded-xl bg-white/80 border"
                />
              )}
            </div>

            {/* TOGGLE */}
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setMode("rent")}
                className={`px-10 py-3 rounded-xl ${
                  mode === "rent" ? "bg-black text-white" : "bg-white"
                }`}
              >
                Rent
              </button>
              <button
                onClick={() => setMode("sell")}
                className={`px-10 py-3 rounded-xl ${
                  mode === "sell" ? "bg-black text-white" : "bg-white"
                }`}
              >
                Sell
              </button>
            </div>

            {/* SUBMIT */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="px-14 py-4 bg-[#C76A46] text-white rounded-2xl text-xl font-bold"
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
