import NavBar from "../components/NavBar";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= SEND OTP ================= */
  const handleSendOtp = async () => {
    if (!email) return alert("Enter email");

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("OTP sent to your email");
      setStep(2);
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET PASSWORD ================= */
  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword)
      return alert("All fields required");

    if (newPassword !== confirmPassword)
      return alert("Passwords do not match");

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Password reset successful");
      navigate("/login");
    } catch {
      alert("Server error");
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
            Forgot Password
          </h1>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <>
              <p className="text-center text-sm text-gray-700">
                Enter your email to receive OTP
              </p>

              <div className="flex items-center bg-white rounded-lg px-3 py-2.5 border">
                <FiMail className="text-gray-600 text-base mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-800"
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-2.5 text-sm font-semibold"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <>
              <p className="text-center text-sm text-gray-700">
                Enter OTP sent to <b>{email}</b>
              </p>

              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                placeholder="OTP"
                className="w-full px-3 py-2.5 rounded-lg bg-white text-sm text-center tracking-widest border outline-none"
              />

              <div className="flex items-center bg-white rounded-lg px-3 py-2.5 border relative">
                <FiLock className="text-gray-600 text-base mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

              <div className="flex items-center bg-white rounded-lg px-3 py-2.5 border">
                <FiLock className="text-gray-600 text-base mr-2" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-800"
                />
              </div>

              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-2.5 text-sm font-semibold"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

          <p className="text-center text-sm text-gray-700">
            Back to{" "}
            <Link to="/login" className="font-semibold hover:text-[#C76A46]">
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
