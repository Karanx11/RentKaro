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

      // ✅ FIX HERE
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

      <div className="w-full min-h-screen bg-gray-500/10 flex items-center justify-center pt-32 px-4">
        <div className="w-full max-w-md bg-gray-400/40 rounded-3xl p-10 flex flex-col gap-6">

          <h1 className="text-4xl font-extrabold text-center">Login</h1>

          {error && <p className="text-center text-red-600">{error}</p>}

          <div className="flex items-center bg-white rounded-xl px-4 py-3">
            <FiMail className="mr-3" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none"
            />
          </div>

          <div className="flex items-center bg-white rounded-xl px-4 py-3 relative">
            <FiLock className="mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 outline-none"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <Link to="/forgot" className="text-right text-sm">
            Forgot password?
          </Link>

          {showVerifyHint && (
            <button
              onClick={handleResendOtp}
              className="text-sm text-orange-600 underline"
            >
              Resend verification email
            </button>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-black text-white py-3 rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
