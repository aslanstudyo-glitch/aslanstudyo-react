import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "videos"));

        const videoList = snapshot.docs.map((videoDoc) => ({
          id: videoDoc.id,
          ...videoDoc.data(),
        }));

        videoList.sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

        setVideos(videoList);
      } catch (error) {
        console.error("Videolar yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (!loading && videos.length === 0) {
    return null;
  }

  return (
    <section className="videos-section" id="videos">
      <div className="section-title">
        <span>Aslan Stüdyo</span>
        <h2>Videolar</h2>
        <p>En özel anlardan seçilmiş video çekimleri.</p>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Videolar yükleniyor...</p>}

      <div className="videos-grid">
        {videos.map((video) => (
          <article className="video-card" key={video.id}>
            <video
              src={video.videoUrl}
              controls
              preload="metadata"
              playsInline
            />

            <div className="video-card-content">
              <h3>{video.title || "Aslan Stüdyo Videosu"}</h3>
              <p>{video.category || "Genel"}</p>

              {video.featured && (
                <span className="video-featured">⭐ Öne Çıkan Video</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Videos;