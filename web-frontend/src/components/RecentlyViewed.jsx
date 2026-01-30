import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function RecentlyViewed() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const ids =
        JSON.parse(localStorage.getItem("recentlyViewed")) || [];

      if (ids.length === 0) return;

      try {
        const res = await fetch(`${API_URL}/api/products/by-ids`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids }),
        });

        const data = await res.json();

        // preserve order
        const ordered = ids
          .map((id) => data.find((p) => p._id === id))
          .filter(Boolean);

        setItems(ordered);
      } catch (error) {
        console.error("Failed to fetch recently viewed", error);
      }
    };

    fetchRecentlyViewed();
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      className="
        w-full max-w-6xl
        bg-gray-400/40 backdrop-blur-xl
        border border-gray-500/30
        rounded-2xl p-5 sm:p-6
        shadow-xl
        mt-10
      "
    >
      <h2 className="text-lg md:text-xl font-bold text-black mb-4">
        Recently Viewed Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="
              bg-white/70 backdrop-blur-md
              border border-gray-300
              rounded-xl overflow-hidden
              shadow-sm hover:shadow-md
              transition cursor-pointer
            "
          >
            {/* IMAGE */}
            <div className="h-36 w-full overflow-hidden">
              <img
                src={`${API_URL}${item.images[0]}`}
                className="w-full h-full object-cover"
                alt={item.title}
              />
            </div>

            {/* CONTENT */}
            <div className="p-3 space-y-1">
              <h3 className="text-sm font-semibold text-black truncate">
                {item.title}
              </h3>

              <p className="text-sm text-gray-800">
                {item.listingType === "rent" ? (
                  <>
                    ₹{item.price.day}
                    <span className="text-xs text-gray-600"> / day</span>
                  </>
                ) : (
                  <>₹{item.price.sell}</>
                )}
              </p>

              <p className="text-xs text-gray-600 flex items-center gap-1">
                <IoLocationOutline size={14} />
                <span className="truncate">{item.location}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;
