import { useEffect, useState } from "react";
import "./TopInfoBar.css";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=38.6244&longitude=34.7239&current=temperature_2m,weather_code&timezone=Europe%2FIstanbul";

const EXCHANGE_URL =
  "https://api.frankfurter.dev/v1/latest?base=EUR&symbols=TRY,USD";

const weatherDescriptions = {
  0: "Açık",
  1: "Çoğunlukla Açık",
  2: "Parçalı Bulutlu",
  3: "Kapalı",
  45: "Sisli",
  48: "Kırağılı Sis",
  51: "Hafif Çisenti",
  53: "Çisenti",
  55: "Yoğun Çisenti",
  61: "Hafif Yağmurlu",
  63: "Yağmurlu",
  65: "Kuvvetli Yağmur",
  71: "Hafif Karlı",
  73: "Karlı",
  75: "Yoğun Kar",
  80: "Sağanak Yağışlı",
  81: "Sağanak Yağışlı",
  82: "Kuvvetli Sağanak",
  95: "Gök Gürültülü",
  96: "Dolu ve Fırtına",
  99: "Kuvvetli Fırtına",
};

function TopInfoBar() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: null,
    description: "Güncelleniyor",
  });
  const [rates, setRates] = useState({
    usd: null,
    eur: null,
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const response = await fetch(WEATHER_URL);

        if (!response.ok) {
          throw new Error("Hava durumu alınamadı.");
        }

        const data = await response.json();
        const current = data.current;

        setWeather({
          temperature: Math.round(current.temperature_2m),
          description:
            weatherDescriptions[current.weather_code] || "Güncel Hava",
        });
      } catch (error) {
        console.error("Hava durumu hatası:", error);

        setWeather({
          temperature: null,
          description: "Hava bilgisi alınamadı",
        });
      }
    };

    loadWeather();

    const weatherTimer = window.setInterval(
      loadWeather,
      10 * 60 * 1000
    );

    return () => window.clearInterval(weatherTimer);
  }, []);

  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        const response = await fetch(EXCHANGE_URL);

        if (!response.ok) {
          throw new Error("Döviz kuru alınamadı.");
        }

        const data = await response.json();

        const eurTry = data.rates.TRY;
        const eurUsd = data.rates.USD;
        const usdTry = eurTry / eurUsd;

        setRates({
          usd: usdTry,
          eur: eurTry,
        });
      } catch (error) {
        console.error("Döviz kuru hatası:", error);
      }
    };

    loadExchangeRates();

    const exchangeTimer = window.setInterval(
      loadExchangeRates,
      30 * 60 * 1000
    );

    return () => window.clearInterval(exchangeTimer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(time);

  const formattedDate = new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(time);

  const formatCurrency = (value) => {
    if (!value) return "Güncelleniyor";

    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="top-info-bar">
      <div className="top-info-track">
        <div className="top-info-item">
          <span className="top-info-icon">🕒</span>
          <strong>{formattedTime}</strong>
          <span>{formattedDate}</span>
        </div>

        <div className="top-info-separator" />

        <div className="top-info-item">
          <span className="top-info-icon">📍</span>
          <strong>Nevşehir</strong>
          <span>
            {weather.temperature !== null
              ? `${weather.temperature}°C`
              : ""}
            {" "}
            {weather.description}
          </span>
        </div>

        <div className="top-info-separator" />

        <div className="top-info-item">
          <span className="top-info-icon">💵</span>
          <strong>Dolar</strong>
          <span>{formatCurrency(rates.usd)} TL</span>
        </div>

        <div className="top-info-separator" />

        <div className="top-info-item">
          <span className="top-info-icon">💶</span>
          <strong>Euro</strong>
          <span>{formatCurrency(rates.eur)} TL</span>
        </div>

        <div className="top-info-separator" />

        <div className="top-info-item top-info-gold">
          <span className="top-info-icon">🟡</span>
          <strong>Altın Piyasası</strong>
          <span>Yakında</span>
        </div>
      </div>
    </div>
  );
}

export default TopInfoBar;