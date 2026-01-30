function Footer() {
  return (
    <footer
      className="
        w-full
        bg-black/10
        border-t border-white/20
        text-gray-800
      "
    >
      {/* MAIN FOOTER */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-black tracking-wide">
            RentKaro
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-md leading-relaxed">
            Smarter renting & selling made simple.
            Trusted, community-driven, and hassle-free.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-black">
            Quick Links
          </h3>

          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              <a href="/" className="hover:text-black transition">
                Home
              </a>
            </li>
            <li>
              <a href="/market" className="hover:text-[#C76A46] transition">
                Market
              </a>
            </li>
            <li>
              <a href="/sell" className="hover:text-[#C76A46] transition">
                Rent / Sell
              </a>
            </li>
            <li>
              <a href="/my-listings" className="hover:text-[#C76A46] transition">
                Listings
              </a>
            </li>
            <li>
              <a href="/settings" className="hover:text-[#C76A46] transition">
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        className="
          bg-white/20
          border-t border-white/20
          py-3 text-center
          text-xs text-gray-700
        "
      >
        © {new Date().getFullYear()}
        <span className="font-semibold text-[#C76A46]"> RentKaro</span>
        <span className="mx-1">•</span>
        Smarter Renting Starts Here
        <span className="block mt-1 text-gray-600">
          Built by <span className="font-medium text-black">Karan Sharma</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
