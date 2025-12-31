import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      // ✅ fetch ONLY accepted notifications
      const res = await fetch(
        `${API_URL}/api/chat-request/buyer/notifications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);

      // ✅ auto mark as seen (DB)
      await fetch(`${API_URL}/api/chat-request/buyer/seen`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    };

    load();
  }, [token]);

  const clearAll = () => {
    // UI clear ONLY (DB already cleared on load)
    setNotifications([]);
  };

  return (
    <>
      <NavBar />

      <div className="pt-32 px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>

          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-red-600 underline"
            >
              Clear All
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className="p-4 mb-3 rounded-xl border bg-white"
            >
              <p className="font-semibold">{n.product?.title}</p>
              <p className="text-sm text-green-600">
                Status: <b>Accepted</b>
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Notifications;
