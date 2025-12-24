// src/utils/auth.js
import { fetchWithAuth } from "./fetchWithAuth";
// src/utils/auth.js

const API = "http://localhost:5000/api/auth";

/* ================= TOKEN ================= */
export const getToken = () => localStorage.getItem("token");
export const isLoggedIn = () => !!localStorage.getItem("token");

/* ================= LOGIN ================= */
export const loginUser = async (email, password) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
};

/* ================= GET PROFILE ================= */
export const getProfile = async () => {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  return await res.json();
};

/* ================= LOGOUT ================= */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};


/* ================= UPDATE PROFILE ================= */

export const updateProfile = async (profileData) => {
  const res = await fetchWithAuth(
    "http://localhost:5000/api/auth/profile",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update failed");

  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

/* ================= CHANGE PASSWORD ================= */

export const changePassword = async ({ currentPassword, newPassword }) => {
  const res = await fetchWithAuth(
    "http://localhost:5000/api/auth/change-password",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Password change failed");

  return data;
};

/* ================= EMAIL CHANGE OTP ================= */

export const sendEmailOtp = async (newEmail) => {
  const res = await fetchWithAuth(
    "http://localhost:5000/api/auth/send-change-email-otp",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send OTP");

  return data;
};

export const verifyEmailOtp = async (newEmail, otp) => {
  const res = await fetchWithAuth(
    "http://localhost:5000/api/auth/verify-change-email-otp",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail, otp }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "OTP verification failed");

  return data;
};
