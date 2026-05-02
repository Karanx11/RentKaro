import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-white/10 mt-20">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-[cursive] text-[#C76A46]">
            RentKaro
          </h2>
          <p className="mt-3 text-gray-400 leading-relaxed">
            Smart rental marketplace for everyday needs.
            Rent, sell & save money with ease.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-[#C76A46]">Home</Link></li>
            <li><Link to="/market" className="hover:text-[#C76A46]">Market</Link></li>
            <li><Link to="/sell" className="hover:text-[#C76A46]">Rent / Sell</Link></li>
            <li><Link to="/my-listings" className="hover:text-[#C76A46]">My Listings</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/help" className="hover:text-[#C76A46]">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-[#C76A46]">Contact</Link></li>
            <li><Link to="/terms" className="hover:text-[#C76A46]">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-[#C76A46]">Privacy</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Stay Updated</h3>
          <p className="text-gray-400 mb-3">
            Get latest deals & offers.
          </p>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#C76A46]">RentKaro</span> • All rights reserved
        <div className="mt-1 text-gray-400">
          Built with ❤️ by Karan Sharma
        </div>
      </div>

    </footer>
  );
}

export default Footer;