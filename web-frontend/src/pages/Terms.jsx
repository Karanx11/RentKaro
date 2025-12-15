import NavBar from "../components/NavBar";

function Terms() {
  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 sm:px-10 md:px-20 py-32">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* PAGE HEADER */}
          <div>
            <h1 className="text-4xl font-extrabold text-black mb-2">
              Terms & Conditions
            </h1>
            <p className="text-gray-700">
              Please read these terms carefully before using RentSellKaro.
            </p>
          </div>

          {/* TERMS CARD */}
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
              title="1. Acceptance of Terms"
              text="By accessing or using RentSellKaro, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform."
            />

            <Section
              title="2. User Eligibility"
              text="You must be at least 18 years old to create an account or list products on RentSellKaro. You are responsible for maintaining the confidentiality of your account."
            />

            <Section
              title="3. Listings & Transactions"
              text="RentSellKaro acts as a marketplace platform. We do not own, rent, or sell products listed by users. All transactions are solely between users."
            />

            <Section
              title="4. Payments & Pricing"
              text="Pricing is set by users. RentSellKaro is not responsible for payment disputes, refunds, or damages arising from transactions."
            />

            <Section
              title="5. User Responsibilities"
              text="Users must ensure that listed products are legal, accurately described, and safe to use. Any misuse or fraudulent activity may result in account suspension."
            />

            <Section
              title="6. Prohibited Activities"
              text="Users may not list illegal items, post misleading information, or engage in activities that violate applicable laws or regulations."
            />

            <Section
              title="7. Limitation of Liability"
              text="RentSellKaro shall not be liable for any direct, indirect, incidental, or consequential damages resulting from use of the platform."
            />

            <Section
              title="8. Termination"
              text="We reserve the right to suspend or terminate accounts that violate these terms without prior notice."
            />

            <Section
              title="9. Changes to Terms"
              text="RentSellKaro may update these Terms & Conditions at any time. Continued use of the platform indicates acceptance of the updated terms."
            />

            <Section
              title="10. Contact Information"
              text="For questions regarding these terms, please contact us via the Help & Support page."
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default Terms;

/* ================= SMALL COMPONENT ================= */

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
