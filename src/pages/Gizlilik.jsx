import { Link } from "react-router-dom";
import "./Policy.css";

function Gizlilik() {
  return (
    <div className="policy-page">

      <div className="policy-container">

        <Link className="back-home" to="/">
          ← Ana Sayfaya Dön
        </Link>

        <span className="policy-tag">KURUMSAL</span>

        <h1>Gizlilik Politikası</h1>

        <p className="policy-subtitle">
          Aslan Stüdyo Video & Fotoğrafçılık
        </p>

        <div className="policy-card">

          <h2>1. Genel</h2>

          <p>
            Aslan Stüdyo olarak ziyaretçilerimizin kişisel verilerinin
            gizliliğine önem veriyoruz.
          </p>

          <p>
            Web sitemizi ziyaret ettiğinizde yalnızca hizmetlerimizi
            sunabilmek ve kullanıcı deneyimini geliştirebilmek amacıyla
            gerekli bilgiler işlenmektedir.
          </p>

          <h2>2. Toplanan Bilgiler</h2>

          <ul>
            <li>Ad Soyad</li>
            <li>Telefon Numarası</li>
            <li>E-posta Adresi</li>
            <li>IP Adresi</li>
            <li>Tarayıcı Bilgileri</li>
          </ul>

          <h2>3. Bilgilerin Kullanımı</h2>

          <p>

            Toplanan bilgiler;

          </p>

          <ul>

            <li>Rezervasyon işlemleri</li>

            <li>Müşteri iletişimi</li>

            <li>Teknik destek</li>

            <li>Yasal yükümlülükler</li>

          </ul>

          <h2>4. Bilgi Güvenliği</h2>

          <p>

            Kişisel bilgileriniz güvenli sunucularda korunmaktadır.
            Üçüncü kişilerle yasal zorunluluklar dışında paylaşılmaz.

          </p>

          <h2>5. İletişim</h2>

          <p>

            Gizlilik Politikamız hakkında sorularınız için;

          </p>

          <p>

            <strong>Aslan Stüdyo Video & Fotoğrafçılık</strong>

            <br />

            Çayırlık Mah. Aksaray Cad. No:23/C

            <br />

            Acıgöl / Nevşehir

            <br />

            Telefon: 0533 322 95 60

            <br />

            E-posta: aslanstudyo@gmail.com

          </p>

        </div>

      </div>

    </div>

  );
}

export default Gizlilik;