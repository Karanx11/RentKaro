import { IoLocationOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import NavBar from "./NavBar";
import { useState } from "react";

function ProductDetails() {
  // Dummy product data (replace with DB later)
  const product = {
    name: "Canon EOS DSLR Camera",
    description:
      "A high-quality DSLR camera perfect for photography, videography, and professional shoots.",
    priceDay: 800,
    priceMonth: 15000,
    priceYear: 160000,
    location: "Delhi",
    owner: {
      name: "Rohit Verma",
      image: "https://i.imgur.com/6VBx3io.png",
    },
    images: [
      "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg",
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg",
      "https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg",
    ]
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          {/* MAIN CARD */}
          <div className="
            bg-gray-400/40 backdrop-blur-xl
            border border-gray-500/30 
            rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            p-10
            flex flex-col lg:flex-row gap-12
          ">

            {/* LEFT SIDE — IMAGE GALLERY */}
            <div className="w-full lg:w-1/2">

              {/* Main Image */}
              <div className="w-full h-[350px] sm:h-[420px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={selectedImage}
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4 mt-6">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    className={`
                      w-24 h-24 rounded-xl object-cover cursor-pointer border
                      transition shadow-md hover:scale-105
                      ${selectedImage === img ? "border-black" : "border-gray-400"}
                    `}
                  />
                ))}
              </div>

            </div>

            {/* RIGHT SIDE — PRODUCT DETAILS */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">

              {/* Title */}
              <h1 className="text-4xl font-extrabold text-black">
                {product.name}
              </h1>

              {/* Location */}
              <p className="flex items-center gap-2 mt-2 text-gray-700 text-lg">
                <IoLocationOutline className="text-2xl text-black" />
                {product.location}
              </p>

              {/* Description */}
              <p className="mt-4 text-gray-800 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* PRICING */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-black mb-3">Pricing</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-gray-300/50 rounded-xl p-4 shadow">
                    <p className="text-lg font-semibold text-black">₹{product.priceDay}</p>
                    <p className="text-gray-700 text-sm">Per Day</p>
                  </div>
                  <div className="bg-gray-300/50 rounded-xl p-4 shadow">
                    <p className="text-lg font-semibold text-black">₹{product.priceMonth}</p>
                    <p className="text-gray-700 text-sm">Per Month</p>
                  </div>
                  <div className="bg-gray-300/50 rounded-xl p-4 shadow">
                    <p className="text-lg font-semibold text-black">₹{product.priceYear}</p>
                    <p className="text-gray-700 text-sm">Per Year</p>
                  </div>
                </div>
              </div>

              {/* OWNER INFO */}
              <div className="flex items-center gap-4 mt-8 bg-white/40 backdrop-blur-xl p-4 rounded-xl shadow">
                <img
                  src={product.owner.image}
                  className="w-16 h-16 rounded-full border border-white shadow-lg"
                />
                <div>
                  <p className="text-lg font-bold text-black">{product.owner.name}</p>
                  <p className="text-gray-700 text-sm">Owner</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-6 mt-10">

                <button className="
                  flex-1 bg-black hover:bg-gray-800
                  text-white hover:text-[#C76A46]
                  px-8 py-4 rounded-xl 
                  text-lg font-bold shadow-xl
                  flex items-center justify-center gap-3
                ">
                  <FiShoppingBag className="text-2xl" />
                  Rent Now
                </button>

                <button className="
                  flex-1 bg-white/70 hover:bg-white
                  text-black border border-gray-400
                  px-8 py-4 rounded-xl 
                  text-lg font-bold shadow-xl
                  flex items-center justify-center gap-3
                ">
                  <FiMessageSquare className="text-2xl" />
                  Chat Owner
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;
