import axios from "axios";

const api = axios.create({
  baseURL: "https://rentkaro-backend.onrender.com",
  withCredentials: true,
});

/* ================= REQUEST ================= */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= RESPONSE ================= */
let isRefreshing = false;
let hasShownSessionExpired = false; // 🔥 prevent multiple alerts

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // ❌ If refresh itself fails → logout immediately
    if (originalRequest?.url?.includes("/auth/refresh")) {
      if (!hasShownSessionExpired) {
        alert("Session expired. Please login again");
        hasShownSessionExpired = true;
      }

      localStorage.clear();

      if (window.location.hash !== "#/login") {
        window.location.href = "/#/login";
      }

      return Promise.reject(err);
    }

    // 🔁 Handle expired access token
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ❌ already refreshing → force logout (no loop)
      if (isRefreshing) {
        if (!hasShownSessionExpired) {
          alert("Session expired. Please login again");
          hasShownSessionExpired = true;
        }

        localStorage.clear();
        window.location.href = "/#/login";
        return Promise.reject(err);
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          "https://rentkaro-backend.onrender.com/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        localStorage.setItem("token", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);

      } catch (error) {
        // 🔥 FINAL LOGOUT
        if (!hasShownSessionExpired) {
          alert("Session expired. Please login again");
          hasShownSessionExpired = true;
        }

        localStorage.clear();

        if (window.location.hash !== "#/login") {
          window.location.href = "/#/login";
        }

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;