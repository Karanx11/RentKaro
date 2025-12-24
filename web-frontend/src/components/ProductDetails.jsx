import { useEffect, useState } from "react";
import { IoLocationOutline, IoLogoWhatsapp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  // auth info
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?._id;
  const isLoggedIn = !!localStorage.getItem("token");

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
        setSelectedImage(`${API_URL}${res.data.images[0]}`);
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= RECENTLY VIEWED ================= */
  useEffect(() => {
    if (!product?._id) return;

    let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    viewed = viewed.filter((pid) => pid !== product._id);
    viewed.unshift(product._id);

    localStorage.setItem("recentlyViewed", JSON.stringify(viewed.slice(0, 6)));
  }, [product]);

  /* ================= WHATSAPP CHAT ================= */
  const handleWhatsApp = () => {
    // 🔒 block if not logged in
    if (!isLoggedIn) {
      alert("Please login to chat with the owner");
      navigate("/login");
      return;
    }

    if (!product?.owner?.phone) {
      alert("Owner contact not available");
      return;
    }

    const message = encodeURIComponent(
      `Hi, I'm interested in your product: ${product.title}`
    );

    const phone = product.owner.phone.replace(/\D/g, "");
    window.open(`https://wa.me/91${phone}?text=${message}`, "_blank");
  };

  /* ================= STATES ================= */
  if (loading) {
    return <p className="text-center mt-40">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-40">Product not found</p>;
  }

  // 🔒 OWNER CHECK
  const isOwner = loggedInUserId === product.owner?._id;

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-6 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          <div className="bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 rounded-3xl shadow-xl p-10 flex flex-col lg:flex-row gap-12">

            {/* ================= IMAGES ================= */}
            <div className="w-full lg:w-1/2">
              <div className="h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-4 mt-6">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={`${API_URL}${img}`}
                    onClick={() => setSelectedImage(`${API_URL}${img}`)}
                    className={`w-24 h-24 rounded-xl object-cover cursor-pointer border ${
                      selectedImage.includes(img)
                        ? "border-black"
                        : "border-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ================= DETAILS ================= */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">

              <div>
                {/* PRODUCT NAME */}
                <h1 className="text-4xl font-extrabold text-black">
                  {product.title}
                </h1>

                {/* LOCATION */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    Location
                  </h3>
                  <p className="flex items-center gap-2 text-gray-700">
                    <IoLocationOutline className="text-xl" />
                    {product.location}
                  </p>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* PRICING */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Pricing
                  </h3>

                  {product.listingType === "rent" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="bg-gray-300/50 p-4 rounded-xl font-semibold">
                        ₹{product.price.day} / day
                      </div>
                      <div className="bg-gray-300/50 p-4 rounded-xl font-semibold">
                        ₹{product.price.month} / month
                      </div>
                      <div className="bg-gray-300/50 p-4 rounded-xl font-semibold">
                        ₹{product.price.year} / year
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-300/50 p-4 rounded-xl font-semibold">
                      ₹{product.price.sell}
                    </div>
                  )}
                </div>
              </div>

              {/* ================= ACTION BUTTON ================= */}
              {!isOwner && (
                <div className="mt-10">
                  <button
                    onClick={handleWhatsApp}
                    className={`
                      w-full bg-green-600 hover:bg-green-700
                      text-white px-8 py-4 rounded-xl
                      text-lg font-bold shadow-xl
                      flex items-center justify-center gap-3
                    `}
                  >
                    <IoLogoWhatsapp className="text-2xl" />
                    Chat on WhatsApp
                  </button>
                </div>
              )}

              {isOwner && (
                <p className="mt-10 text-center text-gray-600 font-semibold">
                  This is your listing
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
