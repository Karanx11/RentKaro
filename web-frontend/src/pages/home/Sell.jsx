import { useState } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    const preview = URL.createObjectURL(file);

    const updatedImages = [...images];
    const updatedFiles = [...imageFiles];

    updatedImages[index] = preview;
    updatedFiles[index] = file;

    setImages(updatedImages);
    setImageFiles(updatedFiles);
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    if (!title || !category || !description || !location) {
      alert("Please fill all required fields");
      return false;
    }

    if (imageFiles.filter(Boolean).length !== 3) {
      alert("Please upload exactly 3 images");
      return false;
    }

    if (mode === "sell" && !prices.sell) {
      alert("Enter selling price");
      return false;
    }

    if (mode === "rent" && !prices.day) {
      alert("Enter rent price (per day)");
      return false;
    }

    return true;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("listingType", mode);

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

    formData.append("price", JSON.stringify(pricePayload));

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);

      await api.post("/api/products", formData);

      alert("Product listed successfully 🎉");

      navigate("/market"); // ✅ No 404

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to list product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-500/10 px-4 md:px-10 py-20">
        <div className="max-w-3xl mx-auto bg-gray-400/40 backdrop-blur-xl shadow-xl rounded-2xl p-6 md:p-8 border border-white/40">

          <h1 className="text-2xl md:text-3xl font-bold text-center">
            List Your Product
          </h1>

          <div className="mt-6 space-y-6">

            {/* IMAGE UPLOAD */}
            <div>
              <p className="text-sm font-semibold mb-2">
                Upload Images (3 required)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <label
                    key={i}
                    className="h-28 bg-white/50 border rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    {img ? (
                      <img
                        src={img}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Upload
                      </span>
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleImageUpload(e, i)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* TITLE */}
            <input
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/80"
            />

            {/* CATEGORY */}
            <div>
              <p className="text-sm font-semibold mb-2">
                Select Category
              </p>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded text-sm ${
                      category === cat
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded bg-white/80"
            />

            {/* LOCATION */}
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/80"
            />

            {/* MODE TOGGLE */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setMode("rent")}
                className={`px-6 py-2 rounded ${
                  mode === "rent"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                Rent
              </button>

              <button
                onClick={() => setMode("sell")}
                className={`px-6 py-2 rounded ${
                  mode === "sell"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                Sell
              </button>
            </div>

            {/* PRICING */}
            {mode === "rent" ? (
              <input
                placeholder="Price per day (₹)"
                type="number"
                onChange={(e) =>
                  setPrices((p) => ({
                    ...p,
                    day: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded bg-white/80"
              />
            ) : (
              <input
                placeholder="Selling price (₹)"
                type="number"
                onChange={(e) =>
                  setPrices((p) => ({
                    ...p,
                    sell: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded bg-white/80"
              />
            )}

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#C76A46] text-white py-3 rounded font-bold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Posting...
                </>
              ) : (
                "Submit Listing"
              )}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Sell;