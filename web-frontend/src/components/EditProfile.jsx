import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { updateProfile, getProfile, changePassword } from "../utils/auth";
import {
  sendEmailOtp,
  verifyEmailOtp
} from "../utils/auth";


function EditProfile() {
  // ================= PROFILE STATES =================
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  


  const [saving, setSaving] = useState(false);

  // ================= PASSWORD STATES =================
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changing, setChanging] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  //OTP STATES
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  
  const handleSendEmailOtp = async () => {
  try {
    await sendEmailOtp(email);
    setEmailOtpSent(true);
    alert("Email OTP sent");
  } catch (err) {
    alert(err.message);
  }
};

const handleVerifyEmailOtp = async () => {
  try {
    await verifyEmailOtp(email, emailOtp);
    setEmailVerified(true);
    setEmailOtpSent(false);
    alert("Email verified");
  } catch (err) {
    alert(err.message);
  }
};


  // ================= LOAD PROFILE =================
  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfile();
      if (!data) return;

      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
      setAvatar(data.avatar || "");
      setEmailVerified(data.isEmailVerified || false);
    };

    loadProfile();
  }, []);

  // ================= IMAGE PREVIEW =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
    setAvatar(previewUrl); // temporary (cloudinary later)
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    try {
      setSaving(true);

      await updateProfile({
        name,
        phone,
        address,
        avatar,
      });

      alert("Profile updated successfully");
    } catch (error) {
      alert(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("All password fields are required");
    }

    if (newPassword.length < 6) {
      return alert("New password must be at least 6 characters");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setChanging(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      alert("Password changed successfully. Please login again.");

      // 🔐 force logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";

    } catch (error) {
      alert(error.message);
    } finally {
      setChanging(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 backdrop-blur-lg px-6 sm:px-10 md:px-20 py-32">
        <div className="max-w-3xl mx-auto bg-gray-400/40 backdrop-blur-xl border border-gray-500/30 shadow-xl rounded-3xl p-10 md:p-14">

          <h1 className="text-4xl font-extrabold text-black text-center">
            Edit Profile
          </h1>
          <p className="text-gray-700 text-center mt-2">
            Update your personal information
          </p>

          <div className="mt-10 space-y-8">

            {/* AVATAR */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white">
                {image || avatar ? (
                  <img
                    src={image || avatar}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-black text-white flex items-center justify-center text-4xl font-bold">
                    {(name?.charAt(0) || "U").toUpperCase()}
                  </div>
                )}
              </div>

              <label className="px-6 py-2 rounded-xl cursor-pointer bg-black hover:bg-gray-800 text-white hover:text-[#C76A46] text-lg shadow-lg transition">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* NAME */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-5 py-3 rounded-xl bg-white/80 border border-gray-300 text-lg shadow-md"
            />

            {/* EMAIL */}
            <div className="space-y-3">
  <label className="font-semibold">Email</label>

  <div className="flex gap-3">
    <input
      type="email"
      value={email}
      disabled
      className="flex-1 px-4 py-3 rounded-xl bg-gray-200 border"
    />

    {!emailVerified && (
      <button
        onClick={handleSendEmailOtp}
        className="px-4 py-3 bg-black text-white rounded-xl"
      >
        Send OTP
      </button>
    )}
  </div>

  {emailOtpSent && (
    <div className="flex gap-3">
      <input
        type="text"
        maxLength={6}
        value={emailOtp}
        onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
        placeholder="Enter OTP"
        className="flex-1 px-4 py-3 rounded-xl border"
      />
      <button
        onClick={handleVerifyEmailOtp}
        className="px-4 py-3 bg-green-600 text-white rounded-xl"
      >
        Verify
      </button>
      </div>
    )}

    {emailVerified && (
      <p className="text-green-600 font-semibold">Email Verified ✓</p>
    )}
  </div>


            {/* PHONE */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter phone number"
                className="w-full px-5 py-3 rounded-xl bg-white/80 border border-gray-300 text-lg shadow-md"
              />
            </div>


            {/* ADDRESS */}
            <textarea
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full px-5 py-3 rounded-xl bg-white/80 border border-gray-300 text-lg shadow-md resize-none"
            />

            {/* CHANGE PASSWORD */}
            <div className="border-t border-gray-300 pt-8 mt-10 space-y-5">
              <h2 className="text-2xl font-extrabold text-center">
                Change Password
              </h2>

              <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/80 border shadow-md"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showCurrent ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>


              <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/80 border shadow-md"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showNew ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>


              <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/80 border shadow-md"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

              <button
                onClick={handleChangePassword}
                disabled={changing}
                className="w-full py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold shadow-lg disabled:opacity-50"
              >
                {changing ? "Updating Password..." : "Change Password"}
              </button>
            </div>

            {/* SAVE */}
            <div className="text-center pt-6">
              <button
                onClick={handleSave}
                disabled={saving || !emailVerified}
                className={`
                  px-14 py-4 rounded-2xl text-xl font-bold shadow-xl transition
                  ${emailVerified
                    ? "bg-black hover:bg-gray-800 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"}
                `}
              >
                {emailVerified ? (saving ? "Saving..." : "Save Changes") : "Verify Email to Save"}
              </button>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
