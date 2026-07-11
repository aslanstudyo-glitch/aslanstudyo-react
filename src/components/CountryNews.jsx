import { FaNewspaper } from "react-icons/fa";
import "./CountryNews.css";

function CountryNews() {
  return (
    <section className="country-news-section">
      <div className="country-news-card">
        <div className="country-news-header">
          <div>
            <span>Gündem</span>

            <h2>
              <FaNewspaper className="news-icon" />
              Ülkemizden Haberler
            </h2>

          </div>

          <span className="country-news-live">
            <span></span>
            CANLI
          </span>
        </div>

        <div className="country-news-frame">
          <iframe
            title="Haberler.com Son Dakika Haberleri"
            src="https://rss.haberler.com/sondakika_v1.asp?zemin=FFFFFF&baslik=000000&baslik2=D91414&satir=F2F2F2&limit=10&uzunluk=30"
            loading="lazy"
            scrolling="no"
          />
        </div>

        <div className="country-news-footer">
          Haberler Haberler.com tarafından sağlanmaktadır.
        </div>
      </div>
    </section>
  );
}

export default CountryNews;