function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-image">
        <img src="/images/dukkan.png" alt="Aslan Stüdyo" />
      </div>

      <div className="about-content">
        <span className="about-mini">Neden Aslan Stüdyo?</span>

        <h2>
          Hatıralarınızı
          <span> Sanata Dönüştürüyoruz.</span>
        </h2>

        <p>
          Aslan Stüdyo olarak 4 yıllık üniversite eğitimi ve 5 yıllık sektör
          deneyimimizle düğün, nişan, kına gecesi, mezuniyet, drone ve aile
          çekimlerinde profesyonel hizmet sunuyoruz.
        </p>

        <div className="about-list">
          <div>📸 4 Yıllık Üniversite Eğitimi & 5 Yıllık Deneyim</div>
          <div>💍 Binlerce Mutlu Çift</div>
          <div>🚁 Profesyonel Drone Çekimi</div>
          <div>🎥 Sinematik Video Çekimleri</div>
        </div>

        <a href="https://wa.me/905333229560" className="btn red">
          Bize Ulaşın
        </a>
      </div>
    </section>
  );
}

export default About;