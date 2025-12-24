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

      <div className="min-h-screen bg-black/5 px-6 py-32">
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl border rounded-3xl p-10 shadow-xl space-y-8">

          <h1 className="text-4xl font-extrabold text-center">
            Edit Profile
          </h1>

          {/* AVATAR (LOCKED) */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-black text-white flex items-center justify-center text-4xl">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Profile picture cannot be changed
            </p>
          </div>

          {/* NAME (LOCKED) */}
          <div>
            <label className="font-semibold">Name</label>
            <input
              value={name}
              disabled
              className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-200 cursor-not-allowed"
            />
          </div>
          
           {/* PHONE (LOCKED) */}
          <div>
            <label className="font-semibold">Phone Number</label>
            <input
              value={phone}
              disabled
              className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-200 cursor-not-allowed"
            />
            <p className="text-sm text-gray-600 mt-1">
              Phone number cannot be changed
            </p>
          </div>
          {/* EMAIL (LOCKED) */}
          <div>
            <label className="font-semibold">Current Email</label>
            <input
              value={email}
              disabled
              className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-200"
            />
            {emailVerified && (
              <p className="text-green-600 font-semibold">
                Email Verified ✓
              </p>
            )}
          </div>

         

          {/* EMAIL CHANGE */}
          <div className="space-y-3">
            <label className="font-semibold">Change Email</label>

            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="New email"
              className="w-full px-4 py-3 rounded-xl border"
            />

            {!otpSent && newEmail && (
              <button
                onClick={handleSendOtp}
                className="w-full bg-black text-white py-3 rounded-xl"
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
                  className="flex-1 px-4 py-3 rounded-xl border"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="bg-green-600 text-white px-6 rounded-xl"
                >
                  Verify
                </button>
              </div>
            )}

            
          </div>

          {/* ADDRESS */}
          <div>
            <label className="font-semibold">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full mt-1 px-4 py-3 rounded-xl border"
            />
          </div>

          {/* PASSWORD */}
          <div className="border-t pt-8 space-y-4">
            <h2 className="text-2xl font-bold text-center">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border"
            />

            <button
              onClick={handleChangePassword}
              disabled={changing}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              {changing ? "Updating..." : "Change Password"}
            </button>
          </div>

          {/* SAVE */}
          <button
            onClick={handleSave}
            disabled={saving || !emailVerified}
            className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold"
          >
            Save Changes
          </button>

        </div>
      </div>
    </>
  );
}

export default EditProfile;
