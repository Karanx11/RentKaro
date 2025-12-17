import { useState } from "react";
import NavBar from "./NavBar";

function EditProfile() {

  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);


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
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-800">
              Email
            </label>

            <div className="flex gap-3">
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  flex-1 px-5 py-3 rounded-xl
                  bg-white/80 border border-gray-300
                  text-gray-900 text-lg outline-none shadow-md
                "
              />

              <button
                type="button"
                onClick={() => setEmailOtpSent(true)}
                disabled={!email}
                className="
                  px-5 py-3 rounded-xl font-semibold
                  bg-black text-white hover:bg-gray-800 hover:text-[#C76A46]
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition shadow-md
                "
              >
                Verify
              </button>
            </div>

            {emailOtpSent && (
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Enter Email OTP"
                value={emailOtp}
                onChange={(e) =>
                  setEmailOtp(e.target.value.replace(/\D/g, ""))
                }
                className="
                  w-full px-5 py-3 rounded-xl
                  bg-white/80 border border-gray-300
                  text-gray-900 text-lg outline-none shadow-md
                  tracking-widest text-center
                "
              />
            )}
          </div>


           {/* PHONE */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-800">
                Phone Number
              </label>

              <div className="flex gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  className="
                    flex-1 px-5 py-3 rounded-xl
                    bg-white/80 border border-gray-300
                    text-gray-900 text-lg outline-none shadow-md
                  "
                />

                <button
                  type="button"
                  onClick={() => setPhoneOtpSent(true)}
                  disabled={phone.length !== 10}
                  className="
                    px-5 py-3 rounded-xl font-semibold
                    bg-black text-white hover:bg-gray-800 hover:text-[#C76A46]
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition shadow-md
                  "
                >
                  Get OTP
                </button>
              </div>

              {phoneOtpSent && (
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter Phone OTP"
                  value={phoneOtp}
                  onChange={(e) =>
                    setPhoneOtp(e.target.value.replace(/\D/g, ""))
                  }
                  className="
                    w-full px-5 py-3 rounded-xl
                    bg-white/80 border border-gray-300
                    text-gray-900 text-lg outline-none shadow-md
                    tracking-widest text-center
                  "
                />
              )}
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
