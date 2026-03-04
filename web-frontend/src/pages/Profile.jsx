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
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-600 text-sm">
            Failed to load profile. Please login again.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-500/10 px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* PROFILE CARD */}

          <div className="bg-white/40 backdrop-blur-xl border border-gray-400/40 rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-center gap-8">

            {/* AVATAR */}

            {user.avatar ? (
              <img
                src={user.avatar}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold shadow">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* USER INFO */}

            <div className="flex-1 text-center md:text-left">

              <h1 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
                {user.name}

                {user.isEmailVerified && (
                  <FiCheckCircle className="text-green-600" />
                )}
              </h1>

              <p className="text-gray-700 mt-1">{user.email}</p>

              {user.phone && (
                <p className="text-gray-700 text-sm">
                  Phone: {user.phone}
                </p>
              )}

              {/* ACTION BUTTONS */}

              <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">

                <button
                  onClick={() => navigate("/editprofile")}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 hover:text-[#C76A46] transition"
                >
                  <FiEdit3 />
                  Edit Profile
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500 transition"
                >
                  <FiTrash2 />
                  Delete Account
                </button>

              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}

          <h2 className="text-xl font-bold mt-12 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <ActionCard
              icon={<FiPlusCircle />}
              label="Add Listing"
              desc="Post a new product for rent or sale"
              onClick={() => navigate("/sell")}
            />

            <ActionCard
              icon={<FiList />}
              label="My Listings"
              desc="Manage your active listings"
              onClick={() => navigate("/my-listings")}
            />

          </div>
        </div>
      </div>

      {/* DELETE MODAL */}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">

          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">

            <h2 className="text-lg font-bold text-red-600">
              Delete Account
            </h2>

            <p className="text-sm text-gray-600 mt-1 mb-4">
              This action cannot be undone. Enter your password to continue.
            </p>

            <input
              type="password"
              placeholder="Password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />

            {deleteError && (
              <p className="text-red-600 text-xs mt-2">
                {deleteError}
              </p>
            )}

            <div className="flex gap-3 mt-5">

              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletePassword("");
                  setDeleteError("");
                }}
                className="flex-1 py-2 border rounded-lg text-sm hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500 transition"
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

/* ================= ACTION CARD ================= */

function ActionCard({ icon, label, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        bg-white/40
        border border-gray-400/40
        backdrop-blur-lg
        rounded-xl
        p-6
        shadow-md
        hover:shadow-lg
        hover:bg-white/60
        transition
      "
    >
      <div className="text-3xl mb-3 text-[#C76A46]">{icon}</div>

      <h3 className="font-semibold text-lg">{label}</h3>

      <p className="text-sm text-gray-600 mt-1">
        {desc}
      </p>
    </div>
  );
}