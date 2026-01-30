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
        const data = await getProfile();
        setUser(data);
      } catch {
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
      const res = await fetch(
        "http://localhost:5000/api/auth/delete-account",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ password: deletePassword }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setDeleteError(data.message || "Delete failed");
        return;
      }

      localStorage.clear();
      alert("Account deleted successfully");
      window.location.href = "/login";
    } catch {
      setDeleteError("Something went wrong");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-sm text-gray-700">Loading profile...</p>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-sm text-red-600">
            Failed to load profile. Please login again.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* PROFILE CARD */}
          <div className="bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-md">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="profile"
                className="w-28 h-28 rounded-full border object-cover"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {user.name}
                {user.isEmailVerified && (
                  <FiCheckCircle className="text-green-600 text-base" />
                )}
              </h1>

              <p className="text-sm text-gray-700">{user.email}</p>
              {user.phone && (
                <p className="text-sm text-gray-700">
                  Phone: {user.phone}
                </p>
              )}

              <div className="flex gap-3 mt-4 flex-wrap">
                <button
                  onClick={() => navigate("/editprofile")}
                  className="px-4 py-2 bg-black hover:bg-gray-800 hover:text-[#C76A46] text-white rounded-lg flex items-center gap-2 text-sm"
                >
                  <FiEdit3 /> Edit Profile
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center gap-2 text-sm"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <h2 className="text-xl font-bold mt-10 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="bg-white rounded-xl p-5 w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-bold mb-1 text-red-600">
              Confirm Deletion
            </h2>

            <p className="text-xs text-gray-600 mb-3">
              Enter your password to delete your account.
            </p>

            <input
              type="password"
              placeholder="Password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-2 text-sm"
            />

            {deleteError && (
              <p className="text-red-600 text-xs mb-2">
                {deleteError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletePassword("");
                  setDeleteError("");
                }}
                className="flex-1 py-2 border rounded text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-2 bg-red-600 text-white rounded text-sm"
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
      className="
        bg-gray-400/40 border border-gray-500/30
        rounded-xl p-4 shadow-md
        text-center cursor-pointer
        hover:bg-white/40 transition
      "
    >
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
}
