import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <img src="/images/logo.png" alt="Aslan Stüdyo" />

      <p>Hatıralar Aslan'la Sonsuz</p>

      <div className="footer-links">
  <Link to="/kunye">Künye</Link>
  <span>|</span>
  <Link to="/kvkk">KVKK</Link>
</div>

      <span>© 2026 Aslan Stüdyo | Video & Fotoğrafçılık</span>
    </footer>
  );
}

export default Footer;