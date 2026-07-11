import { useEffect, useState } from "react";
import "./Instagram.css";

const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/aslanstudyo";

function Instagram() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInstagramPosts = async () => {
      try {
        const response = await fetch("/api/instagram");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Instagram paylaşımları alınamadı."
          );
        }

        setPosts(data.posts || []);
      } catch (requestError) {
        console.error("Instagram yükleme hatası:", requestError);
        setError("Instagram paylaşımları şu anda yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    loadInstagramPosts();
  }, []);

  const getPostImage = (post) => {
    if (post.media_type === "VIDEO") {
      return post.thumbnail_url || post.media_url;
    }

    return post.media_url;
  };

  const getPostTitle = (post) => {
    if (!post.caption) {
      return "Aslan Stüdyo Instagram paylaşımı";
    }

    return post.caption.length > 80
      ? `${post.caption.slice(0, 80)}...`
      : post.caption;
  };

  return (
    <section className="instagram-section" id="instagram">
      <div className="section-title">
        <span>Sosyal Medya</span>

        <h2>Instagram’da Aslan Stüdyo</h2>

        <p>
          En yeni düğün, nişan, drone ve dış çekim
          çalışmalarımızı keşfedin.
        </p>
      </div>

      {loading && (
        <div className="instagram-status">
          Instagram paylaşımları yükleniyor...
        </div>
      )}

      {!loading && error && (
        <div className="instagram-status instagram-error">
          {error}
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="instagram-grid">
          {posts.slice(0, 8).map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="instagram-card"
              aria-label="Instagram gönderisini aç"
            >
              <img
                src={getPostImage(post)}
                alt={getPostTitle(post)}
                loading="lazy"
              />

              <div className="instagram-overlay">
                <span className="instagram-icon">
                  {post.media_type === "VIDEO" ? "▶" : "📷"}
                </span>

                <strong>
                  {post.media_type === "VIDEO"
                    ? "Reels Videosunu İzle"
                    : "Gönderiyi Gör"}
                </strong>

                {post.caption && (
                  <small>{getPostTitle(post)}</small>
                )}
              </div>

              <div className="instagram-handle">
                @aslanstudyo
              </div>

              {post.media_type === "VIDEO" && (
                <div className="instagram-video-badge">
                  REELS
                </div>
              )}
            </a>
          ))}
        </div>
      )}

      <div className="instagram-button">
        <a
          href={INSTAGRAM_PROFILE_URL}
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