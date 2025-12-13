import { IoLocationOutline } from "react-icons/io5";

const RECENTLY_VIEWED = [
  {
    id: 1,
    name: "Canon DSLR Camera",
    price: 800,
    location: "Delhi",
    image: "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg",
  },
  {
    id: 2,
    name: "Gaming Laptop",
    price: 1200,
    location: "Mumbai",
    image: "https://images.pexels.com/photos/18104/pexels-photo.jpg",
  },
  {
    id: 3,
    name: "Camping Tent",
    price: 300,
    location: "Pune",
    image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg",
  },
];

function RecentlyViewed() {
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

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {RECENTLY_VIEWED.map((item) => (
          <div
            key={item.id}
            className="
              bg-white/70 backdrop-blur-md border border-gray-300
              rounded-2xl shadow-xl overflow-hidden
              hover:shadow-2xl transition cursor-pointer
            "
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={item.image}
                className="w-full h-full object-cover"
                alt={item.name}
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-black">
                {item.name}
              </h3>

              <p className="text-gray-700 mt-1">
                ₹{item.price} <span className="text-sm">/ day</span>
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
