export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // redirect
  window.location.href = "/login";
};
