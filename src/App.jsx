import { useState } from "react";
import "./App.css";

import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Instagram from "./components/Instagram";
import Reservation from "./components/Reservation";
function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <Hero />
      <Services />
      <Gallery setSelectedImage={setSelectedImage} />
      <About />
      <Reservation />
      <Testimonials />
      <Instagram />
      <Contact />
      <Footer />

      <a
        href="https://wa.me/905333229560"
        className="floating-whatsapp"
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close">×</button>
          <img src={selectedImage} alt="Büyük Galeri" />
        </div>
      )}
    </>
  );
}

export default App;