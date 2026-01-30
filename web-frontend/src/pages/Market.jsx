import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import NavBar from "../components/NavBar";
import Categories from "../components/Categories";

const API_URL = "http://localhost:5000";

function Market() {
  const [products, setProducts] = useState([]);
  const [productQuery, setProductQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  /* ---------------- FILTER LOGIC ---------------- */
  const finalQuery = (searchQuery || productQuery).toLowerCase();

  const filteredProducts = products.filter((p) => {
    const title = p.title?.toLowerCase() || "";
    const location = p.location?.toLowerCase() || "";
    const category = p.category?.toLowerCase() || "";

    const matchProduct = title.includes(finalQuery);
    const matchLocation = location.includes(locationQuery.toLowerCase());
    const matchCategory =
      selectedCategory === "all" ? true : category === selectedCategory;

    return matchProduct && matchLocation && matchCategory;
  });

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* PAGE TITLE */}
          <h1 className="text-2xl font-bold text-black mb-1">
            Market
          </h1>
          <p className="text-sm text-gray-700 mb-6">
            Browse items listed by other users. Rent smart, save more.
          </p>

          {/* CATEGORIES */}
          <div className="mb-6">
            <Categories onSelect={(cat) => setSelectedCategory(cat)} />
          </div>

          {/* SEARCH */}
          <div
            className="
              w-full bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-xl shadow-md
              p-4 mb-8
              flex flex-col md:flex-row gap-3
            "
          >
            <div className="flex items-center flex-1 bg-white rounded-lg px-3 py-2.5 border">
              <IoSearch className="text-gray-600 text-base mr-2" />
              <input
                type="text"
                placeholder="Search product..."
                className="flex-1 bg-transparent outline-none text-sm"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center flex-1 bg-white rounded-lg px-3 py-2.5 border">
              <IoLocationOutline className="text-gray-600 text-base mr-2" />
              <input
                type="text"
                placeholder="Search location..."
                className="flex-1 bg-transparent outline-none text-sm"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>

            <button
              className="
                bg-black hover:bg-gray-800 hover:text-[#C76A46]
                text-white
                px-5 py-2.5 rounded-lg
                text-sm font-semibold
                flex items-center justify-center
              "
            >
              <IoSearch className="text-base mr-1" />
              Search
            </button>
          </div>

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <p className="text-sm text-gray-700 col-span-full">
                No products found.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="
                    bg-gray-400/40 backdrop-blur-xl
                    border border-gray-500/30
                    rounded-2xl shadow-md
                    overflow-hidden flex flex-col
                  "
                >
                  {/* IMAGE */}
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={`${API_URL}${product.images?.[0]}`}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-base font-semibold text-black">
                      {product.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-700">
                      {product.listingType === "rent" ? (
                        <>
                          ₹{product.price?.day}
                          <span className="text-xs"> / day</span>
                        </>
                      ) : (
                        <>₹{product.price?.sell}</>
                      )}
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      📍 {product.location || "India"}
                    </p>

                    <div className="mt-3">
                      <Link
                        to={`/product/${product._id}`}
                        className="
                          block w-full text-center
                          bg-black hover:bg-gray-800 hover:text-[#C76A46]
                          text-white
                          px-4 py-2 rounded-lg
                          text-xs font-semibold
                        "
                      >
                        View Item
                      </Link>
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
