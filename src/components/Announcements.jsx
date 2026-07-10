import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./Announcements.css";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

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

  useEffect(() => {
    document.body.style.overflow = selectedAnnouncement ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedAnnouncement]);

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
                loading="lazy"
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
                <span>📅 {formatDate(announcement.createdAt)}</span>
              </div>

              <button
                type="button"
                className="announcement-btn"
                onClick={() => setSelectedAnnouncement(announcement)}
              >
                Devamını Oku →
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedAnnouncement && (
        <div
          onClick={() => setSelectedAnnouncement(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            background: "rgba(0, 0, 0, 0.82)",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "min(900px, 100%)",
              maxHeight: "92vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedAnnouncement(null)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 2,
                width: "46px",
                height: "46px",
                border: "none",
                borderRadius: "50%",
                background: "#e30613",
                color: "#ffffff",
                fontSize: "28px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <img
              src={selectedAnnouncement.imageUrl}
              alt={selectedAnnouncement.title}
              style={{
                display: "block",
                width: "100%",
                maxHeight: "470px",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />

            <div style={{ padding: "30px" }}>
              {selectedAnnouncement.featured && (
                <span
                  style={{
                    display: "inline-block",
                    marginBottom: "14px",
                    padding: "8px 14px",
                    borderRadius: "30px",
                    background: "#e30613",
                    color: "#ffffff",
                    fontWeight: "700",
                  }}
                >
                  ⭐ Öne Çıkan Duyuru
                </span>
              )}

              <h2
                style={{
                  margin: "0 0 12px",
                  color: "#111111",
                  fontSize: "34px",
                }}
              >
                {selectedAnnouncement.title}
              </h2>

              <div
                style={{
                  marginBottom: "22px",
                  color: "#777777",
                }}
              >
                📅 {formatDate(selectedAnnouncement.createdAt)}
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#444444",
                  fontSize: "17px",
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedAnnouncement.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Announcements;