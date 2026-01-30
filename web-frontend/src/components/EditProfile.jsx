import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import {
  updateProfile,
  getProfile,
  changePassword,
  sendEmailOtp,
  verifyEmailOtp,
} from "../utils/auth";

function EditProfile() {
  /* ================= PROFILE ================= */
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [saving, setSaving] = useState(false);

  /* ================= EMAIL OTP ================= */
  const [newEmail, setNewEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);

  /* ================= PASSWORD ================= */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changing, setChanging] = useState(false);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfile();
      if (!data) return;

      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setAvatar(data.avatar || "");
      setEmailVerified(data.isEmailVerified ?? true);
    };

    loadProfile();
  }, []);

  /* ================= EMAIL OTP ================= */
  const handleSendOtp = async () => {
    if (!newEmail) return alert("Enter new email");

    if (newEmail === email) {
      return alert("This is already your current email");
    }

    try {
      await sendEmailOtp(newEmail);

      setOtpSent(true);
      setEmailVerified(false);
      alert("OTP sent to new email");
    } catch (err) {
      // ✅ HANDLE EMAIL ALREADY EXISTS
      const message =
        err?.message ||
        err?.response?.data?.message ||
        "Failed to send OTP";

      if (
        message.toLowerCase().includes("already") ||
        message.toLowerCase().includes("exists")
      ) {
        alert("Email already registered");
      } else {
        alert(message);
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!emailOtp) return alert("Enter OTP");

    try {
      await verifyEmailOtp(newEmail, emailOtp);

      setEmail(newEmail);
      setNewEmail("");
      setEmailOtp("");
      setOtpSent(false);
      setEmailVerified(true);

      alert("Email verified successfully");
    } catch (err) {
      alert(err.message || "Invalid OTP");
    }
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile({});
      alert("Profile updated");
    } catch (err) {
      alert(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword)
      return alert("All fields required");

    if (newPassword !== confirmPassword)
      return alert("Passwords do not match");

    try {
      setChanging(true);
      await changePassword({ currentPassword, newPassword });
      alert("Password changed. Login again.");
      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      alert(err.message || "Password change failed");
    } finally {
      setChanging(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-4 pt-24 pb-16 flex justify-center">
        <div className="w-full max-w-3xl bg-gray-400/40 border border-gray-500/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg">
          <h1 className="text-2xl font-bold text-black text-center">
            Edit Profile
          </h1>

          {/* AVATAR */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-black text-white flex items-center justify-center text-xl font-semibold">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-700">
              Profile picture cannot be changed
            </p>
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm font-semibold text-black">Name</label>
            <input
              value={name}
              disabled
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-gray-300/70 text-sm cursor-not-allowed"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-semibold text-black">Phone</label>
            <input
              value={phone}
              disabled
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-gray-300/70 text-sm cursor-not-allowed"
            />
            <p className="text-xs text-gray-700 mt-1">
              Phone number cannot be changed
            </p>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-black">Email</label>
            <input
              value={email}
              disabled
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-gray-300/70 text-sm"
            />
            {emailVerified && (
              <p className="text-green-700 text-sm mt-1 font-medium">
                Email Verified ✓
              </p>
            )}
          </div>

          {/* CHANGE EMAIL */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">
              Change Email
            </label>

            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="New email"
              className="w-full px-3 py-2.5 rounded-lg bg-white/70 border text-sm"
            />

            {!otpSent && newEmail && (
              <button
                onClick={handleSendOtp}
                className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium"
              >
                Send OTP
              </button>
            )}

            {otpSent && (
              <div className="flex gap-2">
                <input
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="OTP"
                  className="flex-1 px-3 py-2.5 rounded-lg bg-white/70 border text-sm"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="bg-black text-white px-4 rounded-lg text-sm font-medium"
                >
                  Verify
                </button>
              </div>
            )}
          </div>

          {/* PASSWORD */}
          <div className="border-t border-gray-400/40 pt-6 space-y-3">
            <h2 className="text-lg font-semibold text-black text-center">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-white/70 border text-sm"
            />

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-white/70 border text-sm"
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-white/70 border text-sm"
            />

            <button
              onClick={handleChangePassword}
              disabled={changing}
              className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium"
            >
              {changing ? "Updating..." : "Change Password"}
            </button>
          </div>

          {/* SAVE */}
          <button
            onClick={handleSave}
            disabled={saving || !emailVerified}
            className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
