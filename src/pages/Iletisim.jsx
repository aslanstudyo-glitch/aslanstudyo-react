import { Link } from "react-router-dom";
import "./Policy.css";

function Iletisim() {
  return (
    <main className="policy-page">
      <div className="policy-container">

        <Link className="back-home" to="/">
          ← Ana Sayfaya Dön
        </Link>

        <span className="policy-tag">İLETİŞİM</span>

        <h1>Bizimle İletişime Geçin</h1>

        <p className="policy-subtitle">
          Size yardımcı olmaktan memnuniyet duyarız.
        </p>

        <section className="policy-card">

          <div className="contact-grid">

            <div className="contact-item">
              <h3>📍 Adres</h3>
              <p>
                Çayırlık Mahallesi<br />
                Aksaray Caddesi No:23/C<br />
                Acıgöl / Nevşehir
              </p>
            </div>

            <div className="contact-item">
              <h3>☎ Telefon</h3>
              <p>
                <a href="tel:+905333229560">
                  0533 322 95 60
                </a>
              </p>
            </div>

            <div className="contact-item">
              <h3>📧 E-Posta</h3>
              <p>
                <a href="mailto:aslanstudyo@gmail.com">
                  aslanstudyo@gmail.com
                </a>
              </p>
            </div>

            <div className="contact-item">
              <h3>🌐 Web Sitesi</h3>
              <p>
                <a
                  href="https://aslanstudyo.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  aslanstudyo.com
                </a>
              </p>
            </div>

          </div>

          <div className="policy-links">

            <a
              href="https://wa.me/905333229560"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            <a
              href="https://www.instagram.com/aslanstudyo"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://www.facebook.com/aslanstudyo"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>

            <a
              href="https://www.tiktok.com/@aslanstudyo"
              target="_blank"
              rel="noreferrer"
            >
              TikTok
            </a>

          </div>

          <div
            style={{
              marginTop: "40px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >

            <iframe
              title="Aslan Stüdyo Harita"
              src="https://www.google.com/maps?q=Çayırlık+Mahallesi+Aksaray+Caddesi+No:23/C+Acıgöl+Nevşehir&output=embed"
              width="100%"
              height="450"
              loading="lazy"
            />

          </div>

        </section>

      </div>
    </main>
  );
}

export default Iletisim;