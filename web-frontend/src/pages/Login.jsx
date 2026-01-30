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

      if (res.status === 403) {
        setError("Please verify your email before logging in");
        setShowVerifyHint(true);
        return;
      }

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="w-full min-h-screen bg-gray-500/10 flex items-center justify-center pt-24 px-4">
        <div className="w-full max-w-sm bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-6 flex flex-col gap-4">

          <h1 className="text-2xl font-bold text-center text-black">
            Login
          </h1>

          {error && (
            <p className="text-center text-sm text-red-600">
              {error}
            </p>
          )}

          {/* EMAIL */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2.5 border">
            <FiMail className="mr-2 text-gray-600 text-base" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2.5 border relative">
            <FiLock className="mr-2 text-gray-600 text-base" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <Link to="/forgot" className="text-right text-xs text-gray-700">
            Forgot password?
          </Link>

          {showVerifyHint && (
            <button
              onClick={handleResendOtp}
              className="text-xs text-orange-600 underline text-left"
            >
              Resend verification email
            </button>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-black hover:bg-gray-800 hover:text-[#C76A46] text-white py-2.5 rounded-lg text-sm font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-700">
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
