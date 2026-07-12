import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <img src="/images/logo.png" alt="Aslan Stüdyo" />

      <p>Hatıralar Aslan'la Sonsuz</p>

  <div className="footer-links">
  <Link to="/kunye">Künye</Link>
  <span>|</span>

  <Link to="/kvkk">KVKK</Link>
  <span>|</span>

  <Link to="/gizlilik">Gizlilik Politikası</Link>
  <span>|</span>

  <Link to="/cerez-politikasi">
    Çerez Politikası
  </Link>
</div>

      <span>© 2026 Aslan Stüdyo | Video & Fotoğrafçılık</span>
    </footer>
  );
}

export default Footer;