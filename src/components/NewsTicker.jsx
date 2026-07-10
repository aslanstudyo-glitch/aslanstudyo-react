import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./NewsTicker.css";

function NewsTicker() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const snapshot = await getDocs(collection(db, "announcements"));

        const list = snapshot.docs.map((announcementDoc) => ({
          id: announcementDoc.id,
          ...announcementDoc.data(),
        }));

        list.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;

          return bTime - aTime;
        });

        setAnnouncements(list.slice(0, 8));
      } catch (error) {
        console.error("Haber bandı yüklenemedi:", error);
      }
    };

    loadAnnouncements();
  }, []);

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="news-ticker">
      <div className="news-ticker-label">
        <span className="news-ticker-dot"></span>
        DUYURULAR
      </div>

      <div className="news-ticker-window">
        <div className="news-ticker-track">
          {[...announcements, ...announcements].map(
            (announcement, index) => (
              <span
                className="news-ticker-item"
                key={`${announcement.id}-${index}`}
              >
                {announcement.featured && "⭐ "}
                {announcement.title}
                <span className="news-ticker-separator">•</span>
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsTicker;