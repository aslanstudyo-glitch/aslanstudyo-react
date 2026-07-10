import "./Instagram.css";

const instagramPosts = [
  {
    image: "/images/gallery/1.JPG",
    title: "Düğün Hikâyesi",
  },
  {
    image: "/images/gallery/2.jpg",
    title: "Dış Çekim",
  },
  {
    image: "/images/gallery/3.JPG",
    title: "Nişan Çekimi",
  },
  {
    image: "/images/gallery/4.JPG",
    title: "Özel Anlar",
  },
];

function Instagram() {
  return (
    <section className="instagram-section" id="instagram">
      <div className="section-title">
        <span>Sosyal Medya</span>
        <h2>Instagram’da Aslan Stüdyo</h2>
        <p>
          Düğün, nişan, kına, drone ve dış çekim çalışmalarımızdan en yeni
          kareleri keşfedin.
        </p>
      </div>

      <div className="instagram-grid">
        {instagramPosts.map((post, index) => (
          <a
            href="https://www.instagram.com/aslanstudyo"
            target="_blank"
            rel="noreferrer"
            className="instagram-card"
            key={post.image}
            aria-label={`${post.title} gönderisini Instagram'da görüntüle`}
          >
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
            />

            <div className="instagram-overlay">
              <span className="instagram-icon">📷</span>
              <strong>{post.title}</strong>
              <small>Gönderiyi Gör</small>
            </div>

            <div className="instagram-handle">
              @aslanstudyo
            </div>
          </a>
        ))}
      </div>

      <div className="instagram-button">
        <a
          href="https://www.instagram.com/aslanstudyo"
          target="_blank"
          rel="noreferrer"
          className="instagram-follow-button"
        >
          <span>📷</span>
          @aslanstudyo’yu Takip Et
        </a>
      </div>
    </section>
  );
}

export default Instagram;