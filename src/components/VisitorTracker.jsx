import { useEffect } from "react";
import {
  onDisconnect,
  onValue,
  push,
  ref,
  remove,
  runTransaction,
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

function getLocalDateKey() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function VisitorTracker() {
  useEffect(() => {
    const visitorId = createVisitorId();
    const dateKey = getLocalDateKey();

    const connectedRef = ref(realtimeDb, ".info/connected");
    const visitorRef = ref(realtimeDb, `presence/${visitorId}`);

    const registerVisit = async () => {
      const sessionRecorded = sessionStorage.getItem(
        "aslanVisitRecorded"
      );

      if (sessionRecorded) {
        return;
      }

      try {
        const totalRef = ref(
          realtimeDb,
          "analytics/summary/totalVisits"
        );

        const todayRef = ref(
          realtimeDb,
          `analytics/daily/${dateKey}/visits`
        );

        const visitLogRef = push(
          ref(realtimeDb, "analytics/visitLogs")
        );

        await Promise.all([
          runTransaction(totalRef, (currentValue) => {
            return (currentValue || 0) + 1;
          }),

          runTransaction(todayRef, (currentValue) => {
            return (currentValue || 0) + 1;
          }),

          set(visitLogRef, {
            visitorId,
            page: window.location.pathname,
            visitedAt: serverTimestamp(),
          }),
        ]);

        sessionStorage.setItem("aslanVisitRecorded", "true");
      } catch (error) {
        console.error("Ziyaret kaydedilemedi:", error);
      }
    };

    const unsubscribe = onValue(
      connectedRef,
      async (snapshot) => {
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

          await registerVisit();
        } catch (error) {
          console.error(
            "Ziyaretçi takibi başlatılamadı:",
            error
          );
        }
      }
    );

    const updateCurrentPage = () => {
      set(visitorRef, {
        online: true,
        page: window.location.pathname,
        connectedAt: serverTimestamp(),
        lastSeen: serverTimestamp(),
      }).catch((error) => {
        console.error(
          "Ziyaretçi sayfası güncellenemedi:",
          error
        );
      });
    };

    window.addEventListener("popstate", updateCurrentPage);

    return () => {
      unsubscribe();
      window.removeEventListener(
        "popstate",
        updateCurrentPage
      );

      remove(visitorRef).catch(() => {
        // onDisconnect bağlantı kesildiğinde kaydı temizler.
      });
    };
  }, []);

  return null;
}

export default VisitorTracker;