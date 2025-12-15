import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaCog, FaPlus } from "react-icons/fa";
import { MdStorefront, MdChat } from "react-icons/md";

function NavBar() {
  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="hidden md:block fixed top-0 left-0 w-full z-50
                      bg-primary/80 backdrop-blur-xl
                      border-b border-muted/30 shadow-md">

        <div className="flex items-center justify-between px-10 py-5">

          {/* LOGO */}
          <Link to="/" className="text-3xl font-extrabold text-light">
            RentSellKaro
          </Link>

          {/* MENU */}
          <ul className="flex gap-10 text-light font-medium text-lg">
            <li><Link to="/" className="hover:text-[#C76A46]">Home</Link></li>
            <li><Link to="/market" className="hover:text-[#C76A46]">Market</Link></li>
            <li><Link to="/sell" className="hover:text-[#C76A46]">Rent/Sell</Link></li>
            <li><Link to="/chat" className="hover:text-[#C76A46]">Chat</Link></li>
            <li><Link to="/settings" className="hover:text-[#C76A46]">Settings</Link></li>
          </ul>

          {/* SEARCH
          <div className="flex items-center w-[320px]
                          bg-secondary border border-muted/30
                          rounded-full px-4 py-2">
            <IoSearch className="text-muted text-xl mr-3" />
            <input
              type="text"
              placeholder="Search here..."
              className="flex-1 bg-transparent outline-none
                         text-light placeholder:text-muted"
            />
          </div> */}

          {/* RIGHT */}
          <div className="flex items-center gap-6 text-lg text-light">
            <Link to="/profile" className="hover:text-accent">Profile</Link>
            <Link to="/login" className="hover:text-accent">Logout</Link>
          </div>

        </div>
      </nav>

      {/* MOBILE TOP NAV */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50
                      bg-primary/90 backdrop-blur-xl
                      border-b border-muted/30">

        <div className="flex items-center justify-between px-5 py-4">

          {/* BRAND */}
          <Link to="/" className="text-xl font-bold text-light">
            RentSellKaro
          </Link>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 text-light text-2xl">
            <Link to="/profile">
              <FaUserCircle />
            </Link>
            <Link
              to="/login"
              className="text-sm border border-muted/40
                         px-3 py-1 rounded-md"
            >
              Logout
            </Link>
          </div>

        </div>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <nav
        className="md:hidden fixed bottom-0 left-0 w-full z-50
                  bg-primary/95 backdrop-blur-xl
                  border-t border-muted/30"
      >
        <div className="flex justify-around items-center py-2">

          {/* MARKET */}
          <NavLink
            to="/market"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition
              ${isActive ? "text-[#C76A46]" : "text-muted"}`
            }
          >
            <MdStorefront className="text-2xl" />
            Market
          </NavLink>

          {/* CHAT */}
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition
              ${isActive ? "text-[#C76A46]" : "text-muted"}`
            }
          >
            <MdChat className="text-2xl" />
            Chats
          </NavLink>

          {/* CENTER ADD (SELL) */}
          <NavLink
            to="/sell"
            className={({ isActive }) =>
              `rounded-full p-4 -mt-2 shadow-lg transition
              ${isActive
                ? "bg-[#C76A46] text-white"
                : "bg-accent text-primary"}`
            }
          >
            <FaPlus className="text-2xl" />
          </NavLink>

          {/* PROFILE */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition
              ${isActive ? "text-[#C76A46]" : "text-muted"}`
            }
          >
            <FaUserCircle className="text-2xl" />
            Profile
          </NavLink>

          {/* SETTINGS */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition
              ${isActive ? "text-[#C76A46]" : "text-muted"}`
            }
          >
            <FaCog className="text-2xl" />
            Settings
          </NavLink>

        </div>
      </nav>

    </>
  );
}

export default NavBar;
