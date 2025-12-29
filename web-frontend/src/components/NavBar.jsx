import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaCog, FaPlus, FaList } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { useState, useEffect } from "react";
import { logout as logoutUtil } from "../utils/auth";
import { ArrowLeft, LogOut, Download, Bell } from "lucide-react";

const API_URL = "http://localhost:5000";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMarketPage = location.pathname === "/market";

  /* ========= SAFE USER PARSE ========= */
  let user = null;
  const userStr = localStorage.getItem("user");
  if (userStr && userStr !== "undefined") {
    try {
      user = JSON.parse(userStr);
    } catch {
      user = null;
    }
  }

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [showLogout, setShowLogout] = useState(false);

  /* ========= NOTIFICATIONS ========= */
  const [requestCount, setRequestCount] = useState(0);

  const fetchNotifications = async () => {
    if (!token) {
      setRequestCount(0);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/chat-request/buyer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.warn("Notification fetch failed:", res.status);
        setRequestCount(0);
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        const unseen = data.filter(
          (r) =>
            r.status === "accepted" &&
            r.whatsappAllowed === true &&
            r.isSeenByBuyer === false
        );
        setRequestCount(unseen.length);
      } else {
        setRequestCount(0);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
      setRequestCount(0);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchNotifications();
    })();
  }, [token]);

  /* ========= CLEAR NOTIFICATIONS ========= */
  const clearNotifications = async () => {
    if (!token) return;

    try {
      const res = await fetch(
        `${API_URL}/api/chat-request/buyer/seen`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setRequestCount(0);
      }
    } catch (err) {
      console.error("Failed to clear notifications", err);
    }
  };

  /* ========= PWA INSTALL ========= */
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

  /* ========= LOGOUT ========= */
  const handleLogout = () => {
    localStorage.clear();
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

          <div className="flex items-center gap-5 text-light">

            {/* 🔔 BELL (ALWAYS VISIBLE) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  isLoggedIn ? navigate("/my-requests") : navigate("/login")
                }
                className="relative"
              >
                <Bell size={22} className="text-white" />
                {requestCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {requestCount}
                  </span>
                )}
              </button>

              {isLoggedIn && requestCount > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-xs underline text-gray-300 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span>{user?.name}</span>
                </button>

                <button onClick={() => setShowLogout(true)}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {/* ================= MOBILE TOP NAV ================= */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-40 bg-primary/95 backdrop-blur-xl border-b border-muted/30">
        <div className="flex items-center justify-between px-4 py-4">

          {/* LEFT */}
          {isHomePage ? (
            <span className="text-xl font-extrabold text-light">HomePage</span>
          ) : isMarketPage ? (
            <button
              onClick={() => navigate("/")}
              className="text-xl font-extrabold text-light"
            >
              RentKaro
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="text-light flex items-center gap-1"
            >
              <ArrowLeft size={22} />
              <span className="text-sm">Back</span>
            </button>
          )}

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                isLoggedIn ? navigate("/my-requests") : navigate("/login")
              }
              className="relative text-white"
            >
              <Bell size={22} />
              {requestCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {requestCount}
                </span>
              )}
            </button>

            {isLoggedIn && requestCount > 0 && (
              <button
                onClick={clearNotifications}
                className="text-xs underline text-gray-300"
              >
                Clear
              </button>
            )}

            {installPrompt && !isInstalled && (
              <button onClick={handleInstall} className="text-light">
                <Download size={22} />
              </button>
            )}

            {isLoggedIn && (
              <button onClick={() => setShowLogout(true)} className="text-light">
                <LogOut size={22} />
              </button>
            )}
          </div>
        </div>
      </nav>
      {/* ================= MOBILE BOTTOM NAV ================= */}
<nav className="md:hidden fixed bottom-1 left-0 w-full z-50 bg-primary/95 backdrop-blur-xl border-t border-muted/30">
  <div className="flex justify-around items-center py-2">

    <NavLink to="/market" className="flex flex-col items-center text-xs text-light">
      <MdStorefront className="text-2xl" />
      Market
    </NavLink>

    {isLoggedIn && (
      <NavLink to="/my-listings" className="flex flex-col items-center text-xs text-light">
        <FaList className="text-2xl" />
        Listings
      </NavLink>
    )}

    <NavLink
      to="/sell"
      className="bg-accent text-primary rounded-full p-3 -mt-6 shadow-lg"
    >
      <FaPlus className="text-2xl" />
    </NavLink>

    <NavLink to="/profile" className="flex flex-col items-center text-xs text-light">
      <FaUserCircle className="text-2xl" />
      Profile
    </NavLink>

    <NavLink to="/settings" className="flex flex-col items-center text-xs text-light">
      <FaCog className="text-2xl" />
      Settings
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
