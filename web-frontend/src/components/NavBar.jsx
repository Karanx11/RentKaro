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
    `px-4 py-1.5 rounded-lg text-base font-medium transition-all duration-300
     ${
       isActive
         ? "bg-white text-black shadow-md"
         : "text-white hover:text-[#C76A46]"
     }`;

  const bottomNavClass = ({ isActive }) =>
    `flex flex-col items-center justify-center transition-all duration-300
     ${
       isActive
         ? "bg-white text-black scale-105 shadow-lg"
         : "text-white hover:text-[#C76A46]"
     }
     rounded-xl px-3 py-1.5`;

  return (
    <>
      {/* ================= DESKTOP TOP NAV ================= */}
      <nav className="hidden md:block fixed top-0 w-full z-50
        bg-gray-500/60 backdrop-blur-xl border-b border-white/20">
        <div className="flex justify-between items-center px-8 py-3 max-w-7xl mx-auto">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-[cursive] tracking-wide text-[#C76A46]"
          >
            RentKaro
          </Link>

          {/* LINKS */}
          <ul className="flex gap-4">
            <li><NavLink to="/" className={topNavClass}>Home</NavLink></li>
            <li><NavLink to="/market" className={topNavClass}>Market</NavLink></li>
            <li><NavLink to="/sell" className={topNavClass}>Rent / Sell</NavLink></li>
            <li><NavLink to="/my-listings" className={topNavClass}>My Listings</NavLink></li>
            <li><NavLink to="/settings" className={topNavClass}>Settings</NavLink></li>
          </ul>

          {/* USER */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2"
              >
                <div className="w-9 h-9 rounded-full bg-black/50 border border-white/20
                  flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm text-white hover:text-[#C76A46]">
                  {user?.name}
                </span>
              </button>

              <button
                onClick={() => setShowLogout(true)}
                className="text-[#C76A46] hover:text-red-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link className="text-sm text-[#C76A46]" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* ================= MOBILE TOP NAV ================= */}
      <nav className="md:hidden fixed top-0 w-full z-40
        bg-gray-500/60 backdrop-blur-xl border-b border-white/10">
        <div className="flex justify-between items-center px-4 py-3 text-white">

          {(isHomePage || isMarketPage) ? (
            <button
              onClick={() => navigate("/")}
              className="text-xl font-[cursive] text-[#C76A46]"
            >
              RentKaro
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">Back</span>
            </button>
          )}

          {isLoggedIn && (
            <button
              onClick={() => setShowLogout(true)}
              className="bg-white/10 p-2 rounded-lg"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-1 left-3 right-3 z-50
        h-14 bg-gray-500/60 backdrop-blur-xl border border-white/20
        rounded-2xl shadow-xl flex items-center">
        <div className="flex justify-around items-center h-full w-full text-xl">

          <NavLink to="/market" className={bottomNavClass}>
            <MdStorefront size={22} />
          </NavLink>

          <NavLink to="/my-listings" className={bottomNavClass}>
            <FaList size={20} />
          </NavLink>

          <NavLink
            to="/sell"
            className="bg-[#C76A46] text-black p-3 rounded-full -mt-6
              shadow-[0_8px_24px_rgba(199,106,70,0.5)]"
          >
            <FaPlus size={22} />
          </NavLink>

          <NavLink to="/profile" className={bottomNavClass}>
            <FaUserCircle size={20} />
          </NavLink>

          <NavLink to="/settings" className={bottomNavClass}>
            <FaCog size={20} />
          </NavLink>

        </div>
      </nav>

      {/* ================= LOGOUT MODAL ================= */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm
          flex justify-center items-center z-[100]">
          <div className="bg-black/80 border border-white/20 p-5 rounded-xl
            text-center text-white w-72">
            <p className="mb-4 text-base">Logout?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-1.5 rounded bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded bg-red-600 text-white"
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
