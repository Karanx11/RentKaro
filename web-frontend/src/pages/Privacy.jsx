import NavBar from "../components/NavBar";

function Privacy() {
  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 sm:px-10 md:px-20 py-32">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* PAGE HEADER */}
          <div>
            <h1 className="text-4xl font-extrabold text-black mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-700">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
          </div>

          {/* PRIVACY CARD */}
          <div
            className="
              rounded-3xl overflow-hidden
              bg-gray-400/40
              border border-gray-500/30
              shadow-[0_8px_32px_rgba(31,38,135,0.37)]
              p-8 space-y-6
            "
          >
            <Section
              title="1. Information We Collect"
              text="We collect personal information such as name, email address, phone number, and location when you register or use RentSellKaro."
            />

            <Section
              title="2. How We Use Your Information"
              text="Your information is used to provide services, process transactions, improve our platform, and communicate important updates."
            />

            <Section
              title="3. Data Sharing"
              text="We do not sell your personal data. Information may be shared with other users only as required to complete transactions."
            />

            <Section
              title="4. Cookies & Tracking"
              text="We use cookies and similar technologies to enhance user experience, analyze usage, and improve platform performance."
            />

            <Section
              title="5. Data Security"
              text="We implement appropriate security measures to protect your data. However, no method of transmission over the internet is completely secure."
            />

            <Section
              title="6. User Rights"
              text="You have the right to access, update, or delete your personal information. Requests can be made via the Help & Support page."
            />

            <Section
              title="7. Third-Party Services"
              text="RentSellKaro may contain links to third-party services. We are not responsible for their privacy practices."
            />

            <Section
              title="8. Children’s Privacy"
              text="Our services are not intended for individuals under the age of 18. We do not knowingly collect data from minors."
            />

            <Section
              title="9. Policy Updates"
              text="This Privacy Policy may be updated from time to time. Continued use of RentSellKaro indicates acceptance of the updated policy."
            />

            <Section
              title="10. Contact Us"
              text="If you have any questions about this Privacy Policy, please reach out via the Help & Support page."
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default Privacy;

/*  SMALL COMPONENT  */

function Section({ title, text }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-black mb-2">
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
