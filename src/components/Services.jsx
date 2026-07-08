const services = [
  "💍 Düğün Çekimi",
  "❤️ Nişan Çekimi",
  "🌹 Kına Gecesi",
  "🎬 Video Çekimi",
  "🚁 Drone Çekimi",
  "👨‍👩‍👧‍👦 Aile Albümü",
  "🖼️ Fotoğraf Baskısı",
  "🎉 Organizasyon",
];

function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-title">
        <span>Aslan Stüdyo</span>
        <h2>Hizmetlerimiz</h2>
        <p>En özel anlarınızı profesyonel dokunuşlarla ölümsüzleştiriyoruz.</p>
      </div>

      <div className="service-grid">
        {services.map((item, index) => (
          <div className="service-card" key={index}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;