import { Link } from "react-router-dom";
import "./Policy.css";

function CerezPolitikasi() {
  return (
    <main className="policy-page">
      <div className="policy-container">
        <Link className="back-home" to="/">
          ← Ana Sayfaya Dön
        </Link>

        <span className="policy-tag">Yasal Bilgilendirme</span>

        <h1>Çerez Politikası</h1>

        <p className="policy-subtitle">
          Aslan Stüdyo Video & Fotoğrafçılık
        </p>

        <section className="policy-card">
          <h2>1. Çerez Nedir?</h2>

          <p>
            Çerezler, ziyaret ettiğiniz internet siteleri tarafından
            tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin
            dosyalarıdır. Çerezler, internet sitesinin düzgün çalışması,
            tercihlerin hatırlanması ve kullanıcı deneyiminin
            geliştirilmesi amacıyla kullanılabilir.
          </p>

          <h2>2. Çerezleri Hangi Amaçlarla Kullanıyoruz?</h2>

          <ul>
            <li>İnternet sitesinin güvenli ve doğru çalışmasını sağlamak</li>
            <li>Kullanıcı tercihlerini hatırlamak</li>
            <li>Site performansını ve kullanımını analiz etmek</li>
            <li>İçeriklerin doğru şekilde görüntülenmesini sağlamak</li>
            <li>Harita, video ve sosyal medya içeriklerini göstermek</li>
            <li>Hizmetlerimizi ve kullanıcı deneyimini geliştirmek</li>
          </ul>

          <h2>3. Kullanılabilecek Çerez Türleri</h2>

          <h3>Zorunlu Çerezler</h3>

          <p>
            İnternet sitesinin temel fonksiyonlarının çalışması için
            gereklidir. Bu çerezler olmadan bazı sayfalar veya özellikler
            düzgün çalışmayabilir.
          </p>

          <h3>İşlevsel Çerezler</h3>

          <p>
            Dil, görünüm ve benzeri tercihlerin hatırlanmasını sağlayarak
            kullanıcı deneyimini geliştirir.
          </p>

          <h3>Performans ve Analiz Çerezleri</h3>

          <p>
            Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı
            olabilir. Bu bilgiler site performansını geliştirmek amacıyla
            kullanılabilir.
          </p>

          <h3>Üçüncü Taraf Çerezleri</h3>

          <p>
            İnternet sitemizde kullanılan Google Haritalar, YouTube,
            Instagram, Haberler.com ve benzeri üçüncü taraf hizmetleri,
            kendi çerezlerini veya benzer teknolojilerini kullanabilir.
          </p>

          <h2>4. Üçüncü Taraf Hizmetleri</h2>

          <p>
            Sitemizde aşağıdaki hizmetlerden yararlanılabilir:
          </p>

          <ul>
            <li>Google Haritalar</li>
            <li>YouTube</li>
            <li>Instagram</li>
            <li>Firebase</li>
            <li>Vercel</li>
            <li>Haberler.com</li>
            <li>WhatsApp bağlantıları</li>
          </ul>

          <p>
            Bu hizmetlerin veri işleme ve çerez uygulamaları, ilgili
            hizmet sağlayıcıların kendi gizlilik ve çerez politikalarına
            tabi olabilir.
          </p>

          <h2>5. Çerezlerin Saklama Süresi</h2>

          <p>
            Çerezler, kullanım amaçlarına göre oturum süresince veya
            belirli bir süre boyunca cihazınızda saklanabilir. Saklama
            süresi sona eren çerezler otomatik olarak silinebilir.
          </p>

          <h2>6. Çerezleri Nasıl Yönetebilirsiniz?</h2>

          <p>
            Çerezleri tarayıcı ayarlarınız üzerinden kabul edebilir,
            reddedebilir veya silebilirsiniz. Çerezlerin devre dışı
            bırakılması hâlinde internet sitesinin bazı özellikleri
            beklenen şekilde çalışmayabilir.
          </p>

          <p>
            Tarayıcınızın gizlilik veya çerez ayarları bölümünden mevcut
            tercihlerinizi değiştirebilirsiniz.
          </p>

          <h2>7. Kişisel Verilerin İşlenmesi</h2>

          <p>
            Çerezler yoluyla kişisel veri işlenmesi hâlinde, ilgili
            işlemler 6698 sayılı Kişisel Verilerin Korunması Kanunu ve
            ilgili mevzuata uygun şekilde yürütülür.
          </p>

          <p>
            Kişisel verilerin işlenmesine ilişkin ayrıntılı bilgi için
            aşağıdaki sayfaları inceleyebilirsiniz:
          </p>

          <div className="policy-links">
            <Link to="/kvkk">KVKK Aydınlatma Metni</Link>
            <Link to="/gizlilik">Gizlilik Politikası</Link>
          </div>

          <h2>8. Politika Güncellemeleri</h2>

          <p>
            Bu Çerez Politikası, kullanılan teknolojilerin veya yasal
            düzenlemelerin değişmesi hâlinde güncellenebilir.
          </p>

          <p>
            Son güncelleme tarihi: 12 Temmuz 2026
          </p>

          <h2>9. İletişim</h2>

          <p>
            Çerez Politikası hakkındaki sorularınız için bizimle
            iletişime geçebilirsiniz.
          </p>

          <p>
            <strong>Aslan Stüdyo Video & Fotoğrafçılık</strong>
            <br />
            Çayırlık Mahallesi Aksaray Caddesi No:23/C
            <br />
            Acıgöl / Nevşehir
            <br />
            Telefon: 0533 322 95 60
            <br />
            E-posta: aslanstudyo@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}

export default CerezPolitikasi;