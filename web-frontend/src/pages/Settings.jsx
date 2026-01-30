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
import { logout as logoutUtil } from "../utils/auth";

export default function Settings() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logoutUtil();
    setShowLogout(false);
    navigate("/login");
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-4 sm:px-8 md:px-12 py-24">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* PAGE TITLE */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
              Settings
            </h1>
            <p className="text-sm text-gray-700">
              Manage your account, privacy and preferences.
            </p>
          </div>

          {/* ACCOUNT SECTION */}
          <div className="space-y-4">
            <SectionTitle title="Account" />

            <SettingCard
              icon={<User size={20} />}
              label="Edit Profile"
              onClick={() => navigate("/editprofile")}
            />

            <SettingCard
              icon={<Lock size={20} />}
              label="Change Password"
              onClick={() => navigate("/forgot")}
            />
          </div>

          {/* SUPPORT SECTION */}
          <div className="space-y-4">
            <SectionTitle title="Support" />

            <SettingCard
              icon={<HelpCircle size={20} />}
              label="Help & Support"
              onClick={() => navigate("/help-support")}
            />

            <SettingCard
              icon={<FileText size={20} />}
              label="Terms & Conditions"
              onClick={() => navigate("/Terms")}
            />

            <SettingCard
              icon={<ShieldCheck size={20} />}
              label="Privacy Policy"
              onClick={() => navigate("/Privacy")}
            />
          </div>

          {/* LOGOUT */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowLogout(true)}
              className="
                flex items-center gap-2
                bg-black hover:bg-gray-800
                text-white hover:text-[#C76A46]
                px-8 py-2.5 rounded-xl
                text-sm font-semibold shadow-md
              "
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div
            className="
              bg-gray-300/40 backdrop-blur-xl
              border border-gray-500/30
              rounded-xl p-6
              w-[90%] max-w-xs
              shadow-xl
              text-center
            "
          >
            <LogOut size={30} className="mx-auto text-[#C76A46]" />

            <h2 className="text-lg font-bold text-black mt-3">
              Logout
            </h2>

            <p className="text-sm text-gray-700 mt-1">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogout(false)}
                className="
                  flex-1 py-2 rounded-lg
                  bg-white/80 hover:bg-white
                  border border-gray-400
                  text-sm font-semibold text-gray-800
                "
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="
                  flex-1 py-2 rounded-lg
                  bg-black hover:bg-gray-800
                  text-white hover:text-[#C76A46]
                  text-sm font-semibold
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

/* SMALL COMPONENTS */

function SectionTitle({ title }) {
  return (
    <h3 className="text-gray-800 text-xs font-bold uppercase tracking-wide">
      {title}
    </h3>
  );
}

function SettingCard({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full flex items-center gap-4
        px-5 py-4
        bg-gray-400/40 backdrop-blur-xl
        border border-gray-500/30
        rounded-xl shadow-sm
        hover:bg-white/40 transition
        text-left
      "
    >
      <span className="text-gray-700">{icon}</span>

      <span className="flex-1 text-sm font-semibold text-gray-900">
        {label}
      </span>

      <ChevronRight size={18} className="text-gray-500" />
    </button>
  );
}
