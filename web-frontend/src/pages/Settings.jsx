import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  User,
  Lock,
  HelpCircle,
  FileText,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(false);
    navigate("/login");
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 sm:px-10 md:px-20 py-32">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* PAGE TITLE */}
          <div>
            <h1 className="text-4xl font-extrabold text-black mb-2">
              Settings
            </h1>
            <p className="text-gray-700">
              Manage your account, privacy and preferences.
            </p>
          </div>

          {/* ACCOUNT SECTION */}
          <div className="space-y-5">
            <SectionTitle title="Account" />

            <SettingCard
              icon={<User size={26} />}
              label="Edit Profile"
              onClick={() => navigate("/editprofile")}
            />

            <SettingCard
              icon={<Lock size={26} />}
              label="Change Password"
              onClick={() => navigate("/forgot")}
            />
          </div>

          {/* SUPPORT SECTION */}
          <div className="space-y-5">
            <SectionTitle title="Support" />

            <SettingCard
              icon={<HelpCircle size={26} />}
              label="Help & Support"
              onClick={() => navigate("/help-support")}
            />


            <SettingCard
              icon={<FileText size={26} />}
              label="Terms & Conditions"
              onClick={() => navigate("/Terms")}
            />

            <SettingCard
              icon={<ShieldCheck size={26} />}
              label="Privacy Policy"
              onClick={() => navigate("/Privacy")}
            />
          </div>

          {/* LOGOUT */}
          <div className="flex justify-center pt-8">
            <button
              onClick={() => setShowLogout(true)}
              className="
                flex items-center gap-3
                bg-black hover:bg-gray-800
                text-white hover:text-[#C76A46]
                px-12 py-4 rounded-full
                text-lg font-semibold shadow-lg
              "
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/60 backdrop-blur-sm
            flex items-center justify-center
          "
        >
          <div
            className="
              bg-gray-400/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-2xl p-7
              w-[90%] max-w-sm
              shadow-[0_8px_32px_rgba(31,38,135,0.37)]
              text-center
              animate-fadeIn
            "
          >
            {/* ICON */}
            <LogOut size={38} className="mx-auto text-[#C76A46]" />

            <h2 className="text-xl font-bold text-black mt-4">
              Logout
            </h2>

            <p className="text-gray-700 mt-2">
              Are you sure you want to logout?
            </p>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-7">
              {/* CANCEL */}
              <button
                onClick={() => setShowLogout(false)}
                className="
                  flex-1 py-3 rounded-xl
                  bg-white/80 hover:bg-white
                  border border-gray-400
                  font-semibold text-gray-800
                  transition
                "
              >
                Cancel
              </button>

              {/* CONFIRM LOGOUT */}
              <button
                onClick={handleLogout}
                className="
                  flex-1 py-3 rounded-xl
                  bg-black hover:bg-gray-800
                  text-white hover:text-[#C76A46]
                  font-semibold
                  transition
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

/*  SMALL COMPONENTS  */

function SectionTitle({ title }) {
  return (
    <h3 className="text-gray-800 text-sm font-bold uppercase tracking-wide">
      {title}
    </h3>
  );
}

function SettingCard({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full flex items-center gap-5
        px-7 py-6
        bg-gray-400/40 backdrop-blur-xl
        border border-gray-500/30
        rounded-2xl shadow-lg
        hover:bg-white/40 transition
        text-left
      "
    >
      <span className="text-gray-700">{icon}</span>

      <span className="flex-1 text-lg font-semibold text-gray-900">
        {label}
      </span>

      <ChevronRight size={22} className="text-gray-500" />
    </button>
  );
}
