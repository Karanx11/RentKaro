import NavBar from "../components/NavBar";

function HelpSupport() {
  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* PAGE HEADER */}
          <div>
            <h1 className="text-2xl font-bold text-black mb-1">
              Help & Support
            </h1>
            <p className="text-sm text-gray-700">
              We’re here to help you with anything related to RentKaro.
            </p>
          </div>

          {/* CONTACT FORM */}
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-2xl shadow-lg
              p-6
            "
          >
            <h2 className="text-lg font-semibold text-black mb-2">
              Contact Us
            </h2>

            <p className="text-sm text-gray-700 mb-4">
              Fill out the form below and our team will get back to you.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 py-2.5 rounded-lg bg-white/80 border outline-none text-sm"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 py-2.5 rounded-lg bg-white/80 border outline-none text-sm"
              />

              <textarea
                rows={4}
                placeholder="Describe your issue..."
                className="w-full px-3 py-2.5 rounded-lg bg-white/80 border outline-none resize-none text-sm"
              />

              <button
                className="
                  bg-black hover:bg-gray-800
                  text-white hover:text-[#C76A46]
                  px-6 py-2.5 rounded-lg
                  text-sm font-semibold
                "
              >
                Submit Request
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default HelpSupport;

/* SMALL COMPONENT */

function SupportCard({ icon, title, desc, action }) {
  return (
    <div
      className="
        bg-gray-400/40 backdrop-blur-xl
        border border-gray-500/30
        rounded-xl shadow-md
        p-4 flex flex-col gap-2
        hover:bg-white/40 transition
      "
    >
      <div className="text-black">{icon}</div>

      <h3 className="text-sm font-semibold text-black">
        {title}
      </h3>

      <p className="text-xs text-gray-700">
        {desc}
      </p>

      <span className="mt-1 text-sm font-medium text-[#C76A46]">
        {action}
      </span>
    </div>
  );
}
