import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function MyListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyListings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/products/my/listings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // 🔐 AUTH / ERROR SAFETY
        if (!res.ok) {
          console.error("My listings error:", data);
          setProducts([]); // prevent crash
          return;
        }

        // ✅ ENSURE ARRAY
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch listings", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-40">Loading...</p>;
  }

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-6 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-extrabold mb-6">
            My Listings
          </h1>

          {products.length === 0 ? (
            <p className="text-gray-700">
              You haven’t listed any products yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="
                    bg-gray-400/40 backdrop-blur-xl
                    border border-gray-500/30
                    rounded-2xl shadow-lg
                    overflow-hidden flex flex-col
                  "
                >
                  {/* IMAGE */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`${API_URL}${product.images?.[0]}`}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold">
                      {product.title}
                    </h2>

                    <p className="text-gray-700 mt-1">
                      {product.listingType === "rent" ? (
                        <>
                          ₹{product.price?.day}
                          <span className="text-sm"> / day</span>
                        </>
                      ) : (
                        <>₹{product.price?.sell}</>
                      )}
                    </p>

                    <p className="text-gray-600 text-sm mt-1">
                      📍 {product.location}
                    </p>

                    {/* ACTIONS */}
                    <div className="mt-4 flex gap-3">
                      <Link
                        to={`/product/${product._id}`}
                        className="
                          flex-1 bg-black text-white
                          px-4 py-2 rounded-xl
                          text-sm font-semibold text-center
                        "
                      >
                        View
                      </Link>

                      <Link
                        to={`/edit-listing/${product._id}`}
                        className="
                          flex-1 bg-white/70 border
                          px-4 py-2 rounded-xl
                          text-sm font-semibold text-center
                        "
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default MyListings;
