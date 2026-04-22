import NavBar from "../components/NavBar";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showVerifyHint, setShowVerifyHint] = useState(false);

  // ✅ CLEAN REDIRECT
  const redirectUser = (data) => {
    if (data.needsProfileCompletion) {
      navigate("/complete-profile");
    } else {
      navigate("/profile");
    }
  };

  // 🔐 NORMAL LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://rentkaro-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      redirectUser(data);
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      const res = await fetch("https://rentkaro-backend.onrender.com/api/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await res.json();
      console.log("GOOGLE RESPONSE:", data);

      if (!res.ok) {
        setError(data.message || "Google login failed");
        return;
      }

      // ✅ IMPORTANT FIX
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      redirectUser(data);
    } catch (err) {
      console.error(err);
      setError("Google login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
        <div className="w-full max-w-sm bg-[#111] border border-gray-800 rounded-2xl p-6">

          <h1 className="text-2xl font-semibold text-white text-center mb-4">
            Login
          </h1>

          {error && (
            <p className="text-center text-sm text-red-500 mb-3">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mb-3"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Sign-In failed")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;