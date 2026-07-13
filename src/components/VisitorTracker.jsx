import { useEffect } from "react";
import {
  onDisconnect,
  onValue,
  ref,
  remove,
  serverTimestamp,
  set,
} from "firebase/database";
import { realtimeDb } from "../firebase";

function createVisitorId() {
  const existingId = sessionStorage.getItem("aslanVisitorId");

  if (existingId) {
    return existingId;
  }

  const newId =
    window.crypto?.randomUUID?.() ||
    `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  sessionStorage.setItem("aslanVisitorId", newId);

  return newId;
}

function VisitorTracker() {
  useEffect(() => {
    const visitorId = createVisitorId();

    const connectedRef = ref(realtimeDb, ".info/connected");
    const visitorRef = ref(
      realtimeDb,
      `presence/${visitorId}`
    );

    const unsubscribe = onValue(connectedRef, async (snapshot) => {
      if (snapshot.val() !== true) {
        return;
      }

      try {
        await onDisconnect(visitorRef).remove();

        await set(visitorRef, {
          online: true,
          page: window.location.pathname,
          connectedAt: serverTimestamp(),
          lastSeen: serverTimestamp(),
        });
      } catch (error) {
        console.error("Ziyaretçi takibi başlatılamadı:", error);
      }
    });

    const updateCurrentPage = () => {
      set(visitorRef, {
        online: true,
        page: window.location.pathname,
        connectedAt: serverTimestamp(),
        lastSeen: serverTimestamp(),
      }).catch((error) => {
        console.error("Ziyaretçi sayfası güncellenemedi:", error);
      });
    };

    window.addEventListener("popstate", updateCurrentPage);

    return () => {
      unsubscribe();
      window.removeEventListener("popstate", updateCurrentPage);

      remove(visitorRef).catch(() => {
        // Sekme kapanırken bağlantı kesilmiş olabilir.
        // onDisconnect kaydı yine temizleyecektir.
      });
    };
  }, []);

  return null;
}

export default VisitorTracker;