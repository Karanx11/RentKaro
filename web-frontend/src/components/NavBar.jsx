import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaCog, FaPlus } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { useState, useEffect } from "react";
import { logout as logoutUtil } from "../utils/auth";
import { ArrowLeft, LogOut, Download } from "lucide-react";
import { FaList } from "react-icons/fa";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMarketPage = location.pathname === "/market";

 const userStr = localStorage.getItem("user");
const user = userStr ? JSON.parse(userStr) : null;

  const isLoggedIn = !!localStorage.getItem("token");

  const [showLogout, setShowLogout] = useState(false);

  /* =====================
     🔽 PWA INSTALL STATE
  ===================== */
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  /* =====================
     LOGOUT HANDLER
  ===================== */
  const handleLogout = () => {
    localStorage.removeItem("kokkie-chat");
    localStorage.removeItem("kokkie-session");
    logoutUtil();
    setShowLogout(false);
    navigate("/login");
  };

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:block fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-xl border-b border-muted/30 shadow-md">
        <div className="flex items-center justify-between px-10 py-5">
          <Link to="/" className="text-3xl font-extrabold text-light">
            RentKaro
          </Link>

          <ul className="flex gap-10 text-light font-medium text-lg">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/market">Market</Link></li>
            <li><Link to="/sell">Rent / Sell</Link></li>
            {isLoggedIn && <li><Link to="/my-listings">My Listings</Link></li>}
            <li><Link to="/settings">Settings</Link></li>
          </ul>

          {isLoggedIn ? (
            <div className="flex items-center gap-4 text-light">
              <button onClick={() => navigate("/profile")} className="flex items-center gap-3">
                {user?.avatar ? (
                  <img src={user.avatar} alt="profile" className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <span>{user?.name}</span>
              </button>
              <button onClick={() => setShowLogout(true)}>Logout</button>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      {/* ================= MOBILE TOP NAV ================= */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-40 bg-primary/95 backdrop-blur-xl border-b border-muted/30">
        <div className="flex items-center justify-between px-4 py-4">

          {/* LEFT */}
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

          {/* RIGHT */}
          {(isHomePage || isMarketPage) && isLoggedIn && (
            <div className="flex items-center gap-4">

              {/* ✅ INSTALL APP BUTTON */}
              {installPrompt && !isInstalled && (
                <button
                  onClick={handleInstall}
                  className="text-light hover:text-[#C76A46]"
                  title="Install App"
                >
                  <Download size={22} />
                </button>
              )}

              {/* LOGOUT */}
              <button
                onClick={() => setShowLogout(true)}
                className="text-light hover:text-[#C76A46]"
              >
                <LogOut size={22} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-1 left-0 w-full z-50 bg-primary/95 backdrop-blur-xl border-t border-muted/30">
        <div className="flex justify-around items-center py-2">
          <NavLink to="/market" className="flex flex-col items-center text-xs">
            <MdStorefront className="text-2xl" /> Market
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/my-listings" className="flex flex-col items-center text-xs">
              <FaList className="text-2xl" /> Listings
            </NavLink>
          )}

          <NavLink to="/sell" className="bg-accent text-primary rounded-full p-3-mt-6 shadow-lg">
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
              <button onClick={() => setShowLogout(false)} className="flex-1 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleLogout} className="flex-1 py-2 bg-red-600 text-white rounded">
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
