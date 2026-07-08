function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Aslan Stüdyo" />
      </div>

      <nav>
        <a href="#home">Ana Sayfa</a>
        <a href="#services">Hizmetler</a>
        <a href="#gallery">Galeri</a>
        <a href="#about">Hakkımızda</a>
        <a href="#contact">İletişim</a>
      </nav>
    </header>
  );
}

export default Navbar;