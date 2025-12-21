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

  // ✅ store access token
  localStorage.setItem("token", data.token);

  // ✅ store user
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
};

/* ================= GET PROFILE ================= */
export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Profile fetch failed:", data.message);
      return null; // ❌ DO NOT logout here
    }

    return data;
  } catch (err) {
    console.error("Profile error:", err);
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
