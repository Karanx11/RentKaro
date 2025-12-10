import { useNavigate } from "react-router-dom";
import { FiEdit3, FiPlusCircle, FiInbox, FiList, FiCheckCircle } from "react-icons/fi";
import NavBar from "../components/NavBar";

function Profile() {

  const navigate = useNavigate(); 

  return (
    <>
      <NavBar />

      <div
        className="
          w-full min-h-screen
          bg-gray-500/10 backdrop-blur-lg
          px-6 sm:px-10 md:px-20 py-32
        "
      >

        {/* MAIN WRAPPER */}
        <div className="max-w-6xl mx-auto">

          
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              shadow-[0_8px_32px_rgba(31,38,135,0.37)]
              rounded-3xl p-10 md:p-14
              flex flex-col md:flex-row items-center gap-10
            "
          >

            {/* Profile Pic */}
            <img
              src='./src/assets/boy_pic.png'
              alt="profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
            />

            {/* User Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-black">
                Karan Sharma
              </h1>

              <p className="text-gray-800 mt-1 text-lg">Joined: Jan 2025</p>
              <p className="text-gray-700">karan@example.com</p>

              {/* EDIT BUTTON */}
              <button
                className="
                  mt-5 px-6 py-3 rounded-xl text-lg font-semibold
                  bg-black text-white shadow-lg
                  hover:bg-gray-800 hover:text-[#C76A46]
                  flex items-center gap-2 mx-auto md:mx-0
                "
                onClick={() => navigate("/EditProfile")} 
              >
                <FiEdit3 className="text-xl" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">

            {/* Listed Items */}
            <div className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-2xl p-8 text-center shadow-lg
            ">
              <h2 className="text-3xl font-bold text-black">12</h2>
              <p className="text-gray-700 mt-1">Listed Items</p>
            </div>

            {/* Rented Items */}
            <div className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-2xl p-8 text-center shadow-lg
            ">
              <h2 className="text-3xl font-bold text-black">5</h2>
              <p className="text-gray-700 mt-1">Items Rented</p>
            </div>

            {/* Earnings */}
            <div className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-2xl p-8 text-center shadow-lg
            ">
              <h2 className="text-3xl font-bold text-black">₹4,520</h2>
              <p className="text-gray-700 mt-1">Total Earnings</p>
            </div>

          </div>

          {/* ================= VERIFICATION ================= */}
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-2xl p-6 mt-10 shadow-lg
              flex items-center gap-4
            "
          >
            <FiCheckCircle className="text-green-600 text-3xl" />
            <p className="text-gray-800 text-lg">
              Your account is <span className="font-bold">Verified</span>.
            </p>
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <h2 className="text-3xl font-extrabold text-black mt-14 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            {/* Add New Listing */}
            <div
              onClick={() => navigate("/sell")}
              className="
                bg-gray-400/40 backdrop-blur-xl border border-gray-500/30
                rounded-2xl p-8 shadow-xl
                text-center flex flex-col items-center gap-3
                hover:bg-gray-500/40 transition cursor-pointer
              "
            >
              <FiPlusCircle className="text-4xl text-black" />
              <p className="text-xl font-semibold text-black">Add Listing</p>
            </div>

            {/* Manage Listings */}
            <div
              className="
                bg-gray-400/40 backdrop-blur-xl border border-gray-500/30
                rounded-2xl p-8 shadow-xl
                text-center flex flex-col items-center gap-3
                hover:bg-gray-500/40 transition cursor-pointer
              "
            >
              <FiList className="text-4xl text-black" />
              <p className="text-xl font-semibold text-black">Manage Listings</p>
            </div>

            {/* Messages */}
            <div
              onClick={() => navigate("/chat")}
              className="
                bg-gray-400/40 backdrop-blur-xl border border-gray-500/30
                rounded-2xl p-8 shadow-xl
                text-center flex flex-col items-center gap-3
                hover:bg-gray-500/40 transition cursor-pointer
              "
            >
              <FiInbox className="text-4xl text-black" />
              <p className="text-xl font-semibold text-black">Messages</p>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;
