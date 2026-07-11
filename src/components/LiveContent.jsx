import { useEffect, useState } from "react";
import { FaInstagram, FaNewspaper } from "react-icons/fa";
import "./LiveContent.css";

const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/aslanstudyo";

function LiveContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [instagramError, setInstagramError] = useState("");

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

        setPosts((data.posts || []).slice(0, 6));
      } catch (error) {
        console.error("Instagram yükleme hatası:", error);
        setInstagramError(
          "Instagram paylaşımları şu anda görüntülenemiyor."
        );
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

  return (
    <section className="live-content-section" id="guncel-icerikler">
      <div className="section-title">
        <span>Güncel İçerikler</span>
        <h2>Haberler ve Sosyal Medya</h2>
        <p>
          Türkiye’den son gelişmeler ve Aslan Stüdyo’nun en yeni
          Instagram paylaşımları.
        </p>
      </div>

      <div className="live-content-grid">
        {/* ÜLKEMİZDEN HABERLER */}
        <article className="live-content-card news-column">
          <div className="live-content-header">
            <div className="live-content-heading">
              <span className="live-content-tag">Gündem</span>

              <h3>
                <FaNewspaper />
                Ülkemizden Haberler
              </h3>
            </div>

            <div className="live-content-live">
              <span></span>
              CANLI
            </div>
          </div>

          <div className="live-content-news-frame">
            <iframe
              title="Haberler.com Son Dakika Haberleri"
              src="https://rss.haberler.com/sondakika_v1.asp?zemin=FFFFFF&baslik=000000&baslik2=D91414&satir=F2F2F2&limit=10&uzunluk=30"
              loading="lazy"
              scrolling="no"
            />
          </div>

          <div className="live-content-source">
            Haberler, Haberler.com tarafından sağlanmaktadır.
          </div>
        </article>

        {/* INSTAGRAM */}
        <article className="live-content-card instagram-column">
          <div className="live-content-header">
            <div className="live-content-heading">
              <span className="live-content-tag">Sosyal Medya</span>

              <h3>
                <FaInstagram />
                Son Instagram Paylaşımları
              </h3>
            </div>

            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="live-content-profile-link"
            >
              @aslanstudyo
            </a>
          </div>

          {loading && (
            <div className="live-content-status">
              Instagram paylaşımları yükleniyor...
            </div>
          )}

          {!loading && instagramError && (
            <div className="live-content-status error">
              {instagramError}
            </div>
          )}

          {!loading && !instagramError && posts.length === 0 && (
            <div className="live-content-status">
              Henüz Instagram paylaşımı bulunmuyor.
            </div>
          )}

          {!loading && !instagramError && posts.length > 0 && (
            <div className="live-instagram-grid">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="live-instagram-card"
                  aria-label="Instagram gönderisini aç"
                >
                  <img
                    src={getPostImage(post)}
                    alt={
                      post.caption ||
                      "Aslan Stüdyo Instagram paylaşımı"
                    }
                    loading="lazy"
                  />

                  <div className="live-instagram-overlay">
                    {post.media_type === "VIDEO" ? "▶" : "📷"}
                  </div>

                  {post.media_type === "VIDEO" && (
                    <span className="live-instagram-reels">
                      REELS
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="live-instagram-button"
          >
            <FaInstagram />
            Instagram’da Takip Et
          </a>
        </article>
      </div>
    </section>
  );
}

export default LiveContent;