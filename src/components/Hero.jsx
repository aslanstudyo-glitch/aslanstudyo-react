import Navbar from "./Navbar";

function Hero() {
  return (
    <section className="hero" id="home">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/videos/dukkan.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <Navbar />

      <div className="hero-content">
        <span className="hero-tag">Profesyonel Video & Fotoğrafçılık</span>

        <div className="hero-title">
          <h1>ASLAN STÜDYO</h1>
          <h2>Hatıralar Aslan&apos;la Sonsuz</h2>
        </div>

        <p>Düğün • Nişan • Kına • Drone • Mezuniyet • Aile Çekimi</p>

        <div className="hero-actions">
          <a href="#gallery" className="btn red">Galeriyi Keşfet</a>
          <a href="https://wa.me/905333229560" className="btn light">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;