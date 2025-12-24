import { getToken } from "./auth";

export const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
};
