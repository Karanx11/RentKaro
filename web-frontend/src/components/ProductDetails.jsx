import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiMessageSquare, FiShoppingBag } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function ProductDetails() {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
        setSelectedImage(`${API_URL}${res.data.images[0]}`);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ---------------- CHAT ---------------- */
  const handleChat = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    return;
  }

  const res = await fetch("http://localhost:5000/api/chat/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ownerId: product.owner._id,
      productId: product._id,
    }),
  });

  const chat = await res.json();
  navigate(`/chat/${chat._id}`);
};


  /* ---------------- BUY / RENT ---------------- */
  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const endpoint =
        product.listingType === "rent"
          ? "/api/orders/rent"
          : "/api/orders/buy";

      await axios.post(
        `${API_URL}${endpoint}`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        product.listingType === "rent"
          ? "Rental request sent!"
          : "Purchase successful!"
      );

      handleChat(); // auto-open chat
    } catch (err) {
      console.error("Order failed", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-40">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-40">Product not found</p>;
  }

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-6 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          <div
            className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-3xl shadow-xl
              p-10 flex flex-col lg:flex-row gap-12
            "
          >
            {/* IMAGE GALLERY */}
            <div className="w-full lg:w-1/2">
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={selectedImage}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-4 mt-6">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={`${API_URL}${img}`}
                    onClick={() =>
                      setSelectedImage(`${API_URL}${img}`)
                    }
                    className={`w-24 h-24 rounded-xl object-cover cursor-pointer border
                      ${
                        selectedImage.includes(img)
                          ? "border-black"
                          : "border-gray-400"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <h1 className="text-4xl font-extrabold">
                {product.title}
              </h1>

              <p className="flex items-center gap-2 mt-2 text-gray-700">
                <IoLocationOutline className="text-2xl" />
                {product.location || "India"}
              </p>

              <p className="mt-4 text-lg text-gray-800">
                {product.description}
              </p>

              {/* PRICING */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-3">
                  Pricing
                </h2>

                {product.listingType === "rent" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-gray-300/50 p-4 rounded-xl">
                      ₹{product.price.day} / day
                    </div>
                    <div className="bg-gray-300/50 p-4 rounded-xl">
                      ₹{product.price.month} / month
                    </div>
                    <div className="bg-gray-300/50 p-4 rounded-xl">
                      ₹{product.price.year} / year
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-300/50 p-4 rounded-xl">
                    ₹{product.price.sell}
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-6 mt-10">
                <button
                  onClick={handleOrder}
                  className="
                    flex-1 bg-black hover:bg-gray-800
                    text-white hover:text-[#C76A46]
                    px-8 py-4 rounded-xl
                    text-lg font-bold shadow-xl
                    flex items-center justify-center gap-3
                  "
                >
                  <FiShoppingBag className="text-2xl" />
                  {product.listingType === "rent"
                    ? "Rent Now"
                    : "Buy Now"}
                </button>

                <button
                  onClick={handleChat}
                  className="
                    flex-1 bg-white/70 hover:bg-white
                    text-black border border-gray-400
                    px-8 py-4 rounded-xl
                    text-lg font-bold shadow-xl
                    flex items-center justify-center gap-3
                  "
                >
                  <FiMessageSquare className="text-2xl" />
                  Chat Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
