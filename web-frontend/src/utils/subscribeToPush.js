import api from "../services/api";
import { urlBase64ToUint8Array } from "./push";
import { getUserIdFromToken } from "../hooks/useAuth";

export const subscribeToPush = async () => {
  try {
    if (!("serviceWorker" in navigator)) return;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        import.meta.env.VITE_VAPID_PUBLIC_KEY
      ),
    });

    const userId = getUserIdFromToken();

    await api.post("/notifications/subscribe", {
      userId,
      subscription,
    });

    console.log("✅ Push notifications enabled");
  } catch (error) {
    console.error("Push subscription failed", error);
  }
};
