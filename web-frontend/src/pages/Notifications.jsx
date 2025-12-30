import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH ================= */
  const fetchNotifications = async () => {
    if (!token) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/chat-request/buyer`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setNotifications([]);
        return;
      }

      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch notifications failed", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================= CLEAR (HARD CLEAR) ================= */
  const clearNotifications = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/chat-request/buyer/seen`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        alert("Failed to clear notifications");
        return;
      }

      // ✅ HARD CLEAR UI
      setNotifications([]);
      setShowConfirm(false);
    } catch (err) {
      console.error("Clear failed", err);
    }
  };

  return (
    <>
      <NavBar />

      <div className="pt-32 px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>

          {notifications.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-sm text-red-600 underline"
            >
              Clear All
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className="p-4 mb-3 rounded-xl border bg-white"
            >
              <p className="font-semibold">
                {n.product?.title || "Product"}
              </p>
              <p className="text-sm">
                Status: <b>{n.status}</b>
              </p>
            </div>
          ))
        )}
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-bold mb-3">
              Clear notifications?
            </h2>
            <p className="text-sm mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={clearNotifications}
                className="flex-1 py-2 bg-red-600 text-white rounded"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notifications;
