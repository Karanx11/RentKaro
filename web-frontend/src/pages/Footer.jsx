function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 border-t border-white/10">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            RentKaro
          </h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            India's trusted marketplace for renting & selling products.
            Smart deals. Secure transactions. Community powered.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6">
            <div className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#C76A46] transition cursor-pointer">
              <i className="fab fa-facebook-f text-sm"></i>
            </div>
            <div className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#C76A46] transition cursor-pointer">
              <i className="fab fa-instagram text-sm"></i>
            </div>
            <div className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-full hover:bg-[#C76A46] transition cursor-pointer">
              <i className="fab fa-twitter text-sm"></i>
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/market?cat=electronics" className="hover:text-[#C76A46] transition">Electronics</a></li>
            <li><a href="/market?cat=furniture" className="hover:text-[#C76A46] transition">Furniture</a></li>
            <li><a href="/market?cat=vehicles" className="hover:text-[#C76A46] transition">Vehicles</a></li>
            <li><a href="/market?cat=properties" className="hover:text-[#C76A46] transition">Properties</a></li>
            <li><a href="/market?cat=others" className="hover:text-[#C76A46] transition">Others</a></li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/help" className="hover:text-[#C76A46] transition">Help Center</a></li>
            <li><a href="/how-it-works" className="hover:text-[#C76A46] transition">How It Works</a></li>
            <li><a href="/terms" className="hover:text-[#C76A46] transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-[#C76A46] transition">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:text-[#C76A46] transition">Contact Us</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to get latest deals & updates.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-l-lg focus:outline-none focus:border-[#C76A46]"
            />
            <button className="px-4 py-2 bg-[#C76A46] text-white text-sm rounded-r-lg hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#C76A46] font-medium">RentKaro</span>. 
        All rights reserved.
        <div className="mt-1">
          Built with ❤️ by <span className="text-gray-300">Karan Sharma</span>
        </div>
      </div>

    </footer>
  );
}

export default Footer;