function Footer() {
  return (
    <footer className="
      w-full mt-0 
      bg-black/10 backdrop-blur-lg 
      border-t border-white/20 
      shadow-[0_-4px_20px_rgba(0,0,0,0.1)]
      text-gray-800
    ">
      
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-bold text-black">RentKaro</h2>
          <p className="mt-2 text-gray-600">
            Rent anything. Sell anything.  
            Your trusted marketplace for daily needs.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-black">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-black">Home</a></li>
            <li><a href="/sell" className="hover:text-orange-500">Sell Items</a></li>
            <li><a href="/rent" className="hover:text-orange-500">Rent Items</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
          </ul>
        </div>

        {/* SOCIALS */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-black">Connect</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Instagram</a></li>
            <li><a href="#" className="hover:text-orange-500">Twitter</a></li>
            <li><a href="#" className="hover:text-orange-500">LinkedIn</a></li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="bg-white/20 backdrop-blur-md border-t border-white/20 py-4 text-center text-gray-700">
        © {new Date().getFullYear()} <span className="font-semibold text-orange-500">RentKaro</span> — All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
