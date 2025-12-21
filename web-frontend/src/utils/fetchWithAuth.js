import { getAccessToken, setAccessToken } from "./auth";

export const fetchWithAuth = async (url, options = {}) => {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  // 🔁 Access token expired
  if (res.status === 401) {
    const refreshRes = await fetch(
      "http://localhost:5000/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include", // IMPORTANT
      }
    );

    if (!refreshRes.ok) {
      window.location.href = "/login";
      return;
    }

    const data = await refreshRes.json();
    setAccessToken(data.accessToken);

    // 🔄 retry original request
    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
  }

  return res;
};
