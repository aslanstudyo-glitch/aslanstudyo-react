function Reservation() {
  const sendReservation = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const service = form.service.value;
    const date = form.date.value;
    const message = form.message.value;

    const text = `Merhaba Aslan Stüdyo, rezervasyon talebi oluşturmak istiyorum.%0A%0AAd Soyad: ${name}%0ATelefon: ${phone}%0AÇekim Türü: ${service}%0ATarih: ${date}%0AMesaj: ${message}`;

    window.open(`https://wa.me/905333229560?text=${text}`, "_blank");
  };

  return (
    <section className="reservation-section" id="reservation">
      <div className="section-title">
        <span>Rezervasyon</span>
        <h2>Randevu Talebi Oluştur</h2>
        <p>Bilgilerinizi doldurun, talebiniz WhatsApp üzerinden bize ulaşsın.</p>
      </div>

      <form className="reservation-form" onSubmit={sendReservation}>
        <input name="name" type="text" placeholder="Ad Soyad" required />
        <input name="phone" type="tel" placeholder="Telefon" required />

        <select name="service" required>
          <option value="">Çekim Türü Seçin</option>
          <option>Düğün Çekimi</option>
          <option>Nişan Çekimi</option>
          <option>Kına Gecesi</option>
          <option>Mezuniyet Çekimi</option>
          <option>Drone Çekimi</option>
          <option>Biyometrik Fotoğraf</option>
          <option>Fotoğraf Baskısı</option>
        </select>

        <input name="date" type="date" required />

        <textarea name="message" placeholder="Mesajınız" rows="5"></textarea>

        <button type="submit" className="btn red">
          WhatsApp ile Gönder
        </button>
      </form>
    </section>
  );
}

export default Reservation;