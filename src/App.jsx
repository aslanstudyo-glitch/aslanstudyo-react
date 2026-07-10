import { useState } from "react";
import "./App.css";

import RadioPlayer from "./components/RadioPlayer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Videos from "./components/Videos";
import Announcements from "./components/Announcements";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Instagram from "./components/Instagram";
import Reservation from "./components/Reservation";
import TopInfoBar from "./components/TopInfoBar";
import NewsTicker from "./components/NewsTicker";
import AslanaSor from "./components/AslanaSor";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <TopInfoBar />
      <NewsTicker />
      <Hero />
      <Services />
      <Gallery setSelectedImage={setSelectedImage} />
      <Videos />
      <Announcements />
      <About />
      <Reservation />
      <Testimonials />
      <Instagram />
      <Contact />
      <AslanaSor />
      <RadioPlayer />
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
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <img src={selectedImage} alt="Büyük Galeri" />
        </div>
      )}
    </>
  );
}

export default App;