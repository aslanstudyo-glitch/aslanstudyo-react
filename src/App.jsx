import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import Reservation from "./components/Reservation";
import TopInfoBar from "./components/TopInfoBar";
import NewsTicker from "./components/NewsTicker";
import AslanaSor from "./components/AslanaSor";
import YouTube from "./components/YouTube";
import LiveContent from "./components/LiveContent";
import RegistrationBadge from "./components/RegistrationBadge";
import Kunye from "./pages/Kunye";
import Kvkk from "./pages/Kvkk";
import Gizlilik from "./pages/Gizlilik";
import CerezPolitikasi from "./pages/CerezPolitikasi";
import Iletisim from "./pages/Iletisim";
import LoadingScreen from "./components/LoadingScreen";


function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}

      <TopInfoBar />
      <NewsTicker />
      <Hero />
      <Services />
      <Gallery setSelectedImage={setSelectedImage} />
      <Videos />
      <YouTube />
      <Announcements />
      <About />
      <Reservation />
      <Testimonials />
      <LiveContent />
      <Contact />
      <AslanaSor />
      <RadioPlayer />
      <Footer />
      <RegistrationBadge />

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

function App() {
  return (
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/kunye" element={<Kunye />} />
  <Route path="/kvkk" element={<Kvkk />} />
  <Route path="/gizlilik" element={<Gizlilik />} />
  <Route
    path="/cerez-politikasi"
    element={<CerezPolitikasi />}
  />
  <Route path="/iletisim" element={<Iletisim />} />
</Routes>
  );
}

export default App;