import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Reservation() {
  const sendReservation = async (e) => {
    e.preventDefault();

    const form = e.target;

    const reservationData = {
      name: form.name.value,
      phone: form.phone.value,
      service: form.service.value,
      date: form.date.value,
      message: form.message.value,
      status: "Bekliyor",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "reservations"), reservationData);

      alert("Rezervasyon talebiniz başarıyla alındı. En kısa sürede dönüş yapılacaktır.");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Rezervasyon gönderilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <section className="reservation-section" id="reservation">
      <div className="section-title">
        <span>Rezervasyon</span>
        <h2>Randevu Talebi Oluştur</h2>
        <p>Bilgilerinizi doldurun, talebiniz bize ulaşsın.</p>
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
          Rezervasyon Gönder
        </button>
      </form>
    </section>
  );
}

export default Reservation;