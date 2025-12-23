import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  /* ================= FETCH PRODUCT ================= */
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

  /* ================= CHAT WITH OWNER ================= */
  const handleChat = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/chat/start`, {
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

      navigate(`/chat/${chat._id}`, {
        state: {
          product,
          autoMessage:
            "Hey there! I liked your product and want further information regarding this.",
        },
      });
    } catch (err) {
      console.error("Chat start failed", err);
      alert("Unable to start chat");
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return <p className="text-center mt-40">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-40">Product not found</p>;
  }

  const isOwner = userId === product.owner?._id;

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-6 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          <div className="bg-gray-400/40 backdrop-blur-xl border rounded-3xl p-10 flex flex-col lg:flex-row gap-12">

            {/* ================= IMAGES ================= */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-xl font-bold mb-4">Product Images</h2>

              <div className="h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={selectedImage}
                  className="w-full h-full object-cover"
                  alt="product"
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

            {/* ================= DETAILS ================= */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">

              {/* TITLE */}
              <div>
                <h2 className="text-xl font-bold mb-2">Product Title</h2>
                <h1 className="text-4xl font-extrabold">
                  {product.title}
                </h1>
              </div>

              {/* LOCATION */}
              <div>
                <h2 className="text-xl font-bold mb-2">Location</h2>
                <p className="flex items-center gap-2 text-gray-700">
                  <IoLocationOutline className="text-2xl" />
                  {product.location}
                </p>
              </div>

              {/* DESCRIPTION */}
              <div>
                <h2 className="text-xl font-bold mb-2">Description</h2>
                <p className="text-lg text-gray-800">
                  {product.description}
                </p>
              </div>

              {/* PRICING */}
              <div>
                <h2 className="text-xl font-bold mb-3">Pricing</h2>

                {product.listingType === "rent" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

              {/* CHAT BUTTON */}
              {!isOwner && (
                <div className="pt-6">
                  <button
                    onClick={handleChat}
                    className="
                      w-full bg-black text-white
                      px-8 py-4 rounded-xl
                      font-bold shadow-xl
                      flex items-center justify-center gap-3
                      hover:bg-gray-800 transition
                    "
                  >
                    <FiMessageSquare />
                    Chat with Owner
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
