import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Categories from "../components/Categories";

const API_URL = "http://localhost:5000";

function Market() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [productQuery, setProductQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- FILTER ---------------- */
  const filteredProducts = products.filter((p) => {
    const matchProduct = p.title
    .toLowerCase()
    .includes(searchQuery.toLowerCase());


    const matchLocation = p.location
      ?.toLowerCase()
      .includes(locationQuery.toLowerCase());

    const matchCategory = selectedCategory
      ? p.category === selectedCategory
      : true;

    return matchProduct && matchLocation && matchCategory;
  });

  /* ---------------- CHAT HANDLER ---------------- */
  const startChat = async (product) => {
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
          ownerId: product.owner,
          productId: product._id,
        }),
      });

      const chat = await res.json();
      navigate(`/chat/${chat._id}`);
    } catch (err) {
      console.error("Chat start failed", err);
      alert("Unable to start chat");
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 sm:px-10 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          {/* PAGE TITLE */}
          <h1 className="text-4xl font-extrabold text-black mb-6">
            Market
          </h1>
          <p className="text-gray-700 mb-8">
            Browse items listed by other users. Rent smart, save more.
          </p>

          {/* CATEGORIES */}
          <div className="mb-8">
            <Categories onSelect={(cat) => setSelectedCategory(cat)} />
          </div>

          {/* SEARCH */}
          <div
            className="
              w-full bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30 rounded-2xl
              shadow-[0_8px_32px_rgba(31,38,135,0.37)]
              p-4 sm:p-5 mb-10 flex flex-col md:flex-row gap-4
            "
          >
            <div className="flex items-center flex-1 bg-white rounded-xl px-4 py-3 shadow-md">
              <IoSearch className="text-gray-600 text-2xl mr-3" />
              <input
                type="text"
                placeholder="Search product..."
                className="flex-1 bg-transparent outline-none text-lg text-gray-700"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center flex-1 bg-white rounded-xl px-4 py-3 shadow-md">
              <IoLocationOutline className="text-gray-600 text-2xl mr-3" />
              <input
                type="text"
                placeholder="Search location..."
                className="flex-1 bg-transparent outline-none text-lg text-gray-700"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>

            <button
              className="
                bg-black hover:bg-gray-800 text-white
                hover:text-[#C76A46]
                px-6 py-3 rounded-xl text-lg
                font-semibold shadow-lg flex items-center
                justify-center
              "
            >
              <IoSearch className="text-2xl mr-2" />
              Search
            </button>
          </div>

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 ? (
              <p className="text-gray-700 col-span-full">
                No products found.
              </p>
            ) : (
              filteredProducts.map((product) => (
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
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={`${API_URL}${product.images[0]}`}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold text-black">
                      {product.title}
                    </h2>

                    <p className="mt-1 text-gray-700">
                      {product.listingType === "rent" ? (
                        <>
                          ₹{product.price.day}
                          <span className="text-sm"> / day</span>
                        </>
                      ) : (
                        <>₹{product.price.sell}</>
                      )}
                    </p>

                    <p className="mt-1 text-gray-600 text-sm">
                      📍 {product.location || "India"}
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="mt-4 flex gap-3">
                      {/* VIEW ITEM */}
                      <Link
                        to={`/product/${product._id}`}
                        className="
                          flex-1 bg-black hover:bg-gray-800
                          text-white hover:text-[#C76A46]
                          px-4 py-2 rounded-xl
                          text-sm font-semibold
                          shadow text-center
                        "
                      >
                        View Item
                      </Link>

                      {/* CHAT OWNER */}
                      <button
                        onClick={() => startChat(product)}
                        className="
                          flex-1 bg-white/80 hover:bg-white
                          text-black border border-gray-400
                          px-4 py-2 rounded-xl
                          text-sm font-semibold shadow
                        "
                      >
                        Chat Owner
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Market;
