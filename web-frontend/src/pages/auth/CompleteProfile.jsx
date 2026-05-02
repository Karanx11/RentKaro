import NavBar from "../../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPhone } from "react-icons/fi";

function CompleteProfile() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!phone) {
      return setError("Phone number is required");
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://rentkaro-backend.onrender.com/api/auth/complete-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ phone }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Failed to update profile");
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
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
            Complete Profile
          </h1>

          <p className="text-center text-sm text-gray-700">
            Add your phone number to continue
          </p>

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {/* PHONE INPUT */}
          <Input
            icon={<FiPhone />}
            placeholder="Enter Your WhatsApp Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
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
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </>
  );
}

export default CompleteProfile;

/* ========= REUSABLE INPUT ========= */

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