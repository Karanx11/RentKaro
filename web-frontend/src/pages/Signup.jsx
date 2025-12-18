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

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SIGNUP API CALL
  const handleSignup = async () => {
    const { name, email, phone, password, confirmPassword } = form;

    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      // ✅ auto login
      localStorage.setItem("token", data.token);

      alert("Account created successfully!");
      navigate("/"); // or dashboard

    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
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

          {/* FULL NAME */}
          <Input
            icon={<FiUser />}
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <Input
            icon={<FiMail />}
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          {/* PHONE */}
          <Input
            icon={<FiPhone />}
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <PasswordInput
            label="Password"
            name="password"
            value={form.password}
            show={showPassword}
            setShow={setShowPassword}
            onChange={handleChange}
          />

          {/* CONFIRM PASSWORD */}
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            show={showConfirmPassword}
            setShow={setShowConfirmPassword}
            onChange={handleChange}
          />

          {/* SUBMIT */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white hover:text-[#C76A46] rounded-xl py-3 text-lg font-semibold shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-700 text-lg">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:text-[#C76A46]">
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Signup;

/* ---------- SMALL REUSABLE COMPONENTS ---------- */

function Input({ icon, ...props }) {
  return (
    <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
      <span className="text-gray-600 text-xl mr-3">{icon}</span>
      <input
        {...props}
        className="flex-1 bg-transparent outline-none text-lg text-gray-800"
      />
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
