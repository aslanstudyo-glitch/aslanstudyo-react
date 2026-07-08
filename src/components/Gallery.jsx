import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const localImages = [
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
  const [firebaseImages, setFirebaseImages] = useState([]);

  useEffect(() => {
    const loadGallery = async () => {
      const snapshot = await getDocs(collection(db, "gallery"));

      const images = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFirebaseImages(images);
    };

    loadGallery();
  }, []);

  const allImages = [
    ...localImages.map((url, index) => ({
      id: `local-${index}`,
      imageUrl: url,
      title: `Galeri ${index + 1}`,
    })),
    ...firebaseImages,
  ];

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-title">
        <span>Aslan Stüdyo</span>
        <h2>Galeri</h2>
        <p>En özel anlardan seçilmiş kareler.</p>
      </div>

      <div className="gallery-grid">
        {allImages.map((item, index) => {
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