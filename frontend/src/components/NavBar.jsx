import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl shadow-md border-b border-black/30">

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-between px-10 py-5">

        {/* LEFT LOGO */}
        <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
          RentKaro
        </Link>

        {/* CENTER MENU */}
        <ul className="flex gap-10 text-white font-medium text-lg">
          <li><Link to="/" className="hover:text-[#C76A46]">Home</Link></li>
          <li><Link to="/sell" className="hover:text-[#C76A46]">Sell</Link></li>
          <li><Link to="/rent" className="hover:text-[#C76A46]">Rent</Link></li>
          <li><Link to="/contact" className="hover:text-[#C76A46]">Contact</Link></li>
        </ul>

        {/* SEARCH BAR */}
        <div className="flex items-center w-[320px] bg-white/90 border border-white/30 rounded-full px-4 py-2 shadow-sm">
          <IoSearch className="text-gray-600 text-xl mr-3" />
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 bg-transparent outline-none text-gray-800 text-lg"
          />
        </div>

        {/* RIGHT PROFILE + LOGIN */}
        <div className="flex items-center gap-6 text-lg font-medium text-white">
          <Link to="/profile" className="hover:text-[#C76A46]">Profile</Link>
          <Link to="/login" className="hover:text-[#C76A46]">Login</Link>
        </div>

      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-white">
          RentKaro
        </Link>

        {/* HAMBURGER */}
        <button onClick={() => setOpen(!open)} className="text-3xl text-white">
          {open ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/50 backdrop-blur-xl border-t border-white/30 px-6 py-6 flex flex-col gap-5">

          {/* Search bar mobile */}
          <div className="flex items-center w-full bg-white/90 border border-white/30 rounded-full px-4 py-2 shadow-sm">
            <IoSearch className="text-gray-600 text-xl mr-3" />
            <input
              type="text"
              placeholder="Search here..."
              className="flex-1 bg-transparent outline-none text-gray-600 text-lg"
            />
          </div>

          <Link to="/" className="text-white hover:text-[#C76A46] text-lg">Home</Link>
          <Link to="/sell" className="text-white hover:text-[#C76A46] text-lg">Sell</Link>
          <Link to="/rent" className="text-white hover:text-[#C76A46] text-lg">Rent</Link>
          <Link to="/inbox" className="text-white hover:text-[#C76A46] text-lg">Inbox</Link>

          <hr className="border-white/40" />

          <Link to="/profile" className="text-white hover:text-[#C76A46] text-lg">Profile</Link>
          <Link to="/login" className="text-white hover:text-[#C76A46] text-lg">Login</Link>
        </div>
      )}

    </nav>
  );
}

export default NavBar;
