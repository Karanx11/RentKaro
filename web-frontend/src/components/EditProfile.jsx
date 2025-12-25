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
  const [name, setName] = useState("");      // 🔒 locked
  const [email, setEmail] = useState("");    // current email
  const [phone, setPhone] = useState("");    // 🔒 locked
  const [address, setAddress] = useState(""); // ✅ editable

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
      setAddress(data.address || "");
      setAvatar(data.avatar || "");
      setEmailVerified(data.isEmailVerified ?? true);
    };

    loadProfile();
  }, []);

  /* ================= EMAIL OTP ================= */
  const handleSendOtp = async () => {
    if (!newEmail) return alert("Enter new email");
    await sendEmailOtp(newEmail);
    setOtpSent(true);
    setEmailVerified(false);
    alert("OTP sent to new email");
  };

  const handleVerifyOtp = async () => {
    await verifyEmailOtp(newEmail, emailOtp);
    setEmail(newEmail);
    setNewEmail("");
    setEmailOtp("");
    setOtpSent(false);
    setEmailVerified(true);
    alert("Email verified successfully");
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile({ address });
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

    {/* PAGE BACKGROUND */}
    <div
      className="
        w-full min-h-screen
        bg-gray-500/10 backdrop-blur-lg
        px-4 sm:px-6 md:px-12
        pt-32 pb-20
        flex justify-center
      "
    >
      {/* GLASS CARD */}
      <div
        className="
          w-full max-w-4xl
          bg-gray-400/40
          border border-gray-500/30
          backdrop-blur-xl
          rounded-3xl
          p-8 sm:p-12
          shadow-[0_8px_32px_rgba(31,38,135,0.37)]
          space-y-10
        "
      >
        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-black text-center">
          Edit Profile
        </h1>

        {/* AVATAR */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
            {avatar ? (
              <img src={avatar} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-black text-white flex items-center justify-center text-4xl font-bold">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-700">
            Profile picture cannot be changed
          </p>
        </div>

        {/* NAME */}
        <div>
          <label className="font-semibold text-black">Name</label>
          <input
            value={name}
            disabled
            className="
              w-full mt-2 px-4 py-3
              rounded-xl
              bg-gray-300/70
              cursor-not-allowed
            "
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="font-semibold text-black">Phone Number</label>
          <input
            value={phone}
            disabled
            className="
              w-full mt-2 px-4 py-3
              rounded-xl
              bg-gray-300/70
              cursor-not-allowed
            "
          />
          <p className="text-sm text-gray-700 mt-1">
            Phone number cannot be changed
          </p>
        </div>

        {/* CURRENT EMAIL */}
        <div>
          <label className="font-semibold text-black">Current Email</label>
          <input
            value={email}
            disabled
            className="
              w-full mt-2 px-4 py-3
              rounded-xl
              bg-gray-300/70
            "
          />
          {emailVerified && (
            <p className="text-green-700 font-semibold mt-1">
              Email Verified ✓
            </p>
          )}
        </div>

        {/* CHANGE EMAIL */}
        <div className="space-y-3">
          <label className="font-semibold text-black">Change Email</label>

          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="New email"
            className="
              w-full px-4 py-3
              rounded-xl
              bg-white/70
              border border-gray-400
              outline-none
            "
          />

          {!otpSent && newEmail && (
            <button
              onClick={handleSendOtp}
              className="
                w-full bg-black
                text-white py-3
                rounded-xl
                font-semibold
                hover:bg-gray-800
              "
            >
              Send OTP
            </button>
          )}

          {otpSent && (
            <div className="flex gap-3">
              <input
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                placeholder="Enter OTP"
                className="
                  flex-1 px-4 py-3
                  rounded-xl
                  bg-white/70
                  border border-gray-400
                "
              />
              <button
                onClick={handleVerifyOtp}
                className="
                  bg-black text-white
                  px-6 rounded-xl
                  font-semibold
                  hover:bg-gray-800
                "
              >
                Verify
              </button>
            </div>
          )}
        </div>

        {/* ADDRESS */}
        <div>
          <label className="font-semibold text-black">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="
              w-full mt-2 px-4 py-3
              rounded-xl
              bg-white/70
              border border-gray-400
            "
          />
        </div>

        {/* CHANGE PASSWORD */}
        <div className="border-t border-gray-400/40 pt-8 space-y-4">
          <h2 className="text-2xl font-bold text-black text-center">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/70 border"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/70 border"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/70 border"
          />

          <button
            onClick={handleChangePassword}
            disabled={changing}
            className="
              w-full bg-black
              text-white py-3
              rounded-xl
              font-semibold
              hover:bg-gray-800
            "
          >
            {changing ? "Updating..." : "Change Password"}
          </button>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving || !emailVerified}
          className="
            w-full bg-black
            text-white py-4
            rounded-xl
            text-lg font-semibold
            hover:bg-gray-800
            disabled:opacity-50
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  </>
);
}

export default EditProfile;
