import { useState, useRef, useEffect } from "react";

import allImg from "../assets/All.jpeg";
import booksImg from "../assets/book.jpg";
import computersImg from "../assets/computers.jpg";
import cameraImg from "../assets/camera.jpeg";
import gamingImg from "../assets/game.jpg";
import toolsImg from "../assets/tools.jpg";
import campingImg from "../assets/camping.jpg";
import othersImg from "../assets/others.webp";

const CATEGORIES = [
  { name: "All", image: allImg },
  { name: "Books", image: booksImg },
  { name: "Computers", image: computersImg },
  { name: "Camera", image: cameraImg },
  { name: "Gaming", image: gamingImg },
  { name: "Tools", image: toolsImg },
  { name: "Camping", image: campingImg },
  { name: "Others", image: othersImg },
];

function Categories({ onSelect }) {
  const [active, setActive] = useState("All");
  const scrollRef = useRef(null);

  const handleSelect = (cat) => {
    setActive(cat);
    onSelect?.(cat.toLowerCase());
  };

  // ⛔ Horizontal scroll only (no page scroll hijack)
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
      className="
        flex gap-3 overflow-x-auto scrollbar-hide
        py-1 overscroll-x-contain
      "
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
          {/* IMAGE */}
          <img
            src={cat.image}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div
            className={`
              absolute inset-0 flex items-center justify-center
              ${
                active === cat.name
                  ? "bg-black/60"
                  : "bg-black/40 hover:bg-black/50"
              }
            `}
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
