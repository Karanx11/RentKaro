import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/auth/me");

        setIsAuth(true);
        setUser(res.data);

      } catch (err) {
        // 🔥 FULL CLEAN (IMPORTANT)
        localStorage.clear();

        setIsAuth(false);
        setUser(null);

      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  /* ================= NOT AUTH ================= */

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  /* ================= PROFILE INCOMPLETE ================= */

  if (user && (!user.phone || user.phone.trim() === "")) {
    return <Navigate to="/complete-profile" replace />;
  }

  /* ================= AUTHORIZED ================= */

  return children;
};

export default ProtectedRoute;