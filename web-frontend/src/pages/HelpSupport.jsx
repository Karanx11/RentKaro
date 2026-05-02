import { useState } from "react";
import NavBar from "../components/NavBar";
import { Mail } from "lucide-react";

function HelpSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // 🔥 added

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData); // 🔥 debug

    setLoading(true);

    try {
      const res = await fetch(
        "https://rentkaro-backend.onrender.com/api/support",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log("Response:", data); // 🔥 debug

      if (data.success) {
        alert("✅ Support request sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Failed to send request");
      }
    } catch (error) {
      console.error("ERROR:", error);
      alert("❌ Server error (check backend)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 pt-24 pb-20">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Help & Support
            </h1>

            <p className="text-sm text-gray-600 mt-2">
              Need assistance? Our team is here to help you.
            </p>
          </div>

          {/* FORM */}
          <div className="bg-white/60 backdrop-blur-xl border border-gray-300/40 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
              />

              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
                className="w-full px-4 py-2 border rounded-lg"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-2.5 rounded-lg"
              >
                {loading ? "Sending..." : "Submit Request"}
              </button>

            </form>
          </div>

          {/* SUPPORT CARD */}
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


/* SUPPORT CARD */

function SupportCard({ icon, title, desc, email }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md max-w-sm text-center">
      <div>{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm">{desc}</p>

      <a
        href={`mailto:${email}`}
        className="text-orange-500 underline"
      >
        {email}
      </a>
    </div>
  );
}