import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaCog, FaPlus } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { useState } from "react";
import { logout as logoutUtil } from "../utils/auth";
import { ArrowLeft, LogOut } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMarketPage = location.pathname === "/market";

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!localStorage.getItem("token");

  const [showLogout, setShowLogout] = useState(false);

  /* =====================
     LOGOUT HANDLER
  ===================== */
  const handleLogout = () => {
    // 🔥 CLEAR CHATBOT DATA
    localStorage.removeItem("kokkie-chat");
    localStorage.removeItem("kokkie-session");

    // clear auth
    logoutUtil();

    setShowLogout(false);
    navigate("/login");
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

            {isLoggedIn && (
              <li><Link to="/my-listings" className="hover:text-[#C76A46]">My Listings</Link></li>
            )}

            <li><Link to="/settings" className="hover:text-[#C76A46]">Settings</Link></li>
          </ul>

          {/* USER SECTION */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4 text-light">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 hover:text-[#C76A46]"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="profile"
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <span>{user?.name}</span>
              </button>

              <button
                onClick={() => setShowLogout(true)}
                className="hover:text-[#C76A46]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-[#C76A46] text-light">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* ================= MOBILE TOP NAV ================= */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50 bg-primary/95 backdrop-blur-xl border-b border-muted/30">
        <div className="flex items-center justify-between px-4 py-4">
          {isHomePage ? (
            <span className="text-xl font-extrabold text-light">HomePage</span>
          ) : isMarketPage ? (
            <button onClick={() => navigate("/")} className="text-xl font-extrabold text-light">
              RentKaro
            </button>
          ) : (
            <button onClick={() => navigate(-1)} className="text-light flex items-center gap-1">
              <ArrowLeft size={22} />
              <span className="text-sm">Back</span>
            </button>
          )}

          {(isHomePage || isMarketPage) && isLoggedIn && (
            <button
              onClick={() => setShowLogout(true)}
              className="text-light hover:text-[#C76A46]"
            >
              <LogOut size={22} />
            </button>
          )}
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-primary/95 backdrop-blur-xl border-t border-muted/30">
        <div className="flex justify-around items-center py-2">
          <NavLink to="/market" className="flex flex-col items-center text-xs">
            <MdStorefront className="text-2xl" /> Market
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/my-listings" className="flex flex-col items-center text-xs">
              <MdStorefront className="text-2xl" /> Listings
            </NavLink>
          )}

          <NavLink to="/sell" className="bg-accent text-primary rounded-full p-4 -mt-6 shadow-lg">
            <FaPlus className="text-2xl" />
          </NavLink>

          <NavLink to="/profile" className="flex flex-col items-center text-xs">
            <FaUserCircle className="text-2xl" /> Profile
          </NavLink>

          <NavLink to="/settings" className="flex flex-col items-center text-xs">
            <FaCog className="text-2xl" /> Settings
          </NavLink>
        </div>
      </nav>

      {/* ================= LOGOUT MODAL ================= */}
      {showLogout && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-xl font-bold mb-2">Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 py-2 bg-red-600 text-white rounded"
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
