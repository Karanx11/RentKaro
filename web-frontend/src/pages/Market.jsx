import { useState } from "react";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Categories from "../components/Categories";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Canon DSLR Camera",
    pricePerDay: 800,
    location: "Delhi",
    image: "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg",
  },
  {
    id: 2,
    name: "Gaming Laptop",
    pricePerDay: 1200,
    location: "Mumbai",
    image: "https://images.pexels.com/photos/18104/pexels-photo.jpg",
  },
  {
    id: 3,
    name: "Camping Tent",
    pricePerDay: 300,
    location: "Pune",
    image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg",
  },
  {
    id: 4,
    name: "Electric Drill",
    pricePerDay: 150,
    location: "Jaipur",
    image: "https://images.pexels.com/photos/2157293/pexels-photo-2157293.jpeg",
  },
];

function Market() {
  const [productQuery, setProductQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const filteredProducts = DUMMY_PRODUCTS.filter((p) => {
    const matchProduct = p.name.toLowerCase().includes(productQuery.toLowerCase());
    const matchLocation = p.location.toLowerCase().includes(locationQuery.toLowerCase());
    return matchProduct && matchLocation;
  });

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 sm:px-10 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          {/* PAGE TITLE */}
          <h1 className="text-4xl font-extrabold text-black mb-6">Market</h1>
          <p className="text-gray-700 mb-8">
            Browse items listed by other users. Rent smart, save more.
          </p>

          {/* CATEGORIES */}
        <div className="mb-8">
          <Categories onSelect={(cat) => console.log("Selected:", cat)} />
        </div>


          {/* SEARCH BAR SECTION */}
          <div className="
            w-full bg-gray-400/40 backdrop-blur-xl
            border border-gray-500/30 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            p-4 sm:p-5 mb-10 flex flex-col md:flex-row gap-4
          ">
            {/* Product search */}
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

            {/* Location search */}
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

            {/* Fake Search Button */}
            <button className="
              bg-black hover:bg-gray-800 text-white hover:text-[#C76A46]
              px-6 py-3 rounded-xl text-lg font-semibold shadow-lg
              flex items-center justify-center
            ">
              <IoSearch className="text-2xl mr-2" />
              Search
            </button>
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* If no results */}
            {filteredProducts.length === 0 ? (
              <p className="text-gray-700 col-span-full">
                No products found. Try adjusting your search.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="
                    bg-gray-400/40 backdrop-blur-xl
                    border border-gray-500/30 rounded-2xl
                    shadow-lg overflow-hidden flex flex-col
                  "
                >
                  {/* Product Image */}
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold text-black">{product.name}</h2>

                    <p className="mt-1 text-gray-700">
                      ₹{product.pricePerDay} <span className="text-sm">/ day</span>
                    </p>

                    <p className="mt-1 text-gray-600 text-sm flex items-center gap-1">
                      📍 {product.location}
                    </p>

                    {/* Buttons */}
                    <div className="mt-4 flex gap-3">
                      
                      {/* View Details Button */}
                      <Link
                        to={`/product/${product.id}`}
                        className="
                          flex-1 bg-black hover:bg-gray-800
                          text-white hover:text-[#C76A46]
                          px-4 py-2 rounded-xl text-sm font-semibold shadow
                          text-center
                        "
                      >
                        View Details
                      </Link>

                      {/* Rent Now Button */}
                      <button
                        className="
                          flex-1 bg-white/80 hover:bg-white
                          text-black border border-gray-400
                          px-4 py-2 rounded-xl text-sm font-semibold shadow
                        "
                      >
                        Rent Now
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
