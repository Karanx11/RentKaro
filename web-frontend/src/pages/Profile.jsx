import { useNavigate } from "react-router-dom";
import {
  FiEdit3,
  FiPlusCircle,
  FiInbox,
  FiList,
  FiCheckCircle,
} from "react-icons/fi";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { getProfile } from "../utils/auth";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getProfile();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  /* ---------- LOADING ---------- */
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

  /* ---------- ERROR ---------- */
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

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 sm:px-10 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          {/* ================= PROFILE CARD ================= */}
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              shadow-[0_8px_32px_rgba(31,38,135,0.37)]
              rounded-3xl p-10 md:p-14
              flex flex-col md:flex-row items-center gap-10
            "
          >
            {/* PROFILE IMAGE */}
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="profile"
                className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
              />
            ) : (
              <div
                className="
                  w-40 h-40 rounded-full
                  bg-black text-white
                  flex items-center justify-center
                  text-5xl font-bold shadow-xl
                "
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* USER INFO */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-black flex items-center gap-2 justify-center md:justify-start">
                {user.name}

                {user.isEmailVerified && (
                  <FiCheckCircle
                    className="text-green-600 text-2xl"
                    title="Email Verified"
                  />
                )}
              </h1>

              <p className="text-gray-700 mt-1">{user.email}</p>

              {user.phone && (
                <p className="text-gray-700">Phone: {user.phone}</p>
              )}

              <button
                onClick={() => navigate("/EditProfile")}
                className="
                  mt-5 px-6 py-3 rounded-xl
                  text-lg font-semibold
                  bg-black text-white shadow-lg
                  hover:bg-gray-800 hover:text-[#C76A46]
                  flex items-center gap-2 mx-auto md:mx-0
                "
              >
                <FiEdit3 className="text-xl" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <StatCard title="Listed Items" value="12" />
            <StatCard title="Items Rented" value="5" />
            <StatCard title="Reviews" value="4.6 ★" />
          </div>

          {/* ================= VERIFICATION STATUS ================= */}
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-2xl p-6 mt-10 shadow-lg
              flex items-center gap-4
            "
          >
            {user.isEmailVerified ? (
              <>
                <FiCheckCircle className="text-green-600 text-3xl" />
                <p className="text-gray-800 text-lg">
                  Email is{" "}
                  <span className="font-bold text-green-700">
                    Verified
                  </span>
                </p>
              </>
            ) : (
              <>
                <FiCheckCircle className="text-yellow-500 text-3xl" />
                <div>
                  <p className="text-gray-800 text-lg font-semibold">
                    Email not verified
                  </p>
                  <button
                    onClick={() => navigate("/verify-email")}
                    className="text-sm mt-1 underline hover:text-[#C76A46]"
                  >
                    Verify now
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <h2 className="text-3xl font-extrabold text-black mt-14 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <ActionCard
              icon={<FiPlusCircle />}
              label="Add Listing"
              onClick={() =>
                user.isEmailVerified
                  ? navigate("/sell")
                  : alert("Verify email to add listing")
              }
            />
            <ActionCard
              icon={<FiList />}
              label="Manage Listings"
              onClick={() => navigate("/my-listings")}
            />
            <ActionCard
              icon={<FiInbox />}
              label="Messages"
              onClick={() => navigate("/chat")}
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;

/* ---------- SMALL COMPONENTS ---------- */

function StatCard({ title, value }) {
  return (
    <div
      className="
        bg-gray-400/40 backdrop-blur-xl
        border border-gray-500/30
        rounded-2xl p-8 text-center shadow-lg
      "
    >
      <h2 className="text-3xl font-bold text-black">{value}</h2>
      <p className="text-gray-700 mt-1">{title}</p>
    </div>
  );
}

function ActionCard({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        bg-gray-400/40 backdrop-blur-xl
        border border-gray-500/30
        rounded-2xl p-8 shadow-xl
        text-center flex flex-col items-center gap-3
        hover:bg-gray-500/40 transition cursor-pointer
      "
    >
      <div className="text-4xl text-black">{icon}</div>
      <p className="text-xl font-semibold text-black">{label}</p>
    </div>
  );
}
