import NavBar from "../components/NavBar";
import { Mail, Phone, MessageCircle, HelpCircle } from "lucide-react";

function HelpSupport() {
  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 sm:px-10 md:px-20 py-32">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* PAGE HEADER */}
          <div>
            <h1 className="text-4xl font-extrabold text-black mb-2">
              Help & Support
            </h1>
            <p className="text-gray-700">
              We’re here to help you with anything related to RentSellKaro.
            </p>
          </div>

          {/* QUICK HELP CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <SupportCard
              icon={<MessageCircle size={28} />}
              title="Chat with Kokkie"
              desc="Get instant help from our smart assistant."
              action="Open Chat"
            />

            <SupportCard
              icon={<Mail size={28} />}
              title="Email Support"
              desc="Reach us via email for detailed queries."
              action="support@rentsellkaro.com"
            />

            <SupportCard
              icon={<Phone size={28} />}
              title="Call Support"
              desc="Talk to our support team directly."
              action="+91 9XXXXXXXXX"
            />

            <SupportCard
              icon={<HelpCircle size={28} />}
              title="FAQs"
              desc="Find answers to common questions."
              action="View FAQs"
            />

          </div>

          {/* CONTACT FORM */}
          <div className="
            bg-gray-400/40 backdrop-blur-xl
            border border-gray-500/30
            rounded-2xl shadow-xl p-8
          ">
            <h2 className="text-2xl font-bold text-black mb-4">
              Contact Us
            </h2>

            <p className="text-gray-700 mb-6">
              Fill out the form below and our team will get back to you.
            </p>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-3 rounded-xl bg-white/80 border border-gray-300 shadow-md outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-5 py-3 rounded-xl bg-white/80 border border-gray-300 shadow-md outline-none"
              />

              <textarea
                rows={4}
                placeholder="Describe your issue..."
                className="w-full px-5 py-4 rounded-xl bg-white/80 border border-gray-300 shadow-md outline-none resize-none"
              />

              <button
                className="
                  bg-black hover:bg-gray-800
                  text-white hover:text-[#C76A46]
                  px-10 py-3 rounded-xl
                  text-lg font-semibold shadow-lg
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

/* ================= SMALL COMPONENT ================= */

function SupportCard({ icon, title, desc, action }) {
  return (
    <div
      className="
        bg-gray-400/40 backdrop-blur-xl
        border border-gray-500/30
        rounded-2xl shadow-lg
        p-6 flex flex-col gap-3
        hover:bg-white/40 transition
      "
    >
      <div className="text-black">{icon}</div>

      <h3 className="text-xl font-semibold text-black">
        {title}
      </h3>

      <p className="text-gray-700 text-sm">
        {desc}
      </p>

      <span className="mt-2 font-semibold text-[#C76A46]">
        {action}
      </span>
    </div>
  );
}
