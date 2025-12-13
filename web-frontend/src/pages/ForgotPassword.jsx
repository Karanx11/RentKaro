import NavBar from "../components/NavBar";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <>
      <NavBar />

      <div
        className="
          w-full min-h-screen 
          bg-gray-500/10 backdrop-blur-lg
          flex items-center justify-center
          pt-32 pb-10 px-4
        "
      >
        {/* CARD */}
        <div
          className="
            w-full max-w-md
            bg-gray-400/40 backdrop-blur-xl
            border border-gray-500/30 
            shadow-[0_8px_32px_rgba(31,38,135,0.37)]
            rounded-3xl p-10
            flex flex-col gap-6
          "
        >
          <h1 className="text-4xl font-extrabold text-black text-center">
            Forgot Password?
          </h1>

          <p className="text-center text-gray-700">
            Enter your email and we’ll send you a reset link.
          </p>

          {/* EMAIL INPUT */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md">
            <FiMail className="text-gray-600 text-xl mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
              required
            />
          </div>

          {/* RESET BUTTON */}
          <button
            className="
              w-full bg-black hover:bg-gray-800
              text-white hover:text-[#C76A46]
              rounded-xl py-3 text-lg font-semibold shadow-lg
              transition
            "
          >
            Send Reset Link
          </button>

          {/* BACK TO LOGIN */}
          <p className="text-center text-gray-700 text-lg">
            Remember your password?{" "}
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

export default ForgotPassword;
