import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

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

        setAnnouncements(list);
      } catch (error) {
        console.error("Duyurular yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "";

    return new Date(timestamp.seconds * 1000).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (!loading && announcements.length === 0) {
    return null;
  }

  return (
    <section className="announcements-section" id="announcements">
      <div className="section-title">
        <span>Güncel</span>
        <h2>Duyurular ve Kampanyalar</h2>
        <p>Aslan Stüdyo’dan güncel kampanya, hizmet ve yenilikler.</p>
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>Duyurular yükleniyor...</p>
      )}

      <div className="announcements-grid">
        {announcements.map((announcement) => (
          <article
            key={announcement.id}
            className={`announcement-card ${
              announcement.featured ? "featured" : ""
            }`}
          >
            <div className="announcement-image">
              <img
                src={announcement.imageUrl}
                alt={announcement.title}
              />

              <div className="announcement-overlay">
                {announcement.featured && (
                  <span className="announcement-badge">
                    ⭐ Öne Çıkan
                  </span>
                )}
              </div>
            </div>

            <div className="announcement-content">
              <h3>{announcement.title}</h3>

              <p>{announcement.description}</p>

              <div className="announcement-footer">
                <span>
                  📅 {formatDate(announcement.createdAt)}
                </span>

                <button
                  type="button"
                  className="announcement-btn"
                >
                  Devamını Oku →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Announcements;