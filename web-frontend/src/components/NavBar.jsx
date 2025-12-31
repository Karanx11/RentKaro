import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaCog, FaPlus, FaList } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { useState, useEffect } from "react";
import { logout as logoutUtil } from "../utils/auth";
import { ArrowLeft, LogOut, Bell } from "lucide-react";
import { socket } from "../services/socket";

const API_URL = "http://localhost:5000";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMarketPage = location.pathname === "/market";

  /* ========== SAFE USER PARSE ========== */
  let user = null;
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) user = JSON.parse(userStr);
  } catch {
    localStorage.removeItem("user");
  }

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [showLogout, setShowLogout] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
useEffect(() => {
  if (!isLoggedIn || !user) return;

  const onSellerNew = () => {
    setRequestCount((prev) => prev + 1);
  };

  socket.on("seller-new-request", onSellerNew);

  return () => {
    socket.off("seller-new-request", onSellerNew);
  };
}, [isLoggedIn, user]);

useEffect(() => {
  if (!token || !user) return;

  fetch(`${API_URL}/api/chat-request/seller/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setRequestCount(data.length);
      }
    });
}, [token, user]);


  /* ========== FETCH COUNT (ON LOAD ONLY) ========== */
  useEffect(() => {
    if (!token) return;

    const fetchCount = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/chat-request/buyer/notifications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) return;

        const data = await res.json();
        if (Array.isArray(data)) {
          setRequestCount(data.length);
        }
      } catch {
        // silent
      }
    };

    fetchCount();
  }, [token]);

  /* ========== SOCKET REAL-TIME ========== */
  useEffect(() => {
    if (!isLoggedIn) return;

    const onSellerNew = () =>
      setRequestCount((prev) => prev + 1);

    const onBuyerAccepted = () =>
      setRequestCount((prev) => prev + 1);

    const onCleared = () => setRequestCount(0);

    socket.on("seller-new-request", onSellerNew);
    socket.on("buyer-request-accepted", onBuyerAccepted);
    socket.on("buyer-notifications-cleared", onCleared);

    return () => {
      socket.off("seller-new-request", onSellerNew);
      socket.off("buyer-request-accepted", onBuyerAccepted);
      socket.off("buyer-notifications-cleared", onCleared);
    };
  }, [isLoggedIn]);

  /* ========== LOGOUT ========== */
  const handleLogout = () => {
    localStorage.clear();
    logoutUtil();
    setShowLogout(false);
    navigate("/login");
  };

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:block fixed top-0 w-full z-50 bg-primary/80 backdrop-blur-xl border-b">
        <div className="flex justify-between items-center px-10 py-5">

          <Link to="/" className="text-3xl font-bold text-light">
            RentKaro
          </Link>

          <ul className="flex gap-10 text-light">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/market">Market</Link></li>
            <li><Link to="/sell">Rent / Sell</Link></li>
            {isLoggedIn && <li><Link to="/my-listings">My Listings</Link></li>}
            <li><Link to="/settings">Settings</Link></li>
          </ul>

          <div className="flex items-center gap-5">

            {/* 🔔 BELL */}
            <button
              onClick={() =>
                isLoggedIn ? navigate("/notifications") : navigate("/login")
              }
              className="relative"
            >
              <Bell size={22} className="text-black" />
              {requestCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {requestCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2"
                >
                  <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center">
                    {user?.name?.[0]?.toUpperCase()}
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
      <nav className="md:hidden fixed top-0 w-full z-40 bg-primary/95 backdrop-blur-xl border-b">
        <div className="flex justify-between items-center px-4 py-4">

          {isHomePage ? (
            <span className="text-xl font-bold text-light">Home</span>
          ) : isMarketPage ? (
            <button onClick={() => navigate("/")}>RentKaro</button>
          ) : (
            <button onClick={() => navigate(-1)} className="flex gap-1">
              <ArrowLeft size={20} /> Back
            </button>
          )}

          <div className="flex gap-4">
            <button
              onClick={() =>
                isLoggedIn ? navigate("/notifications") : navigate("/login")
              }
              className="relative"
            >
              <Bell size={22} className="text-black" />
              {requestCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {requestCount}
                </span>
              )}
            </button>

            {isLoggedIn && (
              <button onClick={() => setShowLogout(true)}>
                <LogOut size={22} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-1 w-full z-50 bg-primary/95 border-t">
        <div className="flex justify-around py-2">
          <NavLink to="/market"><MdStorefront /></NavLink>
          {isLoggedIn && <NavLink to="/my-listings"><FaList /></NavLink>}
          <NavLink to="/sell"><FaPlus /></NavLink>
          <NavLink to="/profile"><FaUserCircle /></NavLink>
          <NavLink to="/settings"><FaCog /></NavLink>
        </div>
      </nav>

      {/* ================= LOGOUT MODAL ================= */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[100]">
          <div className="bg-white p-6 rounded-xl text-center">
            <p className="mb-4">Logout?</p>
            <div className="flex gap-4">
              <button onClick={() => setShowLogout(false)}>Cancel</button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
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
