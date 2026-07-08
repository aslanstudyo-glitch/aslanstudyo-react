import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Gallery({ setSelectedImage }) {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const loadGallery = async () => {
      const snapshot = await getDocs(collection(db, "gallery"));

      const images = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGalleryImages(images);
    };

    loadGallery();
  }, []);

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-title">
        <span>Aslan Stüdyo</span>
        <h2>Galeri</h2>
        <p>En özel anlardan seçilmiş kareler.</p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((item, index) => {
          const imageUrl = item.imageUrl || item["resim URL'si"];
          const title = item.title || item["başlık"] || `Galeri ${index + 1}`;

          return (
            <div
              className="gallery-card"
              key={item.id}
              onClick={() => setSelectedImage(imageUrl)}
            >
              <img src={imageUrl} alt={title} />

              <div className="gallery-overlay">
                <span>Fotoğrafı Gör</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Gallery;