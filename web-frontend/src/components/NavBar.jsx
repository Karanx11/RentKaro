import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaPlus } from "react-icons/fa";
import { MdStorefront, MdChat } from "react-icons/md";
import { useState } from "react";
import { logout as logoutUtil } from "../utils/auth";

function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!localStorage.getItem("token");
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logoutUtil();
    setShowLogout(false);
  };

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:block fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-xl border-b border-muted/30 shadow-md">
        <div className="flex items-center justify-between px-10 py-5">

          {/* LOGO */}
          <Link to="/" className="text-3xl font-extrabold text-light">
            RentKaro
          </Link>

          {/* MENU */}
          <ul className="flex gap-10 text-light font-medium text-lg">
            <li><Link to="/" className="hover:text-[#C76A46]">Home</Link></li>
            <li><Link to="/market" className="hover:text-[#C76A46]">Market</Link></li>
            <li><Link to="/sell" className="hover:text-[#C76A46]">Rent / Sell</Link></li>
            <li><Link to="/chat" className="hover:text-[#C76A46]">Chat</Link></li>
            <li><Link to="/settings" className="hover:text-[#C76A46]">Settings</Link></li>
          </ul>

          {/* USER AREA */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4 text-light">

              {/* PROFILE (CLICKABLE) */}
             <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 hover:text-[#C76A46] transition"
            >
              {/* AVATAR */}
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="profile"
                  className="w-10 h-10 rounded-full border object-cover"
                />
              ) : (
                <div
                  className="
                    w-10 h-10 rounded-full
                    bg-black text-white
                    flex items-center justify-center
                    font-bold text-lg
                  "
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              {/* NAME */}
              <span className="font-semibold text-light">
                {user?.name}
              </span>
            </button>


              {/* LOGOUT */}
              <button
                onClick={() => setShowLogout(true)}
                className="hover:text-[#C76A46] transition font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-[#C76A46]">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-primary/95 backdrop-blur-xl border-t border-muted/30">
        <div className="flex justify-around items-center py-2">

          <NavLink
            to="/market"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-[#C76A46]" : "text-muted"
              }`
            }
          >
            <MdStorefront className="text-2xl" />
            Market
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-[#C76A46]" : "text-muted"
              }`
            }
          >
            <MdChat className="text-2xl" />
            Chats
          </NavLink>

          {/* CENTER ADD */}
          <NavLink
            to="/sell"
            className="bg-accent text-primary rounded-full p-4 -mt-2 shadow-lg"
          >
            <FaPlus className="text-2xl" />
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-[#C76A46]" : "text-muted"
              }`
            }
          >
            <FaUserCircle className="text-2xl" />
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-[#C76A46]" : "text-muted"
              }`
            }
          >
            <FaCog className="text-2xl" />
            Settings
          </NavLink>
        </div>
      </nav>

      {/* ================= LOGOUT CONFIRM MODAL ================= */}
      {showLogout && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center">
          <div className="bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-xl">
            <h2 className="text-xl font-bold text-black mb-2">
              Logout
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 py-2 rounded-xl border border-gray-400 text-gray-800 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2 rounded-xl bg-[#C76A46] text-white font-semibold"
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
