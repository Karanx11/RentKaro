import api from "./api";

const setupInterceptors = () => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 🔴 If refresh token itself failed → STOP
      if (originalRequest.url.includes("/auth/refresh")) {
        localStorage.removeItem("token");
        return Promise.reject(error);
      }

      // 🔁 Try refresh ONLY ONCE
      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const res = await api.post("/api/auth/refresh");
          const newToken = res.data.accessToken;

          localStorage.setItem("token", newToken);

          originalRequest.headers.Authorization =
            `Bearer ${newToken}`;

          return api(originalRequest);
        } catch (err) {
          // ❌ Refresh failed → real logout
          localStorage.removeItem("token");
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
