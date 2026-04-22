
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CompleteProfile() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!phone) return alert("Phone required");

    const token = localStorage.getItem("token");

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

    // update local user
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/profile");
  };

  return (
  
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded-xl shadow w-80">
      <h2 className="text-lg font-bold mb-4">Complete Profile</h2>

      <input
        type="text"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded"
      >
        Save
      </button>
    </div>
  </div>
);
}

export default CompleteProfile;
