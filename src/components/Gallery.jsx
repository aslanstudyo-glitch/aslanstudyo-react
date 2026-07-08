const galleryImages = [
  "/images/gallery/1.JPG",
  "/images/gallery/2.jpg",
  "/images/gallery/3.JPG",
  "/images/gallery/4.JPG",
  "/images/gallery/5.JPG",
  "/images/gallery/6.JPG",
  "/images/gallery/7.JPG",
  "/images/gallery/8.JPG",
];

function Gallery({ setSelectedImage }) {
  return (
    <section className="gallery-section" id="gallery">
      <div className="section-title">
        <span>Aslan Stüdyo</span>
        <h2>Galeri</h2>
        <p>En özel anlardan seçilmiş kareler.</p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div
            className="gallery-card"
            key={index}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image} alt={`Galeri ${index + 1}`} />
            <div className="gallery-overlay">
              <span>Fotoğrafı Gör</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;