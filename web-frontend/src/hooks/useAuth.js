import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token"); // or cookie later
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id; // must match backend JWT payload
  } catch {
    return null;
  }
};
