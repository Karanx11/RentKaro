import { useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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

  const [loading, setLoading] = useState(false); // 🔥 NEW

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
      alert("Upload exactly 3 images");
      return;
    }

    if (mode === "sell" && !prices.sell) {
      alert("Enter selling price");
      return;
    }

    if (mode === "rent" && !prices.day) {
      alert("Enter rent price");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("listingType", mode);
    formData.append(
      "price",
      JSON.stringify(
        mode === "rent"
          ? {
              day: Number(prices.day),
              month: Number(prices.month || 0),
              year: Number(prices.year || 0),
            }
          : {
              sell: Number(prices.sell),
            }
      )
    );

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true); // 🔥 START LOADING

      await api.post("/api/products", formData);

      alert("Product listed successfully 🎉");

      navigate("/market");
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to list product"
      );
    } finally {
      setLoading(false); // 🔥 STOP LOADING
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

            {/* IMAGE UPLOAD */}
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

            {/* TITLE */}
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded"
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded"
            />

            {/* LOCATION */}
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 rounded"
            />

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#C76A46] text-white px-6 py-3 rounded flex items-center justify-center gap-2 w-full disabled:opacity-60"
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