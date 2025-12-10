import { useState } from "react";
import NavBar from "./NavBar";

function EditProfile() {

  const [image, setImage] = useState(null);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  return (
    <>
      <NavBar />

      <div
        className="
          w-full min-h-screen
          bg-gray-500/10 backdrop-blur-lg
          px-6 sm:px-10 md:px-20 py-32
        "
      >
        
        <div
          className="
            max-w-3xl mx-auto
            bg-gray-400/40 backdrop-blur-xl 
            border border-gray-500/30
            shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            rounded-3xl p-10 md:p-14
          "
        >

          {/* TITLE */}
          <h1 className="text-4xl font-extrabold text-black text-center">
            Edit Profile
          </h1>
          <p className="text-gray-700 text-center mt-2">
            Update your personal information
          </p>

          {/* FORM */}
          <div className="mt-10 space-y-8">

            {/* PROFILE IMAGE */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={image || "./src/assets/boy_pic.png"}
                  className="w-full h-full object-cover"
                />
              </div>

              <label
                className="
                  px-6 py-2 rounded-xl cursor-pointer 
                  bg-black hover:bg-gray-800 text-white hover:text-[#C76A46]
                  text-lg shadow-lg transition
                "
              >
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* NAME */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="
                  w-full px-5 py-3 rounded-xl
                  bg-white/80 border border-gray-300 
                  text-gray-900 text-lg outline-none shadow-md
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="
                  w-full px-5 py-3 rounded-xl
                  bg-white/80 border border-gray-300 
                  text-gray-900 text-lg outline-none shadow-md
                "
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Phone Number
              </label>
              <input
                type="number"
                placeholder="+91 XXXXX XXXXX"
                className="
                  w-full px-5 py-3 rounded-xl
                  bg-white/80 border border-gray-300 
                  text-gray-900 text-lg outline-none shadow-md
                "
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Address
              </label>
              <textarea
                rows="3"
                placeholder="Enter your full address"
                className="
                  w-full px-5 py-3 rounded-xl
                  bg-white/80 border border-gray-300
                  text-gray-900 text-lg outline-none shadow-md
                  resize-none
                "
              ></textarea>
            </div>

            {/* SAVE BUTTON */}
            <div className="text-center pt-4">
              <button
                className="
                  px-14 py-4 bg-black hover:bg-gray-800 
                  text-white hover:text-[#C76A46]
                  rounded-2xl text-xl font-bold shadow-xl 
                  transition
                "
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>

      </div>

    </>
  );
}

export default EditProfile;
