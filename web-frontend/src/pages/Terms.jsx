import NavBar from "../components/NavBar";

function Terms() {
  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-4 sm:px-8 md:px-12 py-24">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-700">
              Last Updated: February 2026
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Please read these Terms & Conditions carefully before using RentSellKaro.
              By accessing or using our platform, you agree to comply with these terms.
            </p>
          </div>

          {/* TERMS CARD */}
          <div
            className="
              rounded-2xl
              bg-gray-400/40
              border border-gray-500/30
              shadow-xl
              p-8
              space-y-6
              max-h-[70vh]
              overflow-y-auto
            "
          >
            <Section
              title="1. Acceptance of Terms"
              text="By accessing or using RentSellKaro, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use immediately."
            />

            <Section
              title="2. User Eligibility"
              text="Users must be at least 18 years old to register or list products. By using this platform, you confirm that you meet this requirement."
            />

            <Section
              title="3. Account Security"
              text="You are responsible for maintaining the confidentiality of your account credentials. RentSellKaro is not liable for unauthorized access resulting from your failure to secure your account."
            />

            <Section
              title="4. Listings & Marketplace Role"
              text="RentSellKaro operates as a marketplace platform. We do not own, inspect, or guarantee the items listed. All transactions occur directly between users."
            />

            <Section
              title="5. Pricing & Payments"
              text="Pricing is determined by users. RentSellKaro is not responsible for disputes, refunds, failed payments, or damages arising from transactions."
            />

            <Section
              title="6. User Responsibilities"
              text="Users must ensure that products listed are legal, accurately described, and safe to use. Misuse, fraud, or false listings may result in suspension or termination."
            />

            <Section
              title="7. Prohibited Activities"
              text="Users may not list illegal items, post misleading information, violate intellectual property rights, or engage in unlawful activities."
            />

            <Section
              title="8. Cancellation & Refund Policy"
              text="Refunds and cancellations are subject to agreement between buyer and seller. RentSellKaro does not guarantee refunds unless explicitly stated."
            />

            <Section
              title="9. Intellectual Property"
              text="All platform design, branding, logos, and content are the property of RentSellKaro. Unauthorized reproduction or misuse is strictly prohibited."
            />

            <Section
              title="10. Limitation of Liability"
              text="RentSellKaro shall not be liable for any direct, indirect, incidental, or consequential damages resulting from platform use."
            />

            <Section
              title="11. Indemnification"
              text="Users agree to indemnify and hold harmless RentSellKaro against any claims, damages, or legal disputes arising from misuse of the platform."
            />

            <Section
              title="12. Platform Availability"
              text="We strive to ensure uninterrupted service. However, RentSellKaro may suspend or modify services for maintenance, updates, or technical reasons."
            />

            <Section
              title="13. Third-Party Links"
              text="Our platform may contain links to third-party websites. RentSellKaro is not responsible for the content or policies of external sites."
            />

            <Section
              title="14. Privacy Policy"
              text="Your use of RentSellKaro is also governed by our Privacy Policy, which explains how we collect, use, and protect your information."
            />

            <Section
              title="15. Termination"
              text="We reserve the right to suspend or terminate accounts that violate these Terms & Conditions without prior notice."
            />

            <Section
              title="16. Governing Law"
              text="These Terms shall be governed by the laws of India. Any disputes shall fall under the jurisdiction of Indian courts."
            />

            <Section
              title="17. Changes to Terms"
              text="RentSellKaro may update these Terms & Conditions at any time. Continued use of the platform constitutes acceptance of the revised terms."
            />

            <Section
              title="18. Contact Information"
              text="For any questions regarding these Terms & Conditions, please contact us through the Help & Support section of the platform."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Terms;

/* ================= REUSABLE SECTION COMPONENT ================= */

function Section({ title, text }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-black mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-700 leading-relaxed">
        {text}
      </p>
    </div>
  );
}