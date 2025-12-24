import { useNavigate } from "react-router-dom";
import {
  FiEdit3,
  FiPlusCircle,
  FiList,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getProfile } from "../utils/auth";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");


  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile(); // ✅ uses refresh logic
        setUser(data);
      } catch (err) {
        console.error("Profile fetch failed", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* ================= DELETE ACCOUNT ================= */
 const handleDeleteAccount = async () => {
  if (!deletePassword) {
    setDeleteError("Password is required");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/delete-account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ password: deletePassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setDeleteError(data.message || "Delete failed");
      return;
    }

    localStorage.clear();
    alert("Account deleted successfully");
    window.location.href = "/login";
  } catch (err) {
    setDeleteError("Something went wrong", err);
  }
};

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-700">Loading profile...</p>
        </div>
      </>
    );
  }

  /* ================= ERROR ================= */
  if (!user) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-red-600">
            Failed to load profile. Please login again.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-6 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          {/* PROFILE CARD */}
          <div className="bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-xl">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="profile"
                className="w-40 h-40 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-black text-white flex items-center justify-center text-5xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold flex items-center gap-2">
                {user.name}
                {user.isEmailVerified && (
                  <FiCheckCircle className="text-green-600 text-2xl" />
                )}
              </h1>

              <p className="text-gray-700">{user.email}</p>
              {user.phone && <p className="text-gray-700">Phone: {user.phone}</p>}

              <div className="flex gap-4 mt-6 flex-wrap">
                <button
                  onClick={() => navigate("/editprofile")}
                  className="px-6 py-3 bg-black text-white rounded-xl flex items-center gap-2"
                >
                  <FiEdit3 /> Edit Profile
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl flex items-center gap-2"
                >
                  <FiTrash2 /> Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <h2 className="text-3xl font-extrabold mt-14 mb-6">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ActionCard
              icon={<FiPlusCircle />}
              label="Add Listing"
              onClick={() => navigate("/sell")}
            />
            <ActionCard
              icon={<FiList />}
              label="My Listings"
              onClick={() => navigate("/my-listings")}
            />
          </div>

        </div>
      </div>

      {/* DELETE MODAL */}
     {showDeleteConfirm && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center">
      <h2 className="text-xl font-bold mb-2 text-red-600">
        Confirm Account Deletion
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        Enter your password to permanently delete your account.
      </p>

      <input
        type="password"
        placeholder="Enter password"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
        className="w-full px-4 py-3 border rounded-xl mb-3"
      />

      {deleteError && (
        <p className="text-red-600 text-sm mb-3">{deleteError}</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => {
            setShowDeleteConfirm(false);
            setDeletePassword("");
            setDeleteError("");
          }}
          className="flex-1 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleDeleteAccount}
          className="flex-1 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default Profile;

/* SMALL COMPONENT */
function ActionCard({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-400/40 border rounded-2xl p-8 shadow-xl text-center cursor-pointer hover:bg-gray-500/40"
    >
      <div className="text-4xl">{icon}</div>
      <p className="text-xl font-semibold mt-2">{label}</p>
    </div>
  );
}
