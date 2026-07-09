import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Contact() {
  const [settings, setSettings] = useState({
    phone: "0533 322 95 60",
    whatsapp: "0533 322 95 60",
    email: "aslanstudyo@gmail.com",
    address: "Çayırlık Mah. Aksaray Cad. No:23/C Acıgöl / Nevşehir",
    instagram: "@aslanstudyo",
    facebook: "@aslanstudyo",
    tiktok: "@aslanstudyo",
    hours: "09:00 - 19:00",
  });

  useEffect(() => {
    const loadSettings = async () => {
      const snap = await getDoc(doc(db, "settings", "site"));
      if (snap.exists()) setSettings(snap.data());
    };

    loadSettings();
  }, []);

  const cleanPhone = settings.phone.replace(/\s/g, "");
  const cleanWhatsapp = settings.whatsapp.replace(/\s/g, "").replace(/^0/, "90");

  return (
    <section className="contact-section" id="contact">
      <div className="section-title">
        <span>Bize Ulaşın</span>
        <h2>İletişim</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>📍 Adres</h3>
          <p>{settings.address}</p>
        </div>

        <div className="contact-card">
          <h3>📞 Telefon</h3>
          <p>{settings.phone}</p>
        </div>

        <div className="contact-card">
          <h3>📧 E-posta</h3>
          <p>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </p>
        </div>

        <div className="contact-card">
          <h3>💬 WhatsApp</h3>
          <p>{settings.whatsapp}</p>
        </div>

        <div className="contact-card">
          <h3>📱 Sosyal Medya</h3>
          <p>
            {settings.instagram} | {settings.facebook} | {settings.tiktok}
          </p>
        </div>

        <div className="contact-card">
          <h3>🕒 Çalışma Saatleri</h3>
          <p>Her Gün {settings.hours}</p>
        </div>
      </div>

      <div className="contact-actions">
        <a href={`tel:${cleanPhone}`} className="btn red">Hemen Ara</a>
        <a href={`https://wa.me/${cleanWhatsapp}`} className="btn dark">WhatsApp</a>
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