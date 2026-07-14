import { useMemo, useState } from "react";

const pages = [
  {
    title: "Ana Sayfa",
    description: "Aslan Stüdyo ana sayfası",
    link: "#home",
  },
  {
    title: "Hizmetler",
    description: "Düğün, Nişan, Drone, Video",
    link: "#services",
  },
  {
    title: "Galeri",
    description: "Fotoğraf galerisi",
    link: "#gallery",
  },
  {
    title: "Hakkımızda",
    description: "Aslan Stüdyo",
    link: "#about",
  },
  {
    title: "İletişim",
    description: "Telefon ve adres",
    link: "#contact",
  },
  {
    title: "KVKK",
    description: "Kişisel Verilerin Korunması",
    link: "/kvkk",
  },
  {
    title: "Gizlilik Politikası",
    description: "Gizlilik",
    link: "/gizlilik",
  },
  {
    title: "Çerez Politikası",
    description: "Çerezler",
    link: "/cerez-politikasi",
  },
];

function SiteSearch() {
  const [text, setText] = useState("");

  const results = useMemo(() => {
    if (!text) return [];

    return pages.filter((item) =>
      (
        item.title +
        " " +
        item.description
      )
        .toLowerCase()
        .includes(text.toLowerCase())
    );
  }, [text]);

  return (
    <div className="site-search">

      <input
        placeholder="🔍 Sitede ara..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {text && (
        <div className="search-results">

          {results.length === 0 && (
            <div className="search-empty">
              Sonuç bulunamadı.
            </div>
          )}

          {results.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="search-item"
            >
              <strong>{item.title}</strong>

              <span>{item.description}</span>
            </a>
          ))}
        </div>
      )}

    </div>
  );
}

export default SiteSearch;