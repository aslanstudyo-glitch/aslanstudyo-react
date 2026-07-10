import "./YouTube.css";

const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@AslanStudyo";

const UPLOADS_PLAYLIST_ID =
  "UUbiX2xxbEZFrgju40txXp7w";

function YouTube() {
  return (
    <section className="youtube-section" id="youtube">
      <div className="section-title">
        <span>Aslan TV</span>
        <h2>YouTube Videolarımız</h2>

        <p>
          Drone çekimleri, Nevşehir manzaraları, düğün
          filmleri ve özel çalışmalarımızı izleyin.
        </p>
      </div>

      <div className="youtube-container">
        <div className="youtube-player">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`}
            title="Aslan Stüdyo YouTube Videoları"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="youtube-info">
          <span className="youtube-live-badge">
            ▶ ASLAN TV
          </span>

          <h3>Aslan Stüdyo YouTube Kanalı</h3>

          <p>
            Kapadokya, Nevşehir, drone çekimleri, düğün
            videoları ve bölgeden özel görüntüler kanalımızda.
          </p>

          <div className="youtube-features">
            <span>🎥 Profesyonel Çekimler</span>
            <span>🚁 Drone Videoları</span>
            <span>📍 Nevşehir ve Kapadokya</span>
          </div>

          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="youtube-channel-button"
          >
            <span>▶</span>
            YouTube Kanalına Git
          </a>
        </div>
      </div>
    </section>
  );
}

export default YouTube;