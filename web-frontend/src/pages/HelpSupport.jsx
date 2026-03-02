import { useState } from "react";
import NavBar from "../components/NavBar";
import { Mail, Phone, HelpCircle, FileText } from "lucide-react";

function HelpSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your request has been submitted!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 pt-24 pb-20">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* PAGE HEADER */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Help & Support
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Need assistance? Our team is here to help you with anything related to RentKaro.
            </p>
          </div>

          {/* SUPPORT CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SupportCard
              icon={<HelpCircle size={22} />}
              title="FAQs"
              desc="Find answers to common questions."
              action="Browse FAQs"
            />
            <SupportCard
              icon={<Mail size={22} />}
              title="Email Support"
              desc="Reach out to our support team."
              action="support@rentkaro.com"
            />
            <SupportCard
              icon={<Phone size={22} />}
              title="Call Us"
              desc="Talk directly to our support executive."
              action="+91 98765 43210"
            />
            <SupportCard
              icon={<FileText size={22} />}
              title="Documentation"
              desc="Read detailed guides and policies."
              action="View Docs"
            />
          </div>

          {/* CONTACT FORM */}
          <div
            className="
              bg-white/60 backdrop-blur-xl
              border border-gray-300/40
              rounded-2xl shadow-xl
              p-8
              max-w-3xl mx-auto
            "
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Contact Us
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="
                    w-full px-4 py-2.5 rounded-lg
                    bg-white border border-gray-300
                    focus:ring-2 focus:ring-black
                    outline-none text-sm
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="
                    w-full px-4 py-2.5 rounded-lg
                    bg-white border border-gray-300
                    focus:ring-2 focus:ring-black
                    outline-none text-sm
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your issue in detail..."
                  className="
                    w-full px-4 py-2.5 rounded-lg
                    bg-white border border-gray-300
                    focus:ring-2 focus:ring-black
                    outline-none resize-none text-sm
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  w-full
                  bg-black hover:bg-gray-900
                  text-white
                  py-2.5 rounded-lg
                  text-sm font-semibold
                  transition duration-200
                "
              >
                Submit Request
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default HelpSupport;

/* SUPPORT CARD COMPONENT */

function SupportCard({ icon, title, desc, action }) {
  return (
    <div
      className="
        bg-white/60 backdrop-blur-lg
        border border-gray-300/40
        rounded-xl shadow-md
        p-5 flex flex-col gap-3
        hover:shadow-lg hover:-translate-y-1
        transition duration-200
      "
    >
      <div className="text-black">{icon}</div>

      <h3 className="text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="text-xs text-gray-600">
        {desc}
      </p>

      <span className="mt-1 text-sm font-medium text-[#C76A46]">
        {action}
      </span>
    </div>
  );
}