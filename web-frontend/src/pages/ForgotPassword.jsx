import NavBar from "../components/NavBar";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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

      if (!res.ok) {
        return alert(data.message);
      }

      alert("Reset link sent. Check console for now.");
    } catch {
      alert("Server error");
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
            Forgot Password?
          </h1>

          <p className="text-center text-gray-700">
            Enter your email to reset password
          </p>

          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
            <FiMail className="text-gray-600 text-xl mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-3 text-lg font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center text-gray-700 text-lg">
            Remember password?{" "}
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
