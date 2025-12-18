// ================= LOGIN =================
export const loginUser = async (email, password) => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  // ✅ Save token
  localStorage.setItem("token", data.token);

  // ✅ Save user (structured)
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
    })
  );

  return data;
};

// ================= GET PROFILE =================
export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const res = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // ❌ token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Get profile error:", error);
    return null;
  }
};

// ================= LOGOUT =================
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// update profile
export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Update failed");
  }

  // update local user cache
  localStorage.setItem("user", JSON.stringify(data));

  return data;
};
export const changePassword = async (passwords) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/auth/change-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwords),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Password change failed");
  }

  return data;
};
const API = "http://localhost:5000/api/auth";

const getToken = () => localStorage.getItem("token");

export const sendEmailOtp = async (email) => {
  const res = await fetch(`${API}/send-email-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
};

export const verifyEmailOtp = async (email, otp) => {
  const res = await fetch(`${API}/verify-email-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
};
