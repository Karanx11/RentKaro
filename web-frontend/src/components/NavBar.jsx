import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaCog, FaPlus } from "react-icons/fa";
import { MdStorefront, MdChat } from "react-icons/md";
import { useEffect, useState } from "react";
import { getProfile } from "../utils/auth";
import { logout } from "../utils/logout";

function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getProfile();
      setUser(data);
    };
    fetchUser();
  }, []);

  const isLoggedIn = !!user;

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
            <li><Link to="/sell" className="hover:text-[#C76A46]">Rent/Sell</Link></li>
            <li><Link to="/chat" className="hover:text-[#C76A46]">Chat</Link></li>
          </ul>

          {/* USER INFO */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4 text-light">
              <img
                src={user.avatar || "/src/assets/boy_pic.png"}
                className="w-10 h-10 rounded-full border"
                alt="profile"
              />
              <span className="font-semibold">{user.name}</span>
              <button
                onClick={logout}
                className="hover:text-[#C76A46]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-light hover:text-[#C76A46]">
              Login
            </Link>
          )}

        </div>
      </nav>

      {/* ================= MOBILE TOP NAV ================= */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50 bg-primary/90 backdrop-blur-xl border-b border-muted/30">
        <div className="flex items-center justify-between px-5 py-4">

          <Link to="/" className="text-xl font-bold text-light">
            RentKaro
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-3 text-light">
              <img
                src={user.avatar || "/src/assets/boy_pic.png"}
                className="w-8 h-8 rounded-full object-cover"
              />
              <button
                onClick={logout}
                className="text-sm border border-muted/40 px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-light text-sm">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-primary/95 backdrop-blur-xl border-t border-muted/30">
        <div className="flex justify-around items-center py-2">

          <NavLink to="/market" className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-[#C76A46]" : "text-muted"}`
          }>
            <MdStorefront className="text-2xl" />
            Market
          </NavLink>

          <NavLink to="/chat" className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-[#C76A46]" : "text-muted"}`
          }>
            <MdChat className="text-2xl" />
            Chats
          </NavLink>

          <NavLink to="/sell" className="bg-accent text-primary rounded-full p-4 -mt-2 shadow-lg">
            <FaPlus className="text-2xl" />
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-[#C76A46]" : "text-muted"}`
          }>
            <FaUserCircle className="text-2xl" />
            Profile
          </NavLink>

          <NavLink to="/settings" className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-[#C76A46]" : "text-muted"}`
          }>
            <FaCog className="text-2xl" />
            Settings
          </NavLink>

        </div>
      </nav>
    </>
  );
}

export default NavBar;
