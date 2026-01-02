import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function ResetPassword() {
  const { token } = useParams(); // 👈 from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      return alert("All fields are required");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Reset failed");
      }

      alert("Password reset successful. Please login.");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg flex items-center justify-center pt-32 pb-10 px-4">
        <div className="w-full max-w-md bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 shadow-xl rounded-3xl p-10 flex flex-col gap-6">

          <h1 className="text-4xl font-extrabold text-black text-center">
            Reset Password
          </h1>

          <p className="text-center text-gray-700">
            Enter your new password below
          </p>

          {/* NEW PASSWORD */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md relative">
            <FiLock className="text-gray-600 text-xl mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
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

          {/* CONFIRM PASSWORD */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
            <FiLock className="text-gray-600 text-xl mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-black hover:text-[#C76A46] hover:bg-gray-800 text-white hover:text-[#C76A46] rounded-xl py-3 text-lg font-semibold shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {/* BACK TO LOGIN */}
          <p className="text-center text-gray-700 text-lg">
            Remember password?{" "}
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

export default ResetPassword;
