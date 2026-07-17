import { useEffect, useRef, useState } from "react";

const STREAM_URL =
  "https://stream.aslanstudyo.com/listen/radyoaslan/radio.mp3";

const NOW_PLAYING_URL =
  "https://stream.aslanstudyo.com/api/nowplaying/radyoaslan";
const RADIO_PAGE_URL = "https://aslanstudyo.com/radyo";
const QR_CODE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASgAAAEoAQAAAADDfFG0AAAB9UlEQVR4nO1a0W4DMQizp/7/L3sPYJLrpqlPAWmhqnp3sVQLAcHkKHxgX5+ALuqiftgLYFwJBARQ+URrZSr7Fn9BgL3GcJgIgaqVqex7/LUCCwRFiCKhWhnLvhdFQFBE1srGfl6TUK/tWnsp475xTmXf5K90DaH8RmqqVqayP4+CHEf65WPIVPbnUVvaVReRebkl5FT2Lf6i0j1UPYhmrNw2lX0LSpDk7oECQRDhKEXYDWZ/GBUx5UIv56QTleKNrzcUo1mt9lQgCYEEMtQGsz+MotJfgLJ+Zb2vmxZeU1GlH8NJoYW8SUqM8JvKviu+XLjgPpV2YOyaU9k37Y9OP5TAlsc7vP3Ew1iDiaz3AHJaQeSo4ubjMreneR0lnpCD68bXm6lUdTat+Zu6Urj68Q2V9arUT0QXIbeyo9kfRkEhhlL8SMqIe4TaVPZtelsuYnTlsii69f5hVG6P8EhCWfKxDfCnsu9C0eWLcHsBiFm9prM/iVrxBa0HdQYJ4J4/7rbPV3OHdNdFd61z2bfobUvH2BFZqZjOvP3EbpmPNbpxzV+6+8bXbtv5NihK9HlHRBru/OsPlIcSEkS5w+/nNQf1ON/Od07g9yjqyHYq+yZ/pbSOWrYmiDXmGcu+aT4RF1jaMRVl3l/9uOzxWsmRf7yo/4T6BkpKGAb/MsqmAAAAAElFTkSuQmCC";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/aslanstudyo", icon: "◎" },
  { label: "Facebook", href: "https://www.facebook.com/aslanstudyo", icon: "f" },
  { label: "TikTok", href: "https://www.tiktok.com/@aslanstudyo", icon: "♪" },
  { label: "YouTube", href: "https://www.youtube.com", icon: "▶" },
];

function formatHistoryTime(playedAt) {
  if (!playedAt) return "";
  const date = new Date(Number(playedAt) * 1000);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

export default function RadioPage() {
  const audioRef = useRef(null);
  const lastSongRef = useRef("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = Number(localStorage.getItem("radyoAslanVolume"));
    return Number.isFinite(saved) ? Math.min(Math.max(saved, 0), 1) : 0.8;
  });
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [showQr, setShowQr] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestSong, setRequestSong] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const [notificationEnabled, setNotificationEnabled] = useState(
    typeof Notification !== "undefined" && Notification.permission === "granted"
  );

  const [radioData, setRadioData] = useState({
    title: "Radyo Aslan",
    artist: "Canlı Yayın",
    art: "/radio-logo.png",
    listeners: 0,
    stationName: "Radyo Aslan",
  });

  const [songHistory, setSongHistory] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("radyoAslanFavorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateClock = () => setCurrentTime(
      new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
    );
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setIsPlaying(false);
        setAutoplayBlocked(true);
      }
    };
    tryAutoplay();
  }, []);

  useEffect(() => {
    localStorage.setItem("radyoAslanVolume", String(volume));
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const response = await fetch(NOW_PLAYING_URL, { cache: "no-store" });
        if (!response.ok) throw new Error("Radyo bilgileri alınamadı.");
        const data = await response.json();

        const nextSong = {
          title: data?.now_playing?.song?.title || data?.now_playing?.song?.text || "Radyo Aslan",
          artist: data?.now_playing?.song?.artist || "Kesintisiz Müzik",
          art: data?.now_playing?.song?.art || "/radio-logo.png",
          listeners: data?.listeners?.current || 0,
          stationName: data?.station?.name || "Radyo Aslan",
        };

        setRadioData(nextSong);
        setSongHistory(Array.isArray(data?.song_history) ? data.song_history.slice(0, 5) : []);

        const signature = `${nextSong.artist} - ${nextSong.title}`;
        if (
          lastSongRef.current &&
          lastSongRef.current !== signature &&
          notificationEnabled &&
          typeof Notification !== "undefined" &&
          Notification.permission === "granted"
        ) {
          new Notification("Radyo Aslan'da şimdi çalıyor", {
            body: signature,
            icon: nextSong.art || "/radio-logo.png",
          });
        }
        lastSongRef.current = signature;
      } catch (error) {
        console.error("Radyo bilgileri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    getNowPlaying();
    const interval = setInterval(getNowPlaying, 15000);
    return () => clearInterval(interval);
  }, [notificationEnabled]);

  useEffect(() => {
    if (!isPlaying || !duration) return;

    const timer = setInterval(() => {
      setElapsed((current) => Math.min(current + 1, duration));
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  const songSignature = `${radioData.artist} - ${radioData.title}`;
  const isFavorite = favorites.includes(songSignature);

  const toggleFavorite = () => {
    setFavorites((current) => {
      const next = current.includes(songSignature)
        ? current.filter((item) => item !== songSignature)
        : [songSignature, ...current].slice(0, 50);

      localStorage.setItem("radyoAslanFavorites", JSON.stringify(next));
      return next;
    });
  };

  const formatSeconds = (total) => {
    const safe = Math.max(0, Number(total) || 0);
    const minutes = Math.floor(safe / 60);
    const seconds = Math.floor(safe % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleCoverMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: Number((y * -10).toFixed(2)),
      y: Number((x * 10).toFixed(2)),
    });
  };

  const resetCoverTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Yayın başlatılamadı:", error);
      setAutoplayBlocked(true);
    }
  };


  const submitSongRequest = (event) => {
    event.preventDefault();

    if (!requestSong.trim()) {
      alert("Lütfen istediğiniz şarkıyı yazın.");
      return;
    }

    const message = [
      "Merhaba Radyo Aslan, şarkı isteğim var.",
      requestName.trim() ? `Ad: ${requestName.trim()}` : null,
      `Şarkı: ${requestSong.trim()}`,
      requestNote.trim() ? `Not: ${requestNote.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/905333229560?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setShowRequest(false);
    setRequestSong("");
    setRequestNote("");
  };

  const requestNotifications = async () => {
    if (typeof Notification === "undefined") {
      alert("Tarayıcınız bildirim özelliğini desteklemiyor.");
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationEnabled(permission === "granted");
  };

  return (
    <main className="radio-page">
      <div className="light-beam"></div>
      <div className="light-beam two"></div>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050505; }
        button, input, a { font: inherit; }

        .radio-page {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          padding: 34px 22px 155px;
          color: #fff;
          font-family: Inter, Arial, Helvetica, sans-serif;
          background: #070707;
        }

        .dynamic-backdrop {
          position: fixed;
          inset: -8%;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          background: #070707;
        }

        .dynamic-backdrop img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(88px) saturate(1.85) contrast(1.08) brightness(.46);
          transform: scale(1.14);
          opacity: .72;
          transition: opacity .8s ease;
          animation: backdropDrift 18s ease-in-out infinite alternate;
        }

        .dynamic-backdrop::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 52% 18%, rgba(255,255,255,.08), transparent 26%),
            radial-gradient(circle at 18% 72%, rgba(255,0,0,.13), transparent 34%),
            radial-gradient(circle at 88% 66%, rgba(255,70,70,.10), transparent 32%),
            linear-gradient(180deg, rgba(0,0,0,.16), rgba(0,0,0,.78) 72%, #070707 100%);
          animation: atmosphereShift 13s ease-in-out infinite alternate;
        }

        .dynamic-backdrop::before {
          content: "";
          position: absolute;
          inset: -20%;
          background:
            conic-gradient(
              from 180deg at 50% 50%,
              transparent 0deg,
              rgba(255, 0, 0, .10) 70deg,
              transparent 145deg,
              rgba(255, 255, 255, .045) 225deg,
              transparent 315deg
            );
          filter: blur(45px);
          mix-blend-mode: screen;
          animation: auraRotate 28s linear infinite;
        }

        .ambient-orb {
          position: fixed;
          z-index: 1;
          width: 430px;
          height: 430px;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          opacity: .18;
          background: #ec1717;
          animation: orbFloat 11s ease-in-out infinite alternate;
        }

        .ambient-orb.one { left: -160px; top: 22%; }
        .ambient-orb.two { right: -180px; bottom: 8%; animation-delay: 2s; }

        .intro-screen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          background: #020202;
          transition: opacity .5s ease, visibility .5s ease;
        }

        .intro-screen.is-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .intro-inner {
          text-align: center;
          animation: introScale 1.2s ease both;
        }

        .intro-inner img {
          width: min(330px,72vw);
          filter: drop-shadow(0 0 30px rgba(255,0,0,.35));
        }

        .intro-inner p {
          margin: 12px 0 0;
          color: rgba(255,255,255,.75);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 5px;
        }

        .spotify-shell {
          position: relative;
          z-index: 2;
          width: min(1180px, 100%);
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 30px;
        }

        .station-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .station-brand img {
          width: 58px;
          height: 58px;
          object-fit: contain;
          filter: drop-shadow(0 0 18px rgba(255,0,0,.28));
        }

        .station-brand strong,
        .station-brand span {
          display: block;
        }

        .station-brand strong {
          font-size: 18px;
          font-weight: 900;
        }

        .station-brand span {
          margin-top: 3px;
          color: rgba(255,255,255,.5);
          font-size: 12px;
        }

        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 10px 15px;
          border: 1px solid rgba(255,45,45,.42);
          border-radius: 999px;
          background: rgba(160,0,0,.18);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .live-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #ff2a2a;
          animation: livePulse 1.45s infinite;
        }

        .hero-player {
          display: grid;
          grid-template-columns: minmax(330px, 500px) minmax(0, 1fr);
          gap: clamp(34px, 5vw, 76px);
          align-items: center;
          padding: clamp(24px, 4vw, 48px);
          border: 1px solid rgba(255,255,255,.13);
          border-radius: 34px;
          background:
            linear-gradient(145deg, rgba(255,255,255,.105), rgba(255,255,255,.035));
          box-shadow:
            0 42px 100px rgba(0,0,0,.52),
            inset 0 1px 0 rgba(255,255,255,.12);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
        }

        .big-cover-wrap {
          position: relative;
          aspect-ratio: 1 / 1;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          perspective: 1100px;
        }

        .big-cover-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 30px;
          background:
            linear-gradient(135deg, rgba(255,255,255,.13), transparent 34%),
            radial-gradient(circle at 75% 20%, rgba(255,255,255,.09), transparent 28%);
          mix-blend-mode: screen;
          opacity: .55;
          transform: translateZ(25px);
        }

        .big-cover-glow {
          position: absolute;
          inset: 7%;
          z-index: -1;
          border-radius: 38px;
          background: #ef2020;
          filter: blur(52px);
          opacity: .32;
          animation: coverGlow 4s ease-in-out infinite;
        }

        .big-cover {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 30px;
          background: #111;
          box-shadow:
            0 32px 78px rgba(0,0,0,.58),
            0 0 0 1px rgba(255,255,255,.08);
          transform:
            rotateX(var(--tilt-x, 0deg))
            rotateY(var(--tilt-y, 0deg))
            scale(1);
          transform-style: preserve-3d;
          will-change: transform;
          transition: transform .22s ease, box-shadow .25s ease;
        }

        .big-cover-wrap:hover .big-cover {
          box-shadow:
            0 38px 92px rgba(0,0,0,.66),
            0 0 35px rgba(255,0,0,.16),
            0 0 0 1px rgba(255,255,255,.12);
        }

        .big-cover.is-playing {
          animation: coverBreath 4.5s ease-in-out infinite;
        }

        .hero-copy {
          min-width: 0;
        }

        .eyebrow {
          margin: 0 0 13px;
          color: #ff4141;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .title-window {
          position: relative;
          width: 100%;
          min-width: 0;
          overflow: hidden;
          padding-inline: 2px;
          mask-image: linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%);
        }

        .hero-title {
          margin: 0;
          color: #fff;
          font-size: clamp(34px, 5vw, 68px);
          font-weight: 950;
          line-height: 1.02;
          letter-spacing: -1.8px;
          white-space: nowrap;
        }

        .hero-title.static {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hero-title.marquee {
          display: inline-flex;
          width: max-content;
          gap: 72px;
          will-change: transform;
          animation: titleMarquee 16s linear infinite;
        }

        .hero-title.marquee:hover {
          animation-play-state: paused;
        }

        .hero-title.marquee span {
          flex: 0 0 auto;
          padding-right: 2px;
        }

        .hero-artist {
          margin: 15px 0 0;
          color: rgba(255,255,255,.62);
          font-size: clamp(17px, 2vw, 23px);
          font-weight: 700;
        }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 24px 0 0;
        }

        .meta-pill {
          padding: 9px 13px;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 999px;
          color: rgba(255,255,255,.72);
          background: rgba(0,0,0,.2);
          font-size: 12px;
          font-weight: 800;
        }

        .premium-equalizer {
          position: relative;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 3px;
          margin: 25px 0 8px;
          overflow: hidden;
          padding: 8px 2px;
          mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);
        }

        .premium-equalizer::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 5px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,55,55,.4), transparent);
          box-shadow: 0 0 18px rgba(255,0,0,.24);
        }

        .premium-equalizer span {
          flex: 1 1 0;
          min-width: 2px;
          max-width: 5px;
          height: var(--bar-height);
          border-radius: 999px;
          transform-origin: center;
          background:
            linear-gradient(to top, #520000 0%, #c70000 34%, #ff2828 68%, #ff8b8b 100%);
          box-shadow:
            0 0 8px rgba(255,0,0,.38),
            0 0 20px rgba(255,0,0,.12);
          animation:
            eqPulse var(--speed) cubic-bezier(.35,.05,.55,.95) infinite alternate,
            eqGlow 1.8s ease-in-out infinite alternate;
          animation-delay: var(--delay), calc(var(--delay) * .4);
          animation-play-state: var(--equalizer-state), var(--equalizer-state);
          will-change: transform, opacity, filter;
        }

        .content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(300px, .75fr);
          gap: 22px;
          margin-top: 22px;
        }

        .glass-panel {
          padding: 24px;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 24px;
          background: rgba(13,13,13,.56);
          box-shadow: 0 25px 60px rgba(0,0,0,.32);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 15px;
        }

        .section-head h2 {
          margin: 0;
          font-size: 19px;
          font-weight: 900;
        }

        .section-head span {
          color: rgba(255,255,255,.42);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .9px;
          text-transform: uppercase;
        }

        .history-list {
          display: grid;
          gap: 9px;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          padding: 10px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 15px;
          background: rgba(255,255,255,.035);
          transition: transform .2s ease, background .2s ease;
        }

        .history-item:hover {
          transform: translateX(4px);
          background: rgba(255,255,255,.075);
        }

        .history-item img {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          border-radius: 11px;
          object-fit: cover;
          background: #111;
        }

        .history-copy {
          min-width: 0;
          flex: 1;
        }

        .history-copy strong,
        .history-copy span {
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .history-copy strong {
          font-size: 13px;
          line-height: 1.35;
        }

        .history-copy span {
          margin-top: 4px;
          color: rgba(255,255,255,.5);
          font-size: 11px;
        }

        .history-time {
          flex-shrink: 0;
          color: rgba(255,255,255,.34);
          font-size: 10px;
          font-weight: 800;
        }

        .history-empty {
          margin: 0;
          padding: 18px;
          border-radius: 14px;
          color: rgba(255,255,255,.48);
          background: rgba(0,0,0,.18);
          font-size: 12px;
          text-align: center;
        }

        .status-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 11px;
        }

        .status-box {
          padding: 16px 12px;
          border: 1px solid rgba(255,255,255,.075);
          border-radius: 16px;
          background: rgba(255,255,255,.035);
          text-align: center;
        }

        .status-box strong {
          display: block;
          margin-bottom: 5px;
          font-size: 20px;
        }

        .status-box span {
          color: rgba(255,255,255,.48);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .6px;
          text-transform: uppercase;
        }

        .action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 12px;
        }

        .action-button,
        .social-link,
        .home-link {
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 12px;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 13px;
          color: #fff;
          background: rgba(255,255,255,.045);
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }

        .action-button:hover,
        .social-link:hover,
        .home-link:hover {
          transform: translateY(-2px);
          border-color: rgba(255,50,50,.55);
          background: rgba(180,0,0,.16);
        }

        .request-button {
          border-color: rgba(255,45,45,.42);
          background: linear-gradient(135deg, rgba(220,0,0,.3), rgba(90,0,0,.18));
        }

        .social-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 12px;
        }

        .social-icon {
          width: 23px;
          height: 23px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255,255,255,.09);
          font-weight: 900;
        }

        .home-link {
          margin-top: 11px;
          border-color: rgba(255,45,45,.32);
          background: linear-gradient(135deg, rgba(210,0,0,.25), rgba(80,0,0,.16));
        }

        .autoplay-note {
          margin: 12px 0 0;
          padding: 11px 13px;
          border: 1px solid rgba(255,70,70,.22);
          border-radius: 13px;
          color: #ffd9d9;
          background: rgba(150,0,0,.11);
          font-size: 11px;
          line-height: 1.45;
          text-align: center;
        }

        .footer-note {
          margin: 17px 0 0;
          color: rgba(255,255,255,.32);
          font-size: 10px;
          text-align: center;
        }

        .bottom-player {
          position: fixed;
          left: 20px;
          right: 20px;
          bottom: 16px;
          z-index: 5000;
          display: grid;
          grid-template-columns: minmax(230px, 1fr) minmax(310px, 620px) minmax(230px, 1fr);
          align-items: center;
          gap: 22px;
          min-height: 104px;
          padding: 13px 18px;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 24px;
          background:
            linear-gradient(135deg, rgba(22,22,22,.90), rgba(7,7,7,.84));
          box-shadow:
            0 28px 85px rgba(0,0,0,.64),
            inset 0 1px 0 rgba(255,255,255,.08),
            0 0 45px rgba(255,0,0,.06);
          backdrop-filter: blur(34px) saturate(1.2);
          -webkit-backdrop-filter: blur(34px) saturate(1.2);
        }

        .bottom-player::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          border-radius: inherit;
          background:
            radial-gradient(circle at 42% 0%, rgba(255,0,0,.10), transparent 35%),
            linear-gradient(90deg, rgba(255,255,255,.025), transparent 35%, rgba(255,255,255,.018));
          pointer-events: none;
        }

        .mini-song {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .mini-disc {
          position: relative;
          width: 70px;
          height: 70px;
          flex-shrink: 0;
          border-radius: 50%;
          padding: 5px;
          background:
            repeating-radial-gradient(circle, #151515 0 4px, #262626 5px 7px);
          box-shadow:
            0 10px 26px rgba(0,0,0,.48),
            0 0 18px rgba(255,0,0,.14);
        }

        .mini-disc.is-spinning {
          animation: discSpin 8s linear infinite;
        }

        .mini-disc::after {
          content: "";
          position: absolute;
          inset: 45%;
          border-radius: 50%;
          background: #101010;
          box-shadow: 0 0 0 2px rgba(255,255,255,.22);
        }

        .mini-disc img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
          object-fit: cover;
          background: #111;
        }

        .mini-copy {
          min-width: 0;
        }

        .mini-copy strong,
        .mini-copy span {
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .mini-copy strong { font-size: 13px; }
        .mini-copy span {
          margin-top: 5px;
          color: rgba(255,255,255,.48);
          font-size: 11px;
        }

        .player-center {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
        }

        .play-button {
          width: 64px;
          height: 64px;
          border: 0;
          border-radius: 50%;
          color: #fff;
          background: linear-gradient(145deg, #ff2626, #a80000);
          box-shadow:
            0 13px 33px rgba(255,0,0,.34),
            inset 0 1px 1px rgba(255,255,255,.28);
          cursor: pointer;
          font-size: 25px;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .play-button:hover {
          transform: scale(1.06);
          box-shadow:
            0 16px 40px rgba(255,0,0,.48),
            inset 0 1px 1px rgba(255,255,255,.28);
        }

        .volume-area {
          justify-self: end;
          width: min(320px, 100%);
        }

        .volume-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 7px;
          color: rgba(255,255,255,.6);
          font-size: 10px;
          font-weight: 800;
        }

        .volume-slider {
          width: 100%;
          accent-color: #e80000;
          cursor: pointer;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9000;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0,0,0,.82);
          backdrop-filter: blur(10px);
          animation: modalFade .25s ease both;
        }

        .modal-card {
          width: min(390px,100%);
          padding: 26px;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 25px;
          background: linear-gradient(145deg,#1d1d1d,#0d0d0d);
          box-shadow: 0 32px 90px rgba(0,0,0,.78),0 0 55px rgba(255,0,0,.12);
          text-align: center;
          animation: modalPop .35s cubic-bezier(.2,.8,.2,1) both;
        }

        .qr-image {
          width: 230px;
          max-width: 100%;
          padding: 10px;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 0 30px rgba(255,255,255,.12);
        }

        .modal-card h3 { margin: 17px 0 7px; font-size: 21px; }
        .modal-card p {
          margin: 0 0 17px;
          color: rgba(255,255,255,.56);
          font-size: 13px;
          line-height: 1.5;
        }

        .modal-close,
        .request-submit {
          width: 100%;
          min-height: 46px;
          border: 0;
          border-radius: 13px;
          color: #fff;
          background: linear-gradient(135deg,#e00000,#8e0000);
          cursor: pointer;
          font-weight: 900;
        }

        .request-form { display: grid; gap: 12px; text-align: left; }
        .request-form label {
          display: grid;
          gap: 6px;
          color: rgba(255,255,255,.72);
          font-size: 12px;
          font-weight: 800;
        }

        .request-form input,
        .request-form textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 12px;
          padding: 12px 13px;
          color: #fff;
          background: rgba(255,255,255,.06);
          outline: none;
        }

        .request-form textarea { min-height: 86px; resize: vertical; }

        .request-form input:focus,
        .request-form textarea:focus {
          border-color: rgba(255,45,45,.65);
          box-shadow: 0 0 0 3px rgba(255,0,0,.1);
        }

        .modal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 4px;
        }

        .secondary-button {
          min-height: 46px;
          border: 1px solid rgba(255,255,255,.13);
          border-radius: 13px;
          color: #fff;
          background: rgba(255,255,255,.06);
          cursor: pointer;
          font-weight: 800;
        }


        .particle-field {
          position: fixed;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
        }

        .particle-field span {
          position: absolute;
          bottom: -20px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 45, 45, .72);
          box-shadow: 0 0 12px rgba(255, 0, 0, .65);
          animation: particleRise var(--particle-speed) linear infinite;
          animation-delay: var(--particle-delay);
          opacity: var(--particle-opacity);
        }

        .song-transition {
          animation: songReveal .65s cubic-bezier(.2,.8,.2,1) both;
        }

        .favorite-button {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          color: #fff;
          background: rgba(255,255,255,.055);
          cursor: pointer;
          font-size: 20px;
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }

        .favorite-button:hover {
          transform: scale(1.06);
          border-color: rgba(255,55,55,.55);
          background: rgba(180,0,0,.18);
        }

        .favorite-button.active {
          color: #ff3c3c;
          border-color: rgba(255,55,55,.55);
          background: rgba(190,0,0,.2);
        }

        .progress-area {
          min-width: 0;
          width: min(520px, 100%);
        }

        .progress-track {
          position: relative;
          height: 5px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255,255,255,.16);
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg,#bd0000,#ff3838);
          box-shadow: 0 0 12px rgba(255,0,0,.35);
          transition: width 1s linear;
        }

        .progress-time {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-top: 6px;
          color: rgba(255,255,255,.42);
          font-size: 9px;
          font-weight: 800;
        }

        .player-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .icon-control {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.11);
          border-radius: 50%;
          color: #fff;
          background: rgba(255,255,255,.05);
          cursor: pointer;
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }

        .icon-control:hover {
          transform: translateY(-1px) scale(1.04);
          border-color: rgba(255,55,55,.48);
          background: rgba(170,0,0,.17);
        }

        .icon-control.active {
          color: #ff4545;
          border-color: rgba(255,55,55,.5);
          background: rgba(180,0,0,.18);
        }

        @keyframes particleRise {
          from {
            transform: translate3d(0, 0, 0) scale(.7);
            opacity: 0;
          }
          15% { opacity: var(--particle-opacity); }
          to {
            transform: translate3d(var(--particle-drift), -115vh, 0) scale(1.35);
            opacity: 0;
          }
        }

        @keyframes songReveal {
          from {
            opacity: 0;
            transform: translateY(12px) scale(.985);
            filter: blur(7px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes atmosphereShift {
          from {
            opacity: .82;
            transform: translate3d(-1%, 0, 0) scale(1);
          }
          to {
            opacity: 1;
            transform: translate3d(1.5%, -1%, 0) scale(1.04);
          }
        }

        @keyframes auraRotate {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.08); }
        }

        @keyframes eqGlow {
          from { filter: brightness(.8) saturate(1); }
          to { filter: brightness(1.32) saturate(1.35); }
        }

        @keyframes discSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes backdropDrift {
          from { transform: scale(1.14) translate3d(-1.5%, -1%, 0); }
          to { transform: scale(1.22) translate3d(1.5%, 1%, 0); }
        }

        @keyframes orbFloat {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to { transform: translate3d(70px, -45px, 0) scale(1.18); }
        }

        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(255,37,37,.65); }
          70% { box-shadow: 0 0 0 11px rgba(255,37,37,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,37,37,0); }
        }

        @keyframes coverBreath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.018); }
        }

        @keyframes coverGlow {
          0%, 100% { opacity: .25; transform: scale(.98); }
          50% { opacity: .42; transform: scale(1.04); }
        }

        @keyframes eqPulse {
          from { transform: scaleY(.25); opacity: .48; }
          to { transform: scaleY(1); opacity: 1; }
        }

        @keyframes introScale {
          from { opacity: 0; transform: scale(.72); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes titleMarquee {
          0%, 8% { transform: translateX(0); }
          92%, 100% { transform: translateX(calc(-50% - 36px)); }
        }

        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalPop {
          from { opacity: 0; transform: translateY(18px) scale(.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }

          .hero-title.marquee {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        @media (max-width: 920px) {
          .hero-player {
            grid-template-columns: 1fr;
          }

          .big-cover-wrap {
            max-width: 410px;
          }

          .content-grid {
            grid-template-columns: 1fr;
          }

          .bottom-player {
            grid-template-columns: 1fr auto;
          }

          .volume-area {
            grid-column: 1 / -1;
            justify-self: stretch;
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .radio-page {
            padding: 14px 10px 150px;
          }

          .spotify-shell {
            width: 100%;
          }

          .topbar {
            align-items: flex-start;
          }

          .station-brand span {
            display: none;
          }

          .hero-player {
            gap: 20px;
            padding: 15px;
            border-radius: 23px;
          }

          .topbar {
            margin-bottom: 15px;
          }

          .station-brand img {
            width: 46px;
            height: 46px;
          }

          .station-brand strong {
            font-size: 15px;
          }

          .live-badge {
            padding: 8px 10px;
            font-size: 10px;
          }

          .big-cover-wrap {
            max-width: min(330px, 86vw);
          }

          .hero-title {
            font-size: clamp(29px, 10vw, 38px);
            letter-spacing: -1px;
          }

          .hero-copy {
            text-align: center;
          }

          .hero-meta,
          .premium-equalizer {
            justify-content: center;
          }

          .hero-meta {
            gap: 7px;
          }

          .meta-pill {
            padding: 7px 10px;
            font-size: 10px;
          }

          .premium-equalizer {
            height: 72px;
            gap: 2px;
            margin: 16px 0 2px;
          }

          .premium-equalizer span {
            min-width: 2px;
            max-width: 4px;
          }

          .content-grid {
            gap: 14px;
          }

          .glass-panel {
            padding: 18px;
          }

          .action-grid,
          .status-grid {
            grid-template-columns: 1fr;
          }

          .bottom-player {
            left: 8px;
            right: 8px;
            bottom: 8px;
            grid-template-columns: minmax(0,1fr) auto;
            gap: 10px;
            min-height: 84px;
            padding: 9px 10px;
            border-radius: 18px;
          }

          .mini-disc {
            width: 54px;
            height: 54px;
            padding: 4px;
          }

          .mini-copy strong {
            font-size: 12px;
          }

          .play-button {
            width: 52px;
            height: 52px;
            font-size: 21px;
          }

          .volume-area {
            display: none;
          }

          .progress-area {
            display: none;
          }

          .favorite-button,
          .icon-control {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }

          .player-actions {
            gap: 7px;
          }

          .mini-copy span {
            display: none;
          }

          .content-grid {
            margin-top: 14px;
          }

          .history-item img {
            width: 46px;
            height: 46px;
          }
        }
`}</style>

      
      <div className="dynamic-backdrop" aria-hidden="true">
        <img
          key={radioData.art}
          src={radioData.art || "/radio-background.jpg"}
          alt=""
          onError={(event) => {
            event.currentTarget.src = "/radio-background.jpg";
          }}
        />
      </div>
      <div className="ambient-orb one" aria-hidden="true"></div>
      <div className="ambient-orb two" aria-hidden="true"></div>
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 41) % 100}%`,
              "--particle-speed": `${9 + (index % 8) * 1.4}s`,
              "--particle-delay": `${(index % 11) * -1.25}s`,
              "--particle-opacity": `${0.18 + (index % 5) * 0.08}`,
              "--particle-drift": `${-55 + (index % 9) * 14}px`,
            }}
          ></span>
        ))}
      </div>

      <div className={`intro-screen ${showIntro ? "" : "is-hidden"}`}>
        <div className="intro-inner">
          <img src="/radio-logo.png" alt="Radyo Aslan" />
          <p>ASLAN STÜDYO SUNAR</p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={STREAM_URL}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <section className="spotify-shell">
        <header className="topbar">
          <div className="station-brand">
            <img src="/radio-logo.png" alt="Radyo Aslan" />
            <div>
              <strong>Radyo Aslan</strong>
              <span>Nevşehir’den Türkiye’ye 7/24 kesintisiz müzik</span>
            </div>
          </div>

          <div className="live-badge">
            <span className="live-dot"></span>
            CANLI YAYIN · {currentTime}
          </div>
        </header>

        <section className="hero-player song-transition" key={`${radioData.artist}-${radioData.title}`}>
          <div
            className="big-cover-wrap"
            onMouseMove={handleCoverMove}
            onMouseLeave={resetCoverTilt}
          >
            <div className="big-cover-glow"></div>
            <img
              className={`big-cover ${isPlaying ? "is-playing" : ""}`}
              style={{
                "--tilt-x": `${tilt.x}deg`,
                "--tilt-y": `${tilt.y}deg`,
              }}
              src={radioData.art}
              alt={radioData.title}
              onError={(event) => {
                event.currentTarget.src = "/radio-logo.png";
              }}
            />
          </div>

          <div className="hero-copy">
            <p className="eyebrow">
              {loading ? "Yükleniyor" : "Şu an çalıyor"}
            </p>

            <div className="title-window">
              {radioData.title.length > 24 ? (
                <h1 className="hero-title marquee">
                  <span>{radioData.title}</span>
                  <span aria-hidden="true">{radioData.title}</span>
                </h1>
              ) : (
                <h1 className="hero-title static">{radioData.title}</h1>
              )}
            </div>

            <p className="hero-artist">{radioData.artist}</p>

            <div className="hero-meta">
              <span className="meta-pill">👥 {radioData.listeners} dinleyici</span>
              <span className="meta-pill">
                {isPlaying ? "🟢 Yayında" : "⚪ Hazır"}
              </span>
              <span className="meta-pill">📍 Nevşehir, Türkiye</span>
            </div>

            <div
              className="premium-equalizer"
              style={{
                "--equalizer-state": isPlaying ? "running" : "paused",
              }}
              aria-hidden="true"
            >
              {Array.from({ length: 56 }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    "--bar-height": `${18 + ((index * 23) % 72)}px`,
                    "--speed": `${0.42 + (index % 11) * 0.055}s`,
                    "--delay": `${(index % 14) * -0.052}s`,
                  }}
                ></span>
              ))}
            </div>

            {autoplayBlocked && (
              <p className="autoplay-note">
                ℹ️ Tarayıcı otomatik oynatmayı engelledi. Alttaki kırmızı
                oynatma düğmesine bir kez bas.
              </p>
            )}
          </div>
        </section>

        <section className="content-grid">
          <div className="glass-panel">
            <div className="section-head">
              <h2>Son Çalanlar</h2>
              <span>Son 5 şarkı</span>
            </div>

            <div className="history-list">
              {songHistory.length > 0 ? (
                songHistory.map((item, index) => {
                  const song = item?.song || {};

                  return (
                    <div
                      className="history-item"
                      key={`${item?.played_at || "song"}-${index}`}
                    >
                      <img
                        src={song?.art || "/radio-logo.png"}
                        alt={song?.title || "Radyo Aslan"}
                        onError={(event) => {
                          event.currentTarget.src = "/radio-logo.png";
                        }}
                      />

                      <div className="history-copy">
                        <strong>
                          {song?.title || song?.text || "Bilinmeyen Şarkı"}
                        </strong>
                        <span>{song?.artist || "Radyo Aslan"}</span>
                      </div>

                      <span className="history-time">
                        {formatHistoryTime(item?.played_at)}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="history-empty">
                  Son çalan şarkılar yükleniyor...
                </p>
              )}
            </div>
          </div>

          <aside className="glass-panel">
            <div className="section-head">
              <h2>Radyo Aslan</h2>
              <span>Hızlı işlemler</span>
            </div>

            <div className="status-grid">
              <div className="status-box">
                <strong>{radioData.listeners}</strong>
                <span>Anlık dinleyici</span>
              </div>
              <div className="status-box">
                <strong>{isPlaying ? "Canlı" : "Hazır"}</strong>
                <span>Yayın durumu</span>
              </div>
            </div>

            <div className="action-grid">
              <button
                type="button"
                className="action-button request-button"
                onClick={() => setShowRequest(true)}
              >
                ❤️ Şarkı İste
              </button>

              <button
                type="button"
                className="action-button"
                onClick={() => setShowQr(true)}
              >
                📱 QR Kod
              </button>

              <button
                type="button"
                className="action-button"
                onClick={requestNotifications}
              >
                🔔 {notificationEnabled ? "Bildirim Açık" : "Bildirimleri Aç"}
              </button>

              <button
                type="button"
                className="action-button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(RADIO_PAGE_URL);
                    alert("Radyo bağlantısı kopyalandı.");
                  } catch {
                    alert(RADIO_PAGE_URL);
                  }
                }}
              >
                🔗 Bağlantıyı Kopyala
              </button>
            </div>

            <div className="social-grid">
              {SOCIAL_LINKS.map((item) => (
                <a
                  className="social-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  key={item.label}
                >
                  <span className="social-icon">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>

            <a className="home-link" href="/">
              Aslan Stüdyo Ana Sayfasına Dön
            </a>

            <p className="footer-note">
              © {new Date().getFullYear()} Radyo Aslan
            </p>
          </aside>
        </section>
      </section>

      <section className="bottom-player" aria-label="Radyo oynatıcı">
        <div className="mini-song">
          <div className={`mini-disc ${isPlaying ? "is-spinning" : ""}`}>
            <img
              src={radioData.art}
              alt={radioData.title}
              onError={(event) => {
                event.currentTarget.src = "/radio-logo.png";
              }}
            />
          </div>
          <div className="mini-copy">
            <strong>{radioData.title}</strong>
            <span>{radioData.artist}</span>
          </div>
        </div>

        <div className="player-center">
          <div className="player-actions">
            <button
              type="button"
              className={`favorite-button ${isFavorite ? "active" : ""}`}
              onClick={toggleFavorite}
              aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
              title={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
            >
              {isFavorite ? "♥" : "♡"}
            </button>

            <button
              type="button"
              className={`icon-control ${isMuted ? "active" : ""}`}
              onClick={toggleMute}
              aria-label={isMuted ? "Sesi aç" : "Sesi kapat"}
              title={isMuted ? "Sesi aç" : "Sesi kapat"}
            >
              {isMuted || volume === 0 ? "🔇" : volume < 0.45 ? "🔉" : "🔊"}
            </button>

            <button
              type="button"
              className="play-button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Radyoyu duraklat" : "Radyoyu başlat"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          </div>

          <div className="progress-area">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: duration
                    ? `${Math.min((elapsed / duration) * 100, 100)}%`
                    : "0%",
                }}
              ></div>
            </div>
            <div className="progress-time">
              <span>{formatSeconds(elapsed)}</span>
              <span>{duration ? formatSeconds(duration) : "CANLI"}</span>
            </div>
          </div>
        </div>

        <div className="volume-area">
          <div className="volume-head">
            <span>Ses seviyesi</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>

          <input
            className="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            aria-label="Ses seviyesi"
          />
        </div>
      </section>


      {showQr && (
        <div className="modal-backdrop" onClick={()=>setShowQr(false)}>
          <div className="modal-card" onClick={(event)=>event.stopPropagation()}>
            <img className="qr-image" src={QR_CODE} alt="Radyo Aslan QR kodu"/>
            <h3>Telefondan Dinle</h3>
            <p>Telefonunun kamerasıyla QR kodu okut ve Radyo Aslan’ı hemen aç.</p>
            <button type="button" className="modal-close" onClick={()=>setShowQr(false)}>Kapat</button>
          </div>
        </div>
      )}

      {showRequest && (
        <div className="modal-backdrop" onClick={()=>setShowRequest(false)}>
          <div className="modal-card" onClick={(event)=>event.stopPropagation()}>
            <h3>❤️ Şarkı İste</h3>
            <p>İsteğini yaz; WhatsApp üzerinden Radyo Aslan’a gönderilsin.</p>
            <form className="request-form" onSubmit={submitSongRequest}>
              <label>
                Adınız
                <input value={requestName} onChange={(event)=>setRequestName(event.target.value)} placeholder="Adınız (isteğe bağlı)"/>
              </label>
              <label>
                İstenen şarkı *
                <input required value={requestSong} onChange={(event)=>setRequestSong(event.target.value)} placeholder="Sanatçı - Şarkı adı"/>
              </label>
              <label>
                Mesajınız
                <textarea value={requestNote} onChange={(event)=>setRequestNote(event.target.value)} placeholder="Eklemek istediğiniz kısa not"/>
              </label>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={()=>setShowRequest(false)}>Vazgeç</button>
                <button type="submit" className="request-submit">WhatsApp’a Gönder</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
