import { Link } from "react-router-dom";
import "./Kvkk.css";

function Kvkk() {
  return (
    <main className="kvkk-page">
      <div className="kvkk-container">
        <Link to="/" className="kvkk-back">
          ← Ana Sayfaya Dön
        </Link>

        <header className="kvkk-title">
          <span>Yasal Bilgilendirme</span>
          <h1>KVKK Aydınlatma Metni</h1>
          <p>Aslan Stüdyo Video & Fotoğrafçılık</p>
        </header>

        <section className="kvkk-card">
          <h2>1. Veri Sorumlusu</h2>

          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu
            kapsamında kişisel verileriniz, veri sorumlusu
            sıfatıyla Aslan Stüdyo Video & Fotoğrafçılık
            tarafından işlenebilmektedir.
          </p>

          <div className="kvkk-info">
            <p>
              <strong>İşletme:</strong>{" "}
              Aslan Stüdyo Video & Fotoğrafçılık
            </p>

            <p>
              <strong>Sorumlu Kişi:</strong> Hüseyin Aslan
            </p>

            <p>
              <strong>Adres:</strong> Çayırlık Mahallesi,
              Aksaray Caddesi No:23/C, Acıgöl / Nevşehir
            </p>

            <p>
              <strong>Telefon:</strong>{" "}
              <a href="tel:+905333229560">
                0533 322 95 60
              </a>
            </p>

            <p>
              <strong>E-posta:</strong>{" "}
              <a href="mailto:aslanstudyo@gmail.com">
                aslanstudyo@gmail.com
              </a>
            </p>
          </div>
        </section>

        <section className="kvkk-card">
          <h2>2. İşlenen Kişisel Veriler</h2>

          <p>
            İnternet sitemiz, rezervasyon formu, iletişim
            kanalları ve hizmet süreçleri kapsamında aşağıdaki
            kişisel veriler işlenebilir:
          </p>

          <ul>
            <li>Ad ve soyadı bilgisi</li>
            <li>Telefon numarası</li>
            <li>E-posta adresi</li>
            <li>Rezervasyon tarihi ve çekim türü</li>
            <li>Mesaj, talep ve açıklama bilgileri</li>
            <li>
              Hizmet kapsamında paylaşılan fotoğraf ve video
              içerikleri
            </li>
            <li>
              İnternet sitesi kullanımına ilişkin teknik kayıtlar
            </li>
          </ul>
        </section>

        <section className="kvkk-card">
          <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>

          <p>Kişisel verileriniz aşağıdaki amaçlarla işlenebilir:</p>

          <ul>
            <li>
              Rezervasyon ve randevu taleplerinin alınması
            </li>
            <li>
              Fotoğraf, video ve organizasyon hizmetlerinin
              sunulması
            </li>
            <li>
              Müşteri taleplerine cevap verilmesi ve iletişim
              kurulması
            </li>
            <li>
              Hizmet planlaması ve operasyon süreçlerinin
              yürütülmesi
            </li>
            <li>
              Ödeme, faturalandırma ve muhasebe işlemlerinin
              yürütülmesi
            </li>
            <li>
              Hukuki yükümlülüklerin yerine getirilmesi
            </li>
            <li>
              Bilgi güvenliği ve internet sitesi güvenliğinin
              sağlanması
            </li>
          </ul>
        </section>

        <section className="kvkk-card">
          <h2>4. Kişisel Verilerin Toplanma Yöntemi</h2>

          <p>
            Kişisel verileriniz; internet sitesindeki rezervasyon
            ve iletişim formları, telefon, WhatsApp, e-posta,
            sosyal medya hesapları ve yüz yüze görüşmeler
            aracılığıyla elektronik veya fiziki ortamda
            toplanabilir.
          </p>
        </section>

        <section className="kvkk-card">
          <h2>5. Hukuki Sebepler</h2>

          <p>
            Kişisel verileriniz, 6698 sayılı Kanun’da yer alan
            veri işleme şartları çerçevesinde; sözleşmenin
            kurulması veya ifası, hukuki yükümlülüklerin yerine
            getirilmesi, bir hakkın tesisi, kullanılması veya
            korunması ve veri sorumlusunun meşru menfaati gibi
            hukuki sebeplere dayanılarak işlenebilir.
          </p>

          <p>
            Açık rızanın gerekli olduğu durumlarda kişisel
            verileriniz ayrıca açık rızanız alınarak işlenir.
          </p>
        </section>

        <section className="kvkk-card">
          <h2>6. Kişisel Verilerin Aktarılması</h2>

          <p>
            Kişisel verileriniz, hizmetin yürütülmesi ve hukuki
            yükümlülüklerin yerine getirilmesi amacıyla, gerekli
            olduğu ölçüde aşağıdaki taraflarla paylaşılabilir:
          </p>

          <ul>
            <li>Yetkili kamu kurum ve kuruluşları</li>
            <li>Mali müşavir ve hukuki danışmanlar</li>
            <li>
              Barındırma, veritabanı, e-posta ve teknik altyapı
              hizmeti sağlayıcıları
            </li>
            <li>
              Hizmetin gerçekleştirilmesine yardımcı olan yetkili
              iş ortakları
            </li>
          </ul>
        </section>

        <section className="kvkk-card">
          <h2>7. Saklama Süresi</h2>

          <p>
            Kişisel verileriniz, işlenme amacının gerektirdiği
            süre boyunca ve ilgili mevzuatta öngörülen yasal
            saklama süreleri kapsamında muhafaza edilir. Sürenin
            sona ermesiyle birlikte veriler silinir, yok edilir
            veya anonim hâle getirilir.
          </p>
        </section>

        <section className="kvkk-card">
          <h2>8. İlgili Kişinin Hakları</h2>

          <p>
            6698 sayılı Kanun’un 11. maddesi kapsamında aşağıdaki
            haklara sahipsiniz:
          </p>

          <ul>
            <li>
              Kişisel verilerinizin işlenip işlenmediğini öğrenme
            </li>
            <li>
              İşlenmişse buna ilişkin bilgi talep etme
            </li>
            <li>
              İşlenme amacını ve amacına uygun kullanılıp
              kullanılmadığını öğrenme
            </li>
            <li>
              Verilerin aktarıldığı üçüncü kişileri öğrenme
            </li>
            <li>
              Eksik veya yanlış işlenen verilerin düzeltilmesini
              isteme
            </li>
            <li>
              Kanundaki şartlar kapsamında silinmesini veya yok
              edilmesini isteme
            </li>
            <li>
              Yapılan düzeltme, silme veya yok etme işlemlerinin
              verilerin aktarıldığı üçüncü kişilere bildirilmesini
              isteme
            </li>
            <li>
              Otomatik sistemler sonucunda aleyhinize bir sonucun
              ortaya çıkmasına itiraz etme
            </li>
            <li>
              Kanuna aykırı işleme nedeniyle zarara uğramanız
              hâlinde zararın giderilmesini talep etme
            </li>
          </ul>
        </section>

        <section className="kvkk-card">
          <h2>9. Başvuru Yöntemi</h2>

          <p>
            KVKK kapsamındaki taleplerinizi kimliğinizi doğrulayan
            bilgilerle birlikte aşağıdaki iletişim kanallarından
            iletebilirsiniz:
          </p>

          <div className="kvkk-contact">
            <a href="mailto:aslanstudyo@gmail.com">
              E-posta ile Başvur
            </a>

            <a href="tel:+905333229560">
              Telefonla İletişim
            </a>
          </div>
        </section>

        <section className="kvkk-card kvkk-note">
          <h2>Güncelleme</h2>

          <p>
            Bu aydınlatma metni, mevzuat ve veri işleme
            süreçlerindeki değişikliklere bağlı olarak
            güncellenebilir.
          </p>

          <p>
            Son güncelleme tarihi: 11 Temmuz 2026
          </p>
        </section>
      </div>
    </main>
  );
}

export default Kvkk;