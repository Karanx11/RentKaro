import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io5";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const init = async () => {
      try {
        /* 🔔 MARK NOTIFICATIONS AS SEEN */
        await fetch(`${API_URL}/api/chat-request/buyer/seen`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        /* 📦 FETCH REQUESTS */
        const res = await fetch(
          `${API_URL}/api/chat-request/buyer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          setRequests([]);
        }
      } catch (err) {
        console.error("Failed to fetch requests", err);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [navigate, token]);

  /* ================= WHATSAPP CHAT ================= */
  const openWhatsApp = (phone, productTitle) => {
    if (!phone) {
      alert("Seller phone not available");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const message = encodeURIComponent(
      `Hi, your request for "${productTitle}" was accepted. Let's chat.`
    );

    window.open(
      `https://wa.me/91${cleanPhone}?text=${message}`,
      "_blank"
    );
  };

  if (loading) {
    return <p className="text-center mt-40">Loading...</p>;
  }

  return (
    <>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-500/10 px-6 md:px-20 py-32">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl font-extrabold mb-8">
            My Chat Requests
          </h1>

          {requests.length === 0 ? (
            <p className="text-gray-700">
              You have not sent any chat requests.
            </p>
          ) : (
            <div className="space-y-5">
              {requests.map((r) => (
                <div
                  key={r._id}
                  className="
                    bg-gray-400/40 backdrop-blur-xl
                    border border-gray-500/30
                    rounded-2xl p-6
                    shadow-lg
                    flex flex-col sm:flex-row
                    sm:items-center sm:justify-between
                    gap-4
                  "
                >
                  {/* LEFT */}
                  <div>
                    <p className="text-lg font-semibold">
                      {r.product?.title}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      Seller: {r.seller?.name}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-4">
                    {r.status === "pending" && (
                      <span className="px-4 py-2 rounded-full bg-yellow-200 text-yellow-800 font-semibold text-sm">
                        Pending
                      </span>
                    )}

                    {r.status === "accepted" && (
                      <>
                        <span className="px-4 py-2 rounded-full bg-green-200 text-green-800 font-semibold text-sm">
                          Accepted
                        </span>

                        {r.whatsappAllowed && (
                          <button
                            onClick={() =>
                              openWhatsApp(
                                r.seller?.phone,
                                r.product?.title
                              )
                            }
                            className="
                              flex items-center gap-2
                              bg-green-600 hover:bg-green-700
                              text-white px-4 py-2
                              rounded-xl font-semibold
                            "
                          >
                            <IoLogoWhatsapp className="text-xl" />
                            Chat on WhatsApp
                          </button>
                        )}
                      </>
                    )}

                    {r.status === "rejected" && (
                      <span className="px-4 py-2 rounded-full bg-red-200 text-red-800 font-semibold text-sm">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default MyRequests;
