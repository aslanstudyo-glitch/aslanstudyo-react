import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Gallery({ setSelectedImage }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const snapshot = await getDocs(collection(db, "gallery"));

        const galleryImages = snapshot.docs.map((galleryDoc) => ({
          id: galleryDoc.id,
          ...galleryDoc.data(),
        }));

        galleryImages.sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

        setImages(galleryImages);
      } catch (requestError) {
        console.error("Galeri yüklenemedi:", requestError);
        setError("Galeri şu anda yüklenemiyor.");
      } finally {
        setLoading(false);
      }
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

      {loading && (
        <p style={{ textAlign: "center" }}>
          Galeri yükleniyor...
        </p>
      )}

      {!loading && error && (
        <p
          style={{
            textAlign: "center",
            color: "#e30613",
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && images.length === 0 && (
        <p style={{ textAlign: "center" }}>
          Henüz galeri fotoğrafı yüklenmedi.
        </p>
      )}

      {!loading && !error && images.length > 0 && (
        <div className="gallery-grid">
          {images.map((item, index) => {
            const imageUrl =
              item.imageUrl || item["resim URL'si"];

            const title =
              item.title ||
              item["başlık"] ||
              `Galeri ${index + 1}`;

            if (!imageUrl) {
              return null;
            }

            return (
              <button
                type="button"
                className="gallery-card"
                key={item.id}
                onClick={() => setSelectedImage(imageUrl)}
                aria-label={`${title} fotoğrafını büyüt`}
              >
                <img
                  src={imageUrl}
                  alt={title}
                  loading="lazy"
                />

                <div className="gallery-overlay">
                  <span>Fotoğrafı Gör</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Gallery;