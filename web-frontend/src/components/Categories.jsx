import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { name: "All", image: "/categories/All.jpeg" },
  { name: "Books", image: "/categories/book.jpg" },
  { name: "Computers", image: "/categories/computers.jpg" },
  { name: "Camera", image: "/categories/camera.jpeg" },
  { name: "Gaming", image: "/categories/game.jpg" },
  { name: "Tools", image: "/categories/tools.jpg" },
  { name: "Camping", image: "/categories/camping.jpg" },
  { name: "Others", image: "/categories/others.webp" },
];

function Categories({ onSelect }) {
  const [active, setActive] = useState("All");
  const scrollRef = useRef(null);

  const handleSelect = (cat) => {
    setActive(cat);
    onSelect?.(cat.toLowerCase());
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex gap-3 overflow-x-auto scrollbar-hide py-1 overscroll-x-contain"
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat.name}
          onClick={() => handleSelect(cat.name)}
          className={`
            relative
            min-w-[96px] h-[56px]
            sm:min-w-[110px] sm:h-[60px]
            md:min-w-[128px] md:h-[64px]
            rounded-xl overflow-hidden
            border transition-all duration-200
            ${
              active === cat.name
                ? "border-black shadow-md"
                : "border-gray-500/30 hover:border-gray-400"
            }
          `}
        >
          <img
            src={cat.image}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div
            className={`absolute inset-0 flex items-center justify-center ${
              active === cat.name
                ? "bg-black/60"
                : "bg-black/40 hover:bg-black/50"
            }`}
          >
            <span className="text-sm font-medium text-white">
              {cat.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default Categories;