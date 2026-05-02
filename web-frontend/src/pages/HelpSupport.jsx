import { useState } from "react";
import NavBar from "../components/NavBar";
import { Mail } from "lucide-react";

function HelpSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://rentkaro-backend.onrender.com/api/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Support request sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send request");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
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

              {/* NAME */}
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
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-black outline-none text-sm"
                />
              </div>

              {/* EMAIL */}
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
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-black outline-none text-sm"
                />
              </div>

              {/* MESSAGE */}
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
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-black outline-none resize-none text-sm"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold transition duration-200"
              >
                Submit Request
              </button>

            </form>
          </div>

          {/* EMAIL SUPPORT CARD (CENTERED AT END) */}
          <div className="flex justify-center">
            <SupportCard
              icon={<Mail size={22} />}
              title="Email Support"
              desc="Reach out to our support team."
              email="rentkaro.x11@gmail.com"
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default HelpSupport;


/* SUPPORT CARD COMPONENT */

function SupportCard({ icon, title, desc, email }) {

  const subject = encodeURIComponent("RentKaro Support Request");
  const body = encodeURIComponent(
    "Hello RentKaro Team,\n\nI need help with the following issue:\n\n"
  );

  return (
    <div
      className="
        bg-white/60 backdrop-blur-lg
        border border-gray-300/40
        rounded-xl shadow-md
        p-5 flex flex-col gap-3
        hover:shadow-lg hover:-translate-y-1
        transition duration-200
        max-w-sm
      "
    >
      <div className="text-black">{icon}</div>

      <h3 className="text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="text-xs text-gray-600">
        {desc}
      </p>

      <a
        href={`mailto:${email}?subject=${subject}&body=${body}`}
        className="mt-1 text-sm font-medium text-[#C76A46] hover:underline"
      >
        {email}
      </a>

    </div>
  );
}