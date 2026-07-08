const instagramPosts = [
  "/images/gallery/1.JPG",
  "/images/gallery/2.jpg",
  "/images/gallery/3.JPG",
  "/images/gallery/4.JPG",
];

function Instagram() {
  return (
    <section className="instagram-section" id="instagram">
      <div className="section-title">
        <span>Sosyal Medya</span>
        <h2>📷 Bizi Instagram'da Takip Edin</h2>
        <p>
          📸 Düğün, nişan, kına gecesi, drone ve dış çekim çalışmalarımızın
          en yeni karelerini görmek için bizi Instagram'da takip edin.
        </p>
      </div>

      <div className="instagram-grid">
        {instagramPosts.map((post, index) => (
          <a
            href="https://www.instagram.com/aslanstudyo"
            target="_blank"
            rel="noreferrer"
            className="instagram-card"
            key={index}
          >
            <img src={post} alt={`Instagram ${index + 1}`} />
            <div className="instagram-overlay">
              <span>@aslanstudyo</span>
            </div>
          </a>
        ))}
      </div>

      <div className="instagram-button">
        <a
          href="https://www.instagram.com/aslanstudyo"
          target="_blank"
          rel="noreferrer"
          className="btn instagram-btn"
        >
          📷 @aslanstudyo'yu Takip Et
        </a>
      </div>
    </section>
  );
}

export default Instagram;