import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import api from "../api/api";

const API_URL = "http://localhost:5000";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const userStr = localStorage.getItem("user");
  const loggedInUser =
    userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
  const loggedInUserId = loggedInUser?._id;
  const isLoggedIn = !!localStorage.getItem("token");

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [voted, setVoted] = useState(false);

  const [showSafety, setShowSafety] = useState(false);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data;

        setProduct(data);
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setSelectedImage(`${API_URL}${data.images[0]}`);

        if (loggedInUser && data.voters) {
          setVoted(data.voters.some((v) => v.user === loggedInUser._id));
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

  if (loading) return <p className="text-center mt-32">Loading...</p>;
  if (!product) return <p className="text-center mt-32">Product not found</p>;

  const isOwner = loggedInUserId === product.owner?._id;

  /* ================= VOTE ================= */
  const handleVote = async (voteType) => {
    if (!isLoggedIn) return alert("Login required");
    if (isOwner) return;

    try {
      const res = await api.post(`/products/${id}/vote`, { vote: voteType });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setVoted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Voting failed");
    }
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

      <div className="w-full min-h-screen bg-gray-500/10 px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-400/40 backdrop-blur-xl border rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-8">

            {/* IMAGES */}
            <div className="w-full lg:w-1/2">
              <div className="h-[300px] rounded-xl overflow-hidden">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={`${API_URL}${img}`}
                    onClick={() => {
                      setCurrentIndex(i);
                      setSelectedImage(`${API_URL}${img}`);
                    }}
                    className={`w-16 h-16 rounded-lg cursor-pointer border ${
                      currentIndex === i
                        ? "border-black"
                        : "border-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold">{product.title}</h1>

                {/* TRUST */}
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <button
                    disabled={voted || isOwner}
                    onClick={() => handleVote("like")}
                    className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 font-medium disabled:opacity-50"
                  >
                    👍 {likes}
                  </button>

                  <button
                    disabled={voted || isOwner}
                    onClick={() => handleVote("dislike")}
                    className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 font-medium disabled:opacity-50"
                  >
                    👎 {dislikes}
                  </button>

                  <span className="text-gray-700">
                    {trustPercent}% trust
                  </span>
                </div>

                {/* LOCATION */}
                <div className="mt-4 text-sm">
                  <h3 className="font-semibold">Location</h3>
                  <p className="flex items-center gap-1">
                    <IoLocationOutline />
                    {product.location}
                  </p>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-4 text-sm">
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-gray-800">{product.description}</p>
                </div>

                {/* PRICING */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Pricing</h3>

                  {product.listingType === "rent" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="bg-gray-300/50 p-3 rounded-lg font-medium">
                        ₹{product.price.day} / day
                      </div>
                      <div className="bg-gray-300/50 p-3 rounded-lg font-medium">
                        ₹{product.price.month} / month
                      </div>
                      <div className="bg-gray-300/50 p-3 rounded-lg font-medium">
                        ₹{product.price.year} / year
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-300/50 p-3 rounded-lg font-medium text-sm">
                      ₹{product.price.sell}
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION */}
              <div className="mt-6">
                {isOwner ? (
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 text-center text-sm">
                    <p className="font-semibold text-blue-900">
                      👤 This is your product
                    </p>
                    <p className="text-blue-700">
                      Buyers will contact you on WhatsApp
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSafety(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold"
                  >
                    Chat on WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SAFETY MODAL */}
      {showSafety && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-xl p-5 w-[90%] max-w-sm text-sm">
            <h2 className="font-semibold mb-3">Safety First ⚠️</h2>

            <ul className="space-y-1 mb-4">
              <li>• Meet in public places</li>
              <li>• Avoid advance payments</li>
              <li>• Verify product condition</li>
            </ul>

            <div className="flex gap-3">
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
