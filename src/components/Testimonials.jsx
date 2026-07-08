const testimonials = [
  {
    name: "Müşteri Yorumu",
    text: "Düğün çekimlerimiz çok güzel oldu. İlgi, kalite ve teslimat konusunda çok memnun kaldık.",
  },
  {
    name: "Müşteri Yorumu",
    text: "Drone çekimi ve video kalitesi gerçekten harikaydı. Aslan Stüdyo’ya teşekkür ederiz.",
  },
  {
    name: "Müşteri Yorumu",
    text: "Özel günümüzü en güzel şekilde ölümsüzleştirdiler. Kesinlikle tavsiye ederiz.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section" id="comments">
      <div className="section-title">
        <span>Müşteri Memnuniyeti</span>
        <h2>Yorumlar</h2>
        <p>Aslan Stüdyo’yu tercih eden müşterilerimizin görüşleri.</p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <div className="stars">★★★★★</div>
            <p>“{item.text}”</p>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;