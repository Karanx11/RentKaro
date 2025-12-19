import NavBar from "../components/NavBar";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function Signup() {
  const navigate = useNavigate();

  // ================= STATES =================
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePic(URL.createObjectURL(file));
  };

  // ================= SIGNUP =================
  const handleSignup = async () => {
    const { name, email, phone, password, confirmPassword } = form;

    if (!name || !email || !phone || !password || !confirmPassword) {
      return alert("All fields are required");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message || "Signup failed");

      alert("OTP sent to your email");
      setOtpStep(true);
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/verify-signup-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            otp,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Email verified! Please login.");
      navigate("/login");
    } catch {
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg flex items-center justify-center pt-32 pb-10 px-4">
        <div className="w-full max-w-2xl bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 shadow-[0_8px_32px_rgba(31,38,135,0.37)] rounded-3xl p-10 flex flex-col gap-6">

          <h1 className="text-4xl font-extrabold text-black text-center">
            Create Account
          </h1>

          {/* ========== PROFILE PICTURE ========== */}
          {!otpStep && (
            <div className="flex flex-col items-center gap-3">
              <label className="w-28 h-28 rounded-full bg-white shadow-md border flex items-center justify-center cursor-pointer overflow-hidden">
                {profilePic ? (
                  <img src={profilePic} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-600 text-sm">Upload Photo</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <p className="text-gray-700 text-sm">
                Profile picture (optional)
              </p>
            </div>
          )}

          {/* ========== SIGNUP FORM ========== */}
          {!otpStep && (
            <>
              <Input icon={<FiUser />} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
              <Input icon={<FiMail />} name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
              <Input icon={<FiPhone />} name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />

              <PasswordInput
                label="Password"
                name="password"
                value={form.password}
                show={showPassword}
                setShow={setShowPassword}
                onChange={handleChange}
              />

              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                show={showConfirmPassword}
                setShow={setShowConfirmPassword}
                onChange={handleChange}
              />

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white hover:text-[#C76A46] rounded-xl py-3 text-lg font-semibold shadow-lg transition disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Sign Up"}
              </button>
            </>
          )}

          {/* ========== OTP STEP ========== */}
          {otpStep && (
            <>
              <p className="text-center text-gray-700">
                Enter the OTP sent to <b>{form.email}</b>
              </p>

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                placeholder="Enter OTP"
                className="w-full px-5 py-3 rounded-xl bg-white text-lg text-center tracking-widest shadow-md outline-none"
              />

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white hover:text-[#C76A46] rounded-xl py-3 text-lg font-semibold shadow-lg transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {/* LOGIN LINK */}
          {!otpStep && (
            <p className="text-center text-gray-700 text-lg">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold hover:text-[#C76A46]">
                Login
              </Link>
            </p>
          )}

        </div>
      </div>
    </>
  );
}

export default Signup;

/* ========== SMALL COMPONENTS ========== */

function Input({ icon, ...props }) {
  return (
    <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
      <span className="text-gray-600 text-xl mr-3">{icon}</span>
      <input {...props} className="flex-1 bg-transparent outline-none text-lg text-gray-800" />
    </div>
  );
}

function PasswordInput({ label, show, setShow, ...props }) {
  return (
    <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md relative">
      <FiLock className="text-gray-600 text-xl mr-3" />
      <input
        type={show ? "text" : "password"}
        {...props}
        placeholder={label}
        className="flex-1 bg-transparent outline-none text-lg text-gray-800"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 text-gray-600"
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
}
