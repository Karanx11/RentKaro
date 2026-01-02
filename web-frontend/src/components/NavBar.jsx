import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaCog, FaPlus, FaList } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { ArrowLeft, LogOut } from "lucide-react";
import { useState } from "react";
import { logout as logoutUtil } from "../utils/auth";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMarketPage = location.pathname === "/market";

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  let user = null;
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) user = JSON.parse(userStr);
  } catch {
    localStorage.removeItem("user");
  }

  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    logoutUtil();
    navigate("/login");
  };

  /* ================= ACTIVE LINK STYLES ================= */

  const topNavClass = ({ isActive }) =>
    `px-5 py-2 rounded-xl text-lg font-medium transition-all duration-300
     ${
       isActive
         ? "bg-white text-black shadow-lg"
         : "text-white hover:text-[#C76A46]"
     }`;

  const bottomNavClass = ({ isActive }) =>
    `flex flex-col items-center justify-center transition-all duration-300
     ${
       isActive
         ? "bg-white text-black scale-110 shadow-xl"
         : "text-white hover:text-[#C76A46]"
     }
     rounded-2xl px-4 py-2`;

  return (
    <>
      {/* ================= DESKTOP TOP NAV ================= */}
      <nav className="hidden md:block fixed top-0 w-full z-50
        bg-gray-500/60 backdrop-blur-xl border-b border-white/20 shadow-xl">
        <div className="flex justify-between items-center px-12 py-6">

          {/* LOGO */}
          <Link
            to="/"
            className="text-4xl font-[cursive] tracking-wide text-[#C76A46]"
          >
            RentKaro
          </Link>

          {/* LINKS */}
          <ul className="flex gap-6">
            <li><NavLink to="/" className={topNavClass}>Home</NavLink></li>
            <li><NavLink to="/market" className={topNavClass}>Market</NavLink></li>
            <li><NavLink to="/sell" className={topNavClass}>Rent / Sell</NavLink></li>
            <li><NavLink to="/my-listings" className={topNavClass}>My Listings</NavLink></li>
            <li><NavLink to="/settings" className={topNavClass}>Settings</NavLink></li>
          </ul>

          {/* USER */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-full bg-black/50 border border-white/20
                  flex items-center justify-center text-white font-semibold text-lg">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-lg text-white hover:text-[#C76A46]">
                  {user?.name}
                </span>
              </button>

              <button
                onClick={() => setShowLogout(true)}
                className="text-[#C76A46] hover:text-red-500"
              >
                <LogOut size={24} />
              </button>
            </div>
          ) : (
            <Link className="text-xl text-[#C76A46]" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* ================= MOBILE TOP NAV ================= */}
      <nav className="md:hidden fixed top-0 w-full z-40
        bg-gray-500/60 backdrop-blur-xl border-b border-white/10">
        <div className="flex justify-between items-center px-4 py-4 text-white">

          {(isHomePage || isMarketPage) ? (
            <button
              onClick={() => navigate("/")}
              className="text-3xl font-[cursive] text-[#C76A46]"
            >
              RentKaro
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl"
            >
              <ArrowLeft size={20} />
              <span className="text-base">Back</span>
            </button>
          )}

          {isLoggedIn && (
            <button
              onClick={() => setShowLogout(true)}
              className="bg-white/10 p-2 rounded-xl"
            >
              <LogOut size={22} />
            </button>
          )}
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-2 h-16 left-3 right-3 z-50
        bg-gray-500/60 backdrop-blur-xl border border-white/20
        rounded-3xl shadow-2xl flex items-center">
        <div className="flex justify-around items-center h-full w-full text-2xl">

          <NavLink to="/market" className={bottomNavClass}>
            <MdStorefront size={28} />
          </NavLink>

          <NavLink to="/my-listings" className={bottomNavClass}>
            <FaList size={26} />
          </NavLink>

          <NavLink
            to="/sell"
            className="bg-[#C76A46] text-black p-5 rounded-full -mt-10
              shadow-[0_10px_30px_rgba(199,106,70,0.6)]"
          >
            <FaPlus size={26} />
          </NavLink>

          <NavLink to="/profile" className={bottomNavClass}>
            <FaUserCircle size={26} />
          </NavLink>

          <NavLink to="/settings" className={bottomNavClass}>
            <FaCog size={26} />
          </NavLink>

        </div>
      </nav>

      {/* ================= LOGOUT MODAL ================= */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm
          flex justify-center items-center z-[100]">
          <div className="bg-black/80 border border-white/20 p-6 rounded-2xl
            text-center text-white w-72">
            <p className="mb-4 text-lg">Logout?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
