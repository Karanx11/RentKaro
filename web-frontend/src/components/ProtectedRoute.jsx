
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
  localStorage.removeItem("token"); 
  setIsAuth(false);
} finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking login...</p>
      </div>
    );
  }

  // ❌ Not logged in
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // 🚨 PROFILE NOT COMPLETE (KEY FIX)
  if (user && (!user.phone || user.phone.trim() === "")) {
    return <Navigate to="/complete-profile" replace />;
  }

  // ✅ All good
  return children;
};

export default ProtectedRoute;
