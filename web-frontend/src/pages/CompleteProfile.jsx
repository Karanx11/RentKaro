import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CompleteProfile() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!phone.trim()) {
      alert("Phone number is required");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

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
        alert(data.message || "Failed to update profile");
        setLoading(false);
        return;
      }

      // update local user
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirect
      window.location.href = "/#/profile"; // 🔥 reliable redirect
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      
      <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-2xl shadow-xl p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-2 text-center">
          Complete Your Profile
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Add your phone number to continue
        </p>

        {/* Input */}
        <div className="mb-5">
          <label className="text-gray-400 text-sm mb-1 block">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-medium transition ${
            loading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>

      </div>
    </div>
  );
}

export default CompleteProfile;