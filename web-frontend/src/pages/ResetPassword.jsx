import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword)
      return alert("All fields are required");

    if (password.length < 6)
      return alert("Password must be at least 6 characters");

    if (password !== confirmPassword)
      return alert("Passwords do not match");

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();
      if (!res.ok) return alert(data.message || "Reset failed");

      alert("Password reset successful. Please login.");
      navigate("/login");
    } catch {
      alert("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-sm bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 shadow-lg rounded-2xl p-6 flex flex-col gap-4">

          <h1 className="text-2xl font-bold text-black text-center">
            Reset Password
          </h1>

          <p className="text-center text-sm text-gray-700">
            Enter your new password below
          </p>

          {/* NEW PASSWORD */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2.5 border relative">
            <FiLock className="text-gray-600 text-base mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2.5 border">
            <FiLock className="text-gray-600 text-base mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-800"
            />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 hover:text-[#C76A46] text-white rounded-lg py-2.5 text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {/* BACK TO LOGIN */}
          <p className="text-center text-sm text-gray-700">
            Remember password?{" "}
            <Link
              to="/login"
              className="font-semibold hover:text-[#C76A46]"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default ResetPassword;
