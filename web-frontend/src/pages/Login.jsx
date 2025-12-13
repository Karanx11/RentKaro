import NavBar from "../components/NavBar";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        {/* LOGIN CARD */}
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
            Login
          </h1>

          {/* EMAIL INPUT */}
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

          {/* PASSWORD INPUT */}
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-md relative">
            <FiLock className="text-gray-600 text-xl mr-3" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-lg text-gray-800"
            />

            {/* SHOW / HIDE PASSWORD */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-600 hover:text-black"
            >
              {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <p className="text-center text-gray-700">
            <Link to="/forgot" className="font-semibold hover:text-[#C76A46]">
              Forgot Password?
            </Link>
          </p>

          {/* LOGIN BUTTON */}
          <button
            className="
              w-full bg-black hover:bg-gray-800
              text-white hover:text-[#C76A46]
              rounded-xl py-3 text-lg font-semibold shadow-lg
              transition
            "
          >
            Login
          </button>

          {/* SIGNUP LINK */}
          <p className="text-center text-gray-700 text-lg">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-black hover:text-[#C76A46]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
