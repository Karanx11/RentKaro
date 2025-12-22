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
        w-full max-w-[1500px]
        bg-gray-400/40 backdrop-blur-xl
        border border-gray-500/30
        rounded-3xl p-8 sm:p-10
        shadow-[0_8px_32px_rgba(31,38,135,0.37)]
        mt-14
      "
    >
      <h2 className="text-3xl font-extrabold text-black mb-6">
        Recently Viewed Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="
              bg-white/70 backdrop-blur-md border border-gray-300
              rounded-2xl shadow-xl overflow-hidden
              hover:shadow-2xl transition cursor-pointer
            "
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={`${API_URL}${item.images[0]}`}
                className="w-full h-full object-cover"
                alt={item.title}
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-black">
                {item.title}
              </h3>

              <p className="text-gray-700 mt-1">
                {item.listingType === "rent" ? (
                  <>
                    ₹{item.price.day}
                    <span className="text-sm"> / day</span>
                  </>
                ) : (
                  <>₹{item.price.sell}</>
                )}
              </p>

              <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                <IoLocationOutline /> {item.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;
