function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-title">
        <span>Bize Ulaşın</span>
        <h2>İletişim</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>📍 Adres</h3>
          <p>Çayırlık Mah. Aksaray Cad. No:23/C Acıgöl / Nevşehir</p>
        </div>

        <div className="contact-card">
          <h3>📞 Telefon</h3>
          <p>0533 322 95 60</p>
        </div>

        <div className="contact-card">
          <h3>📧 E-posta</h3>
          <p>
            <a href="mailto:aslanstudyo@gmail.com">aslanstudyo@gmail.com</a>
          </p>
        </div>

        <div className="contact-card">
          <h3>💬 WhatsApp</h3>
          <p>Hızlı rezervasyon ve bilgi için yazabilirsiniz.</p>
        </div>

        <div className="contact-card">
          <h3>📱 Sosyal Medya</h3>
          <p>@aslanstudyo</p>
        </div>

        <div className="contact-card">
          <h3>🕒 Çalışma Saatleri</h3>
          <p>Her Gün 09:00 - 19:00</p>
        </div>
      </div>

      <div className="contact-actions">
        <a href="tel:05333229560" className="btn red">Hemen Ara</a>
        <a href="https://wa.me/905333229560" className="btn dark">WhatsApp</a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=38.5496974,34.5065068"
          className="btn light-border"
          target="_blank"
          rel="noreferrer"
        >
          Yol Tarifi Al
        </a>
      </div>

      <div className="map-box">
        <iframe
          title="Aslan Stüdyo Harita"
          src="https://www.google.com/maps?q=38.5496974,34.5065068&z=17&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

export default Contact;