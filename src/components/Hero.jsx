import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "./Navbar";

function Hero() {
  const [settings, setSettings] = useState({
    heroTitle: "ASLAN STÜDYO",
    heroSubtitle: "Hatıralar Aslan'la Sonsuz",
    heroDescription:
      "Düğün • Nişan • Kına • Drone • Mezuniyet • Aile Çekimi",
    heroButton1: "Galeriyi Keşfet",
    heroButton2: "WhatsApp",
    whatsapp: "05333229560",
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "site"));

        if (snap.exists()) {
          setSettings((prev) => ({
            ...prev,
            ...snap.data(),
          }));
        }
      } catch (err) {
        console.error("Hero ayarları yüklenemedi:", err);
      }
    };

    loadSettings();
  }, []);

  const whatsappNumber = (settings.whatsapp || "")
    .replace(/\s/g, "")
    .replace(/^0/, "90");

  return (
    <section className="hero" id="home">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/videos/dukkan.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <Navbar />

      <div className="hero-content">
        <span className="hero-tag">
          Profesyonel Video & Fotoğrafçılık
        </span>

        <div className="hero-title">
          <h1>{settings.heroTitle}</h1>
          <h2>{settings.heroSubtitle}</h2>
        </div>

        <p>{settings.heroDescription}</p>

        <div className="hero-actions">
          <a href="#gallery" className="btn red">
            {settings.heroButton1}
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            className="btn light"
            target="_blank"
            rel="noreferrer"
          >
            {settings.heroButton2}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;