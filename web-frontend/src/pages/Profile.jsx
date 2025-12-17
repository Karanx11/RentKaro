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

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getProfile();
      setUser(data);
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-700">Loading profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 sm:px-10 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">

          {/* PROFILE CARD */}
          <div className="bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 shadow-[0_8px_32px_rgba(31,38,135,0.37)] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">

            {/* PROFILE IMAGE */}
            <img
              src={user.avatar || "/src/assets/boy_pic.png"}
              alt="profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
            />

            {/* USER INFO */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-black">
                {user?.name}
             </h1>

            <p className="text-gray-700">{user?.email}</p>

            <p className="text-gray-700">
                Phone: {user.phone}
            </p>

              <button
                onClick={() => navigate("/EditProfile")}
                className="mt-5 px-6 py-3 rounded-xl text-lg font-semibold bg-black text-white shadow-lg hover:bg-gray-800 hover:text-[#C76A46] flex items-center gap-2 mx-auto md:mx-0"
              >
                <FiEdit3 className="text-xl" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">

            <StatCard title="Listed Items" value="12" />
            <StatCard title="Items Rented" value="5" />
            <StatCard title="Reviews" value="4.6 ★" />

          </div>

          {/* VERIFIED */}
          <div className="bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-6 mt-10 shadow-lg flex items-center gap-4">
            <FiCheckCircle className="text-green-600 text-3xl" />
            <p className="text-gray-800 text-lg">
              Your account is <span className="font-bold">Verified</span>
            </p>
          </div>

          {/* QUICK ACTIONS */}
          <h2 className="text-3xl font-extrabold text-black mt-14 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            <ActionCard
              icon={<FiPlusCircle />}
              label="Add Listing"
              onClick={() => navigate("/sell")}
            />

            <ActionCard
              icon={<FiList />}
              label="Manage Listings"
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
    <div className="bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-8 text-center shadow-lg">
      <h2 className="text-3xl font-bold text-black">{value}</h2>
      <p className="text-gray-700 mt-1">{title}</p>
    </div>
  );
}

function ActionCard({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-8 shadow-xl text-center flex flex-col items-center gap-3 hover:bg-gray-500/40 transition cursor-pointer"
    >
      <div className="text-4xl text-black">{icon}</div>
      <p className="text-xl font-semibold text-black">{label}</p>
    </div>
  );
}
