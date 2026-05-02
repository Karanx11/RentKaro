import NavBar from "../../components/NavBar";
import { Mail } from "lucide-react";

function HelpSupport() {
  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

        {/* MESSAGE */}
        <div className="text-center mb-6 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Help & Support
          </h1>

          <p className="text-sm text-gray-600">
            If you have any query, please mail us at the email below.
            We will contact you as soon as possible.
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Thanks for using <b>RentKaro</b> 🙌
          </p>
        </div>

        {/* EMAIL CARD */}
        <SupportCard
          icon={<Mail size={22} />}
          title="Email Support"
          desc="Reach out to our support team."
          email="rentkaro.x11@gmail.com"
        />

      </div>
    </>
  );
}

export default HelpSupport;


/* SUPPORT CARD */

function SupportCard({ icon, title, desc, email }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md max-w-sm text-center">
      <div className="flex justify-center mb-2">{icon}</div>

      <h3 className="font-semibold">{title}</h3>

      <p className="text-sm text-gray-600 mb-2">{desc}</p>

      <a
        href={`mailto:${email}`}
        className="text-orange-500 font-medium underline"
      >
        {email}
      </a>
    </div>
  );
}