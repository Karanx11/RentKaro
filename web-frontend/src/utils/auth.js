const API = "http://localhost:5000/api/auth";

/* ================= TOKEN HELPERS ================= */
export const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

/* ================= LOGIN ================= */
export const loginUser = async (email, password) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  // ✅ backend-safe storage
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
};

/* ================= GET PROFILE ================= */
export const getProfile = async () => {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API}/me`, {
      headers: authHeaders(),
    });

    if (!res.ok) {
      logout();
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Get profile error:", err);
    return null;
  }
};

/* ================= LOGOUT ================= */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (profileData) => {
  const res = await fetch(`${API}/profile`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(profileData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update failed");

  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

/* ================= CHANGE PASSWORD ================= */
export const changePassword = async ({ currentPassword, newPassword }) => {
  const res = await fetch(`${API}/change-password`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Password change failed");

  return data;
};

/* ================= SEND NEW EMAIL OTP ================= */
export const sendEmailOtp = async (newEmail) => {
  const res = await fetch(`${API}/send-change-email-otp`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ newEmail }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send OTP");

  return data;
};

/* ================= VERIFY NEW EMAIL OTP ================= */
export const verifyEmailOtp = async (newEmail, otp) => {
  const res = await fetch(`${API}/verify-change-email-otp`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ newEmail, otp }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "OTP verification failed");

  return data;
};
