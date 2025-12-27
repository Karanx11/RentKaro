import { useState } from "react";
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

  const handleSelect = (cat) => {
    setActive(cat);
    onSelect?.(cat.toLowerCase()); // 👈 normalize
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.name}
          onClick={() => handleSelect(cat.name)}
          className={`
            min-w-[120px] h-[72px]
            sm:min-w-[140px] sm:h-[85px]
            md:min-w-[160px] md:h-[100px]
            rounded-2xl overflow-hidden
            backdrop-blur-xl border
            transition-all duration-200
            ${
              active === cat.name
                ? "bg-black text-white border-black shadow-lg"
                : "bg-gray-400/40 border-gray-500/30 hover:bg-white/40"
            }
          `}
        >
          <div className="relative w-full h-full">
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                active === cat.name ? "bg-black/60" : "bg-black/40"
              }`}
            >
              <span className="text-sm sm:text-base md:text-lg font-semibold text-white">
                {cat.name}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default Categories;
