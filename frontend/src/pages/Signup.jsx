import NavBar from "../components/NavBar";
import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiUser,
  FiMapPin,
  FiCreditCard,
  FiPhone,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    emailOtp: "",
    phone: "",
    phoneOtp: "",
    password: "",
    confirmPassword: "",
    address: "",
    aadhaar: "",
    aadhaarOtp: "",
    pan: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [panImage, setPanImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(URL.createObjectURL(file));
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg flex items-center justify-center pt-32 pb-10 px-4">
        <div className="w-full max-w-2xl bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 shadow-[0_8px_32px_rgba(31,38,135,0.37)] rounded-3xl p-10 flex flex-col gap-6">

          <h1 className="text-4xl font-extrabold text-black text-center">
            Create Account
          </h1>

          {/* PROFILE PICTURE UPLOAD */}
          <div className="flex flex-col items-center gap-3 mt-2">
            <label className="w-28 h-28 rounded-full bg-white shadow-md border border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden">
              {profilePic ? (
                <img src={profilePic} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 text-sm text-center">
                  Upload Photo
                </span>
              )}

              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, setProfilePic)}
              />
            </label>

            <p className="text-gray-700 text-sm">Profile Picture (Optional)</p>
          </div>

          {/* FULL NAME */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
            <FiUser className="text-gray-600 text-xl mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />
          </div>

          {/* EMAIL + OTP */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
              <FiMail className="text-gray-600 text-xl mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-lg text-gray-800"
              />
              <button className="ml-3 text-sm px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800">
                Send OTP
              </button>
            </div>

            <input
              type="text"
              name="emailOtp"
              placeholder="Enter Email OTP"
              value={form.emailOtp}
              onChange={handleChange}
              className="w-full bg-white rounded-xl px-4 py-3 shadow-md outline-none text-lg text-gray-800"
            />
          </div>

          {/* PHONE + OTP */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
              <FiPhone className="text-gray-600 text-xl mr-3" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                maxLength="10"
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-lg text-gray-800"
              />
              <button className="ml-3 text-sm px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800">
                Send OTP
              </button>
            </div>

            <input
              type="text"
              name="phoneOtp"
              placeholder="Enter Phone OTP"
              value={form.phoneOtp}
              onChange={handleChange}
              className="w-full bg-white rounded-xl px-4 py-3 shadow-md outline-none text-lg text-gray-800"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md relative">
            <FiLock className="text-gray-600 text-xl mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-600 hover:text-black"
            >
              {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md relative">
            <FiLock className="text-gray-600 text-xl mr-3" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 text-gray-600 hover:text-black"
            >
              {showConfirmPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            </button>
          </div>

          {/* KYC SECTION */}
          <h2 className="text-2xl font-bold text-black mt-4">KYC Verification</h2>

          {/* ADDRESS */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
            <FiMapPin className="text-gray-600 text-xl mr-3" />
            <input
              type="text"
              name="address"
              placeholder="Full Residential Address"
              value={form.address}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />
          </div>

          {/* AADHAAR + OTP */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
              <FiCreditCard className="text-gray-600 text-xl mr-3" />
              <input
                type="text"
                name="aadhaar"
                placeholder="Aadhaar Number"
                value={form.aadhaar}
                maxLength="12"
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-lg text-gray-800"
              />
              <button className="ml-3 text-sm px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800">
                Send OTP
              </button>
            </div>

            <input
              type="text"
              name="aadhaarOtp"
              placeholder="Enter Aadhaar OTP"
              value={form.aadhaarOtp}
              onChange={handleChange}
              className="w-full bg-white rounded-xl px-4 py-3 shadow-md outline-none text-lg text-gray-800"
            />
          </div>

          {/* AADHAAR IMAGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="w-full h-36 bg-white rounded-xl shadow-md flex justify-center items-center cursor-pointer overflow-hidden">
              {aadhaarFront ? (
                <img src={aadhaarFront} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 text-sm">Upload Aadhaar Front</span>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, setAadhaarFront)}
              />
            </label>

            <label className="w-full h-36 bg-white rounded-xl shadow-md flex justify-center items-center cursor-pointer overflow-hidden">
              {aadhaarBack ? (
                <img src={aadhaarBack} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-600 text-sm">Upload Aadhaar Back</span>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, setAadhaarBack)}
              />
            </label>
          </div>

          {/* PAN NUMBER */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
            <FiCreditCard className="text-gray-600 text-xl mr-3" />
            <input
              type="text"
              name="pan"
              placeholder="PAN Number (Optional)"
              value={form.pan}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />
          </div>

          {/* PAN IMAGE */}
          <label className="w-full h-36 bg-white rounded-xl shadow-md flex justify-center items-center cursor-pointer overflow-hidden">
            {panImage ? (
              <img src={panImage} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-600 text-sm">Upload PAN Card</span>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setPanImage)}
            />
          </label>

          {/* SIGNUP BUTTON */}
          <button className="w-full bg-black hover:bg-gray-800 text-white hover:text-[#C76A46] rounded-xl py-3 text-lg font-semibold shadow-lg transition">
            Sign Up
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-700 text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-black hover:text-[#C76A46]"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Signup;
