import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= AUTH ================= */
  const userStr = localStorage.getItem("user");
  const loggedInUser =
    userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
  const loggedInUserId = loggedInUser?._id;
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  /* ================= TRUST ================= */
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [voted, setVoted] = useState(false);

  /* ================= SAFETY MODAL ================= */
  const [showSafety, setShowSafety] = useState(false);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        const data = res.data;

        setProduct(data);
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setSelectedImage(`${API_URL}${data.images[0]}`);

        if (loggedInUser && data.voters) {
          const alreadyVoted = data.voters.some(
            (v) => v.user === loggedInUser._id
          );
          setVoted(alreadyVoted);
        }
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= IMAGE SLIDER ================= */
  useEffect(() => {
    if (!product?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [product]);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(`${API_URL}${product.images[currentIndex]}`);
    }
  }, [currentIndex, product]);

  if (loading) return <p className="text-center mt-40">Loading...</p>;
  if (!product) return <p className="text-center mt-40">Product not found</p>;

  const isOwner = loggedInUserId === product.owner?._id;

  /* ================= VOTE ================= */
  const handleVote = async (voteType) => {
    if (!isLoggedIn) {
      alert("Login required to vote");
      return;
    }

    if (isOwner) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/products/${id}/vote`,
        { vote: voteType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setVoted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Voting failed");
    }
  };

  /* ================= WHATSAPP ================= */
  const handleWhatsAppClick = () => {
    if (!isLoggedIn) {
      alert("Please login to chat with the seller");
      return;
    }
    setShowSafety(true);
  };

  const whatsappNumber = product.owner?.phone || "";
  const whatsappMessage = encodeURIComponent(
    `Hi, I found your product "${product.title}" on RentKaro. Is it available?`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const totalVotes = likes + dislikes;
  const trustPercent =
    totalVotes === 0 ? 0 : Math.round((likes / totalVotes) * 100);

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-6 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-400/40 backdrop-blur-xl border rounded-3xl shadow-xl p-10 flex flex-col lg:flex-row gap-12">

            {/* ================= IMAGES ================= */}
            <div className="w-full lg:w-1/2">
              <div className="h-[400px] rounded-2xl overflow-hidden">
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
                    onClick={() => {
                      setCurrentIndex(i);
                      setSelectedImage(`${API_URL}${img}`);
                    }}
                    className={`w-24 h-24 rounded-xl cursor-pointer border ${
                      currentIndex === i
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
                <h1 className="text-4xl font-extrabold">
                  {product.title}
                </h1>

                {/* TRUST */}
                <div className="mt-4 flex items-center gap-6">
                  <button
                    disabled={voted || isOwner}
                    onClick={() => handleVote("like")}
                    className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold disabled:opacity-50"
                  >
                    👍 {likes}
                  </button>

                  <button
                    disabled={voted || isOwner}
                    onClick={() => handleVote("dislike")}
                    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold disabled:opacity-50"
                  >
                    👎 {dislikes}
                  </button>

                  <span className="text-sm font-semibold text-gray-700">
                    {trustPercent}% users trust this listing
                  </span>
                </div>

                {/* LOCATION */}
                <div className="mt-6">
                  <h3 className="font-bold">Location</h3>
                  <p className="flex items-center gap-2">
                    <IoLocationOutline />
                    {product.location}
                  </p>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-6">
                  <h3 className="font-bold">Description</h3>
                  <p>{product.description}</p>
                </div>

                {/* PRICING */}
                <div className="mt-8">
                  <h3 className="font-bold mb-3">Pricing</h3>

                  {product.listingType === "rent" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

              {/* ================= ACTION ================= */}
              <div className="mt-10">
                {isOwner ? (
                  <div className="bg-blue-100 border border-blue-300 rounded-xl p-5 text-center">
                    <p className="font-bold text-blue-900">
                      👤 This is your own product
                    </p>
                    <p className="text-sm text-blue-700">
                      Buyers will contact you on WhatsApp
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
                  >
                    Chat on WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SAFETY MODAL ================= */}
      {showSafety && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md">
            <h2 className="font-bold mb-3">Safety First ⚠️</h2>

            <ul className="text-sm space-y-2 mb-5">
              <li>• Meet in public places</li>
              <li>• Avoid advance payments</li>
              <li>• Verify product condition</li>
            </ul>

            <div className="flex gap-4">
              <button
                onClick={() => setShowSafety(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center font-semibold"
              >
                Continue
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
