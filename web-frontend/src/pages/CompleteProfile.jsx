import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CompleteProfile() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!phone) return alert("Phone required");

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
        alert(data.message || "Failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/profile"); // ✅ CLEAN NAVIGATION
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#111] p-6 rounded-xl w-80 border border-gray-800">
        <h2 className="text-white text-xl mb-4 text-center">
          Complete Profile
        </h2>

        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-3 bg-[#1a1a1a] text-white border border-gray-700 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default CompleteProfile;