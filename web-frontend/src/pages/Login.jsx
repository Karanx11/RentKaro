import NavBar from "../components/NavBar";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // REDIRECT
  const redirectUser = (data) => {
    if (data.needsProfileCompletion) {
      navigate("/complete-profile");
    } else {
      navigate("/profile");
    }
  };

  //  NORMAL LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      return setError("Email and password are required");
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://rentkaro-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Login failed");
      }

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

  //  GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://rentkaro-backend.onrender.com/api/auth/google-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: credentialResponse.credential,
          }),
        }
      );

      const data = await res.json();
      console.log("GOOGLE RESPONSE:", data);

      if (!res.ok) {
        return setError(data.message || "Google login failed");
      }

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

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg flex items-center justify-center pt-24 px-4">
        <div className="w-full max-w-md bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 shadow-xl rounded-2xl p-6 flex flex-col gap-5">

          <h1 className="text-2xl md:text-3xl font-bold text-black text-center">
            Welcome Back
          </h1>

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {/* EMAIL */}
          <Input
            icon={<FiMail />}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <PasswordInput
            label="Password"
            value={password}
            show={showPassword}
            setShow={setShowPassword}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link
            to="/forgot"
            className="text-right text-xs text-gray-700"
          >
            Forgot password?
          </Link>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full bg-black hover:bg-gray-800
              text-white hover:text-[#C76A46]
              rounded-xl py-2.5
              text-sm font-semibold
              shadow-md transition
              disabled:opacity-50
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* GOOGLE */}
          <div className="flex justify-center mt-2">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Sign-In failed")}
            />
          </div>

          {/* SIGNUP LINK */}
          <p className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold hover:text-[#C76A46]"
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

/* ========= REUSABLE COMPONENTS ========= */

function Input({ icon, ...props }) {
  return (
    <div className="flex items-center bg-white rounded-lg px-3 py-2.5 shadow-sm">
      <span className="text-gray-600 text-base mr-2">{icon}</span>
      <input
        {...props}
        className="flex-1 bg-transparent outline-none text-sm text-gray-800"
      />
    </div>
  );
}

function PasswordInput({ label, show, setShow, ...props }) {
  return (
    <div className="flex items-center bg-white rounded-lg px-3 py-2.5 shadow-sm relative">
      <FiLock className="text-gray-600 text-base mr-2" />
      <input
        type={show ? "text" : "password"}
        {...props}
        placeholder={label}
        className="flex-1 bg-transparent outline-none text-sm text-gray-800"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 text-gray-600"
      >
        {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
      </button>
    </div>
  );
}