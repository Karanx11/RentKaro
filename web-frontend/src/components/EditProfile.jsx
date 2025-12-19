import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  updateProfile,
  getProfile,
  changePassword,
  sendEmailOtp,
  verifyEmailOtp,
} from "../utils/auth";

function EditProfile() {
  /* ================= BASIC PROFILE ================= */
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // current email
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [saving, setSaving] = useState(false);

  /* ================= NEW EMAIL + OTP ================= */
  const [newEmail, setNewEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true); // true for current email

  /* ================= PASSWORD ================= */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changing, setChanging] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImage(preview);
    setAvatar(preview);
  };

  /* ================= SEND OTP (NEW EMAIL) ================= */
  const handleSendOtp = async () => {
    if (!newEmail) return alert("Enter new email");

    try {
      await sendEmailOtp(newEmail);
      setOtpSent(true);
      setEmailVerified(false);
      alert("OTP sent to new email");
    } catch (err) {
      alert(err.message || "Failed to send OTP");
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    if (!emailOtp) return alert("Enter OTP");

    try {
      await verifyEmailOtp(newEmail, emailOtp);

      setEmail(newEmail); // update current email
      setNewEmail("");
      setEmailOtp("");
      setOtpSent(false);
      setEmailVerified(true);

      alert("New email verified successfully");
    } catch (err) {
      alert(err.message || "Invalid OTP");
    }
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      setSaving(true);

      await updateProfile({
        name,
        email,
        phone,
        address,
        avatar,
      });

      alert("Profile updated successfully");
    } catch (err) {
      alert(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword)
      return alert("All fields required");

    if (newPassword.length < 6)
      return alert("Password must be at least 6 characters");

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

      <div className="min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 py-32">
        <div className="max-w-3xl mx-auto bg-gray-400/40 border border-gray-500/30 rounded-3xl p-10 shadow-xl space-y-8">

          <h1 className="text-4xl font-extrabold text-center">Edit Profile</h1>

          {/* AVATAR */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {image || avatar ? (
                <img src={image || avatar} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-black text-white flex items-center justify-center text-4xl">
                  {name?.charAt(0)}
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-black text-white px-5 py-2 rounded-xl">
              Change Photo
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          </div>

          {/* NAME */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl"
          />

          {/* CURRENT EMAIL */}
          <div>
            <label className="font-semibold">Current Email</label>
            <input
              value={email}
              disabled
              className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-200"
            />
          </div>

          {/* NEW EMAIL */}
          <div className="space-y-3">
            <label className="font-semibold">New Email</label>

            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
              className="w-full px-4 py-3 rounded-xl"
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
                  onChange={(e) =>
                    setEmailOtp(e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={6}
                  placeholder="Enter OTP"
                  className="flex-1 px-4 py-3 rounded-xl"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="bg-green-600 text-white px-6 rounded-xl"
                >
                  Verify
                </button>
              </div>
            )}

            {emailVerified && (
              <p className="text-green-600 font-semibold">
                Email Verified ✓
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="border-t pt-8 space-y-4">
            <h2 className="text-2xl font-bold text-center">Change Password</h2>

            {[
              [currentPassword, setCurrentPassword, showCurrent, setShowCurrent, "Current Password"],
              [newPassword, setNewPassword, showNew, setShowNew, "New Password"],
              [confirmPassword, setConfirmPassword, showConfirm, setShowConfirm, "Confirm Password"],
            ].map(([val, setVal, show, setShow, label], i) => (
              <div key={i} className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  placeholder={label}
                  className="w-full px-4 py-3 rounded-xl border"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {show ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            ))}

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
            className={`w-full py-3 rounded-xl text-lg font-semibold ${
              emailVerified
                ? "bg-black text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            {emailVerified ? "Save Changes" : "Verify Email to Save"}
          </button>

        </div>
      </div>
    </>
  );
}

export default EditProfile;
