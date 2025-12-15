function Footer() {
  return (
    <footer
      className="
        w-full mt-0 
        bg-black/10 backdrop-blur-lg 
        border-t border-white/20 
        shadow-[0_-4px_20px_rgba(0,0,0,0.1)]
        text-gray-800
      "
    >
      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-extrabold text-black tracking-wide">
            RentKaro
          </h2>
          <p className="mt-3 text-gray-600 max-w-md leading-relaxed">
            Bringing smarter renting & selling right to your fingertips.  
            Hassle-free, trusted, and community-driven.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-700">
            <li>
              <a href="/" className="hover:text-black transition">Home</a>
            </li>
            <li>
              <a href="/market" className="hover:text-[#C76A46] transition">Market</a>
            </li>
            <li>
              <a href="/sell" className="hover:text-[#C76A46] transition">Rent/Sell</a>
            </li>
            <li>
              <a href="/chat" className="hover:text-[#C76A46] transition">Chat</a>
            </li>
            <li>
              <a href="/settings" className="hover:text-[#C76A46] transition">Settings</a>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div
        className="
          bg-white/20 backdrop-blur-md 
          border-t border-white/20 
          py-4 text-center text-gray-700 text-sm
        "
      >
        © {new Date().getFullYear()}
        <span className="font-semibold text-[#C76A46]"> RentKaro</span>
        — Smarter Renting Starts Here.
        <span className="block mt-1 text-gray-600">
          Built by <span className="font-semibold text-black">Karan Sharma</span>
        </span>
      </div>

    </footer>
  );
}

export default Footer;
