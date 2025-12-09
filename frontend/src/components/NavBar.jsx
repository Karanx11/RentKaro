import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";


function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">

      {/* DESKTOP NAV */}
      <div className="relative w-full px-6 py-4 hidden md:flex items-center justify-center">

        {/* LEFT Nav */}
        <a
          href="/"
          className="absolute left-0 ml-4 text-black font-bold text-3xl hover:text-peach"
        >
          RentKaro
        </a>

        {/* CENTER Nav */}
        <ul className="flex gap-8 text-black font-medium">
          <li><a href="/" className="hover:text-orange-400 text-xl">Home</a></li>
          <li><Link to="/sell" className="hover:text-orange-400 text-xl">Sell Items</Link></li>
          <li><a href="/rent" className="hover:text-orange-400 text-xl">Rent Items</a></li>
          <li><a href="/chatbox" className="hover:text-orange-400 text-xl">Chat box</a></li>
          <li><a href="/contact" className="hover:text-orange-400 text-xl">Contact</a></li>
        </ul>

        {/* RIGHT Nav */}
        <div className="absolute right-0 mr-4 flex items-center gap-6 text-black font-medium">
          <a href="/profile" className="hover:text-orange-400 text-xl">Profile</a>
          <a href="/login" className="hover:text-orange-400 text-xl">Login</a>
        </div>
      </div>

      {/* MOBILE NAV HEADER */}
      <div className="w-full flex md:hidden items-center justify-between px-6 py-4">

        {/* LEFT Logo */}
        <a href="/" className="text-black font-bold text-3xl">
          RentKaro
        </a>

        {/* Hamburger Button */}
        <button onClick={() => setOpen(!open)} className="text-black text-3xl">
          {open ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white/20 backdrop-blur-xl px-6 py-4 flex flex-col gap-4 text-black font-medium">

          <a href="/" className="hover:text-orange-400 text-lg">Home</a>
          <a href="/sell" className="hover:text-orange-400 text-lg">Sell Items</a>
          <a href="/rent" className="hover:text-orange-400 text-lg">Rent Items</a>
          <a href="/chatbox" className="hover:text-orange-400 text-lg">Chat box</a>
          <a href="/contact" className="hover:text-orange-400 text-lg">Contact</a>

          <hr className="border-black/30" />

          <a href="/profile" className="hover:text-orange-400 text-lg">Profile</a>
          <a href="/login" className="hover:text-orange-400 text-lg">Login</a>

        </div>
      )}
    </nav>
  );
}

export default NavBar;
