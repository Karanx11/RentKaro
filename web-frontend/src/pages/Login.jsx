import NavBar from "../components/NavBar";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showVerifyHint, setShowVerifyHint] = useState(false);

  // ================= LOGIN =================
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setShowVerifyHint(false);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // ❌ NOT VERIFIED
      if (res.status === 403) {
        setError("Please verify your email before logging in");
        setShowVerifyHint(true);
        return;
      }

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ SUCCESS
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESEND OTP =================
  const handleResendOtp = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      alert("OTP resent to your email");
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg flex items-center justify-center pt-32 pb-10 px-4">
        <div className="w-full max-w-md bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 shadow-[0_8px_32px_rgba(31,38,135,0.37)] rounded-3xl p-10 flex flex-col gap-6">

          <h1 className="text-4xl font-extrabold text-black text-center">
            Login
          </h1>

          {/* ERROR */}
          {error && (
            <p className="text-center text-red-600 font-semibold">
              {error}
            </p>
          )}

          {/* EMAIL */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
            <FiMail className="text-gray-600 text-xl mr-3" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md relative">
            <FiLock className="text-gray-600 text-xl mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <Link
              to="/forgot"
              className="text-sm font-medium text-gray-700 hover:text-[#C76A46]"
            >
              Forgot password?
            </Link>
          </div>

          {/* RESEND OTP */}
          {showVerifyHint && (
            <button
              onClick={handleResendOtp}
              className="text-sm text-[#C76A46] font-semibold underline"
            >
              Resend verification email
            </button>
          )}

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white hover:text-[#C76A46] rounded-xl py-3 text-lg font-semibold shadow-lg transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* SIGNUP */}
          <p className="text-center text-gray-700 text-lg">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold hover:text-[#C76A46]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
