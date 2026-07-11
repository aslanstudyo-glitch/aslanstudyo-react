import { Link } from "react-router-dom";
import "./Kunye.css";

function Kunye() {
  return (
    <main className="kunye-page">
      <div className="kunye-container">
        <Link to="/" className="kunye-back">
          ← Ana Sayfaya Dön
        </Link>

        <div className="kunye-title">
          <span>Kurumsal</span>
          <h1>Künye</h1>
          <p>Aslan Stüdyo Video & Fotoğrafçılık</p>
        </div>

        <section className="kunye-card">
          <h2>İşletme Bilgileri</h2>

          <div className="kunye-info-grid">
            <div>
              <strong>Ticari Ünvan</strong>
              <p>Aslan Stüdyo Video & Fotoğrafçılık</p>
            </div>

            <div>
              <strong>Faaliyet Alanı</strong>
              <p>Profesyonel Fotoğraf ve Video Hizmetleri</p>
            </div>

            <div>
              <strong>Sorumlu Kişi</strong>
              <p>Hüseyin Aslan</p>
            </div>

            <div>
              <strong>Telefon</strong>
              <p>
                <a href="tel:+905333229560">0533 322 95 60</a>
              </p>
            </div>

            <div>
              <strong>E-posta</strong>
              <p>
                <a href="mailto:aslanstudyo@gmail.com">
                  aslanstudyo@gmail.com
                </a>
              </p>
            </div>

            <div>
              <strong>Web Sitesi</strong>
              <p>
                <a href="https://aslanstudyo.com">
                  aslanstudyo.com
                </a>
              </p>
            </div>

            <div>
              <strong>Sosyal Medya</strong>
              <p>@aslanstudyo</p>
            </div>

            <div>
              <strong>Adres</strong>
              <p>
                Çayırlık Mahallesi Aksaray Caddesi No:23/C
                <br />
                Acıgöl / Nevşehir
              </p>
            </div>
          </div>
        </section>

        <section className="kunye-card">
          <h2>Hizmetlerimiz</h2>

          <div className="kunye-services">
            <span>Düğün Çekimi</span>
            <span>Nişan Çekimi</span>
            <span>Kına Gecesi</span>
            <span>Söz Çekimi</span>
            <span>Mezuniyet Çekimi</span>
            <span>Dış Mekân Çekimi</span>
            <span>Drone Çekimi</span>
            <span>Profesyonel Video Çekimi</span>
            <span>Fotoğraf Baskısı</span>
            <span>Panoramik Aile Albümü</span>
            <span>Çerçeve Hizmetleri</span>
            <span>Organizasyon Hizmetleri</span>
          </div>
        </section>

        <section className="kunye-card">
          <h2>Yayın Politikası</h2>

          <p>
            Aslan Stüdyo internet sitesi; fotoğrafçılık, video
            çekimi, organizasyon hizmetleri, kampanyalar ve güncel
            duyurular hakkında bilgilendirme amacıyla yayın
            yapmaktadır.
          </p>

          <p>
            Sitede yer alan tüm görseller ve içerikler, aksi
            belirtilmedikçe Aslan Stüdyo’ya aittir. İzinsiz
            kopyalanamaz, çoğaltılamaz veya ticari amaçla
            kullanılamaz.
          </p>
        </section>

        <section className="kunye-card">
          <h2>Telif Hakkı</h2>

          <p>
            © 2026 Aslan Stüdyo Video & Fotoğrafçılık
            <br />
            Tüm hakları saklıdır.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Kunye;