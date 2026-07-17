import { useEffect, useMemo, useRef, useState } from "react";

const STREAM_URL = "https://radyo.aslanstudyo.com/listen/radyoaslan/radio.mp3";
const NOW_PLAYING_URL = "https://radyo.aslanstudyo.com/api/nowplaying/radyoaslan";
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

  const requestMessage = useMemo(
    () => encodeURIComponent("Merhaba Radyo Aslan, şu şarkıyı çalar mısınız?\n\nŞarkı: "),
    []
  );

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
      <style>{`
        *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:#050505}
        button,input,a{font:inherit}
        .radio-page{position:relative;min-height:100vh;overflow-x:hidden;padding:34px 22px;color:#fff;font-family:Inter,Arial,Helvetica,sans-serif;background:linear-gradient(rgba(0,0,0,.76),rgba(0,0,0,.82)),url('/radio-background.jpg') center/cover fixed no-repeat,radial-gradient(circle at 70% 18%,rgba(255,0,0,.25),transparent 35%),#050505}
        .radio-page:before,.radio-page:after{content:"";position:fixed;width:540px;height:540px;border-radius:50%;filter:blur(120px);pointer-events:none;opacity:.16;background:#e00000;animation:glowMove 10s ease-in-out infinite alternate}
        .radio-page:before{left:-220px;bottom:-260px}.radio-page:after{top:-260px;right:-220px;animation-delay:2s}
        .intro-screen{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#020202;transition:opacity .5s ease,visibility .5s ease}.intro-screen.is-hidden{opacity:0;visibility:hidden;pointer-events:none}.intro-inner{text-align:center;animation:introScale 1.2s ease both}.intro-inner img{width:min(330px,72vw);filter:drop-shadow(0 0 30px rgba(255,0,0,.35))}.intro-inner p{margin:12px 0 0;color:rgba(255,255,255,.75);font-size:14px;font-weight:800;letter-spacing:5px}
        .radio-layout{position:relative;z-index:2;width:min(1120px,100%);margin:0 auto;display:grid;grid-template-columns:440px minmax(0,560px);justify-content:center;align-items:start;gap:48px}
        .brand-side{position:sticky;top:34px;min-height:calc(100vh - 68px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.brand-logo{width:min(420px,100%);object-fit:contain;filter:drop-shadow(0 0 18px rgba(255,0,0,.25)) drop-shadow(0 22px 40px rgba(0,0,0,.75));animation:logoFloat 4s ease-in-out infinite}.brand-title{margin:22px 0 0;max-width:430px;font-size:clamp(24px,2.4vw,34px);line-height:1.34;font-weight:900}.brand-title span{color:#ef2020}.brand-subtitle{margin:14px 0 0;color:rgba(255,255,255,.56);font-size:14px;line-height:1.6}
        .radio-card{width:100%;padding:30px;border:1px solid rgba(255,255,255,.14);border-radius:30px;background:linear-gradient(145deg,rgba(255,255,255,.1),rgba(255,255,255,.035));box-shadow:0 35px 85px rgba(0,0,0,.64),inset 0 1px 0 rgba(255,255,255,.12);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px)}
        .top-row{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:25px}.live-badge{display:inline-flex;align-items:center;gap:10px;padding:10px 15px;border:1px solid rgba(255,45,45,.45);border-radius:999px;background:rgba(200,0,0,.16);font-size:12px;font-weight:900;letter-spacing:1.1px}.live-dot{width:9px;height:9px;border-radius:50%;background:#ff2525;animation:livePulse 1.5s infinite}.clock{color:rgba(255,255,255,.75);font-weight:800}.station-meta{margin:-10px 0 23px;color:rgba(255,255,255,.48);font-size:12px;font-weight:700}
        .now-playing{display:flex;align-items:center;gap:18px;min-width:0}.cover-wrap{position:relative;flex:0 0 104px;width:104px;height:104px}.cover-wrap:after{content:"";position:absolute;inset:-4px;z-index:-1;border-radius:23px;opacity:.35;background:linear-gradient(135deg,#ff2525,transparent);filter:blur(8px)}.cover{width:100%;height:100%;display:block;border-radius:20px;object-fit:cover;background:#111}.cover.is-playing{animation:coverPulse 3s ease-in-out infinite}.song-copy{min-width:0;flex:1}.song-label{margin:0 0 8px;color:#ff3434;font-size:11px;font-weight:900;letter-spacing:1.4px;text-transform:uppercase}.song-title{margin:0;overflow:hidden;color:#fff;font-size:clamp(23px,2.5vw,31px);font-weight:900;line-height:1.15;white-space:nowrap;text-overflow:ellipsis}.song-artist{margin:8px 0 0;overflow:hidden;color:rgba(255,255,255,.6);font-size:15px;white-space:nowrap;text-overflow:ellipsis}
        .equalizer{height:66px;display:flex;align-items:center;justify-content:center;gap:5px;margin:18px 0}.equalizer span{width:5px;border-radius:999px;background:linear-gradient(to top,#9b0000,#ff2d2d);box-shadow:0 0 10px rgba(255,0,0,.35);animation:equalizer 1s ease-in-out infinite;animation-play-state:var(--equalizer-state)}
        .equalizer span:nth-child(1){height:20px}.equalizer span:nth-child(2){height:42px;animation-delay:.15s}.equalizer span:nth-child(3){height:28px;animation-delay:.3s}.equalizer span:nth-child(4){height:56px;animation-delay:.1s}.equalizer span:nth-child(5){height:33px;animation-delay:.25s}.equalizer span:nth-child(6){height:48px;animation-delay:.4s}.equalizer span:nth-child(7){height:24px;animation-delay:.12s}.equalizer span:nth-child(8){height:58px;animation-delay:.32s}.equalizer span:nth-child(9){height:35px;animation-delay:.2s}.equalizer span:nth-child(10){height:46px;animation-delay:.45s}.equalizer span:nth-child(11){height:26px;animation-delay:.18s}.equalizer span:nth-child(12){height:52px;animation-delay:.36s}
        .player-row{display:flex;align-items:center;gap:18px}.play-button{flex:0 0 70px;width:70px;height:70px;border:0;border-radius:50%;color:#fff;background:linear-gradient(145deg,#ff2424,#a90000);box-shadow:0 14px 35px rgba(255,0,0,.33),inset 0 1px 1px rgba(255,255,255,.28);cursor:pointer;font-size:27px;transition:.2s}.play-button:hover{transform:scale(1.06);box-shadow:0 17px 42px rgba(255,0,0,.48),inset 0 1px 1px rgba(255,255,255,.28)}.volume-area{min-width:0;flex:1}.volume-head{display:flex;justify-content:space-between;gap:12px;margin-bottom:9px;color:rgba(255,255,255,.66);font-size:12px;font-weight:800}.volume-slider{width:100%;accent-color:#e80000;cursor:pointer}.autoplay-note{margin:18px 0 0;padding:12px 14px;border:1px solid rgba(255,70,70,.25);border-radius:14px;color:#ffd9d9;background:rgba(170,0,0,.12);font-size:12px;line-height:1.45;text-align:center}
        .status-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:22px}.status-box{padding:15px;border:1px solid rgba(255,255,255,.09);border-radius:16px;background:rgba(0,0,0,.22);text-align:center}.status-box strong{display:block;margin-bottom:5px;font-size:19px}.status-box span{color:rgba(255,255,255,.52);font-size:11px;font-weight:800;letter-spacing:.5px;text-transform:uppercase}
        .action-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-top:18px}.action-button,.social-link,.home-link{min-height:47px;display:flex;align-items:center;justify-content:center;gap:9px;padding:11px 14px;border:1px solid rgba(255,255,255,.11);border-radius:14px;color:#fff;background:rgba(255,255,255,.055);font-size:13px;font-weight:800;text-decoration:none;cursor:pointer;transition:.2s}.action-button:hover,.social-link:hover,.home-link:hover{transform:translateY(-2px);border-color:rgba(255,48,48,.62);background:rgba(190,0,0,.18)}.request-button{border-color:rgba(255,45,45,.45);background:linear-gradient(135deg,rgba(220,0,0,.3),rgba(100,0,0,.2))}
        .history-section{margin-top:24px;padding-top:22px;border-top:1px solid rgba(255,255,255,.09)}.section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:13px}.section-head h2{margin:0;font-size:17px;font-weight:900}.section-head span{color:rgba(255,255,255,.43);font-size:10px;font-weight:800;letter-spacing:.8px;text-transform:uppercase}.history-list{display:grid;gap:8px}.history-item{display:flex;align-items:center;gap:11px;min-width:0;padding:9px;border:1px solid rgba(255,255,255,.075);border-radius:13px;background:rgba(0,0,0,.2)}.history-item img{width:43px;height:43px;flex-shrink:0;border-radius:9px;object-fit:cover;background:#111}.history-copy{min-width:0;flex:1}.history-copy strong,.history-copy span{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.history-copy strong{font-size:12px;line-height:1.35}.history-copy span{margin-top:3px;color:rgba(255,255,255,.5);font-size:10px}.history-time{flex-shrink:0;color:rgba(255,255,255,.34);font-size:10px;font-weight:800}.history-empty{margin:0;padding:16px;border-radius:13px;color:rgba(255,255,255,.48);background:rgba(0,0,0,.18);font-size:12px;text-align:center}
        .social-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:18px}.social-link{min-height:44px;padding:9px;font-size:11px}.social-icon{width:23px;height:23px;display:grid;place-items:center;border-radius:50%;background:rgba(255,255,255,.09);font-weight:900}.home-link{margin-top:11px;border-color:rgba(255,45,45,.35);background:linear-gradient(135deg,rgba(210,0,0,.27),rgba(100,0,0,.2))}.footer-note{margin:22px 0 0;color:rgba(255,255,255,.36);font-size:11px;text-align:center}
        .qr-modal{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;padding:20px;background:rgba(0,0,0,.78);backdrop-filter:blur(8px)}.qr-card{width:min(360px,100%);padding:26px;border:1px solid rgba(255,255,255,.14);border-radius:24px;background:#161616;box-shadow:0 30px 80px rgba(0,0,0,.7);text-align:center}.qr-card img{width:230px;max-width:100%;padding:10px;border-radius:18px;background:#fff}.qr-card h3{margin:17px 0 7px;font-size:20px}.qr-card p{margin:0 0 17px;color:rgba(255,255,255,.55);font-size:13px;line-height:1.5}.qr-close{width:100%;min-height:44px;border:0;border-radius:13px;color:#fff;background:linear-gradient(135deg,#e00000,#8e0000);cursor:pointer;font-weight:900}
        @keyframes logoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes glowMove{from{transform:translate(0,0) scale(1)}to{transform:translate(70px,-45px) scale(1.17)}}@keyframes livePulse{0%{box-shadow:0 0 0 0 rgba(255,37,37,.65)}70%{box-shadow:0 0 0 11px rgba(255,37,37,0)}100%{box-shadow:0 0 0 0 rgba(255,37,37,0)}}@keyframes equalizer{0%,100%{transform:scaleY(.42);opacity:.55}50%{transform:scaleY(1);opacity:1}}@keyframes coverPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}@keyframes introScale{from{opacity:0;transform:scale(.72)}to{opacity:1;transform:scale(1)}}
        @media(max-width:930px){.radio-layout{grid-template-columns:1fr;gap:22px}.brand-side{position:static;min-height:auto}.brand-logo{width:min(350px,84vw)}.brand-subtitle{display:none}.radio-card{width:min(580px,100%);margin:0 auto}}
        @media(max-width:560px){.radio-page{padding:18px 12px;background-attachment:scroll}.radio-card{padding:22px 16px;border-radius:23px}.brand-title{font-size:21px}.cover-wrap{flex-basis:82px;width:82px;height:82px}.song-title{font-size:20px}.song-artist{font-size:13px}.play-button{flex-basis:62px;width:62px;height:62px}.action-grid,.status-grid{grid-template-columns:1fr}.social-grid{grid-template-columns:1fr 1fr}.station-meta{line-height:1.6}}
      `}</style>

      <div className={`intro-screen ${showIntro ? "" : "is-hidden"}`}>
        <div className="intro-inner">
          <img src="/radio-logo.png" alt="Radyo Aslan" />
          <p>ASLAN STÜDYO SUNAR</p>
        </div>
      </div>

      <audio ref={audioRef} src={STREAM_URL} preload="auto" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />

      <section className="radio-layout">
        <aside className="brand-side">
          <img className="brand-logo" src="/radio-logo.png" alt="Radyo Aslan logosu" />
          <h1 className="brand-title">Hatıralar <span>Aslan’la</span>,<br />Müzik <span>Radyo Aslan’la.</span></h1>
          <p className="brand-subtitle">Nevşehir’den Türkiye’ye<br />7/24 kesintisiz müzik yayını</p>
        </aside>

        <section className="radio-card">
          <div className="top-row"><div className="live-badge"><span className="live-dot"></span>CANLI YAYIN</div><div className="clock">{currentTime}</div></div>
          <p className="station-meta">📍 Nevşehir, Türkiye &nbsp;•&nbsp; 🎙️ 7/24 Kesintisiz Müzik</p>

          <div className="now-playing">
            <div className="cover-wrap"><img className={`cover ${isPlaying ? "is-playing" : ""}`} src={radioData.art} alt={radioData.title} onError={(e)=>{e.currentTarget.src="/radio-logo.png"}} /></div>
            <div className="song-copy"><p className="song-label">{loading ? "Yükleniyor" : "Şu an çalıyor"}</p><h2 className="song-title">{radioData.title}</h2><p className="song-artist">{radioData.artist}</p></div>
          </div>

          <div className="equalizer" style={{"--equalizer-state":isPlaying?"running":"paused"}}>{Array.from({length:12}).map((_,i)=><span key={i}></span>)}</div>

          <div className="player-row">
            <button type="button" className="play-button" onClick={togglePlay} aria-label={isPlaying?"Radyoyu duraklat":"Radyoyu başlat"}>{isPlaying?"❚❚":"▶"}</button>
            <div className="volume-area"><div className="volume-head"><span>Ses seviyesi</span><span>{Math.round(volume*100)}%</span></div><input className="volume-slider" type="range" min="0" max="1" step="0.01" value={volume} onChange={(e)=>setVolume(Number(e.target.value))} aria-label="Ses seviyesi" /></div>
          </div>

          {autoplayBlocked && <p className="autoplay-note">ℹ️ Tarayıcı otomatik oynatmayı engelledi. Yayını başlatmak için kırmızı oynatma düğmesine bir kez bas.</p>}

          <div className="status-grid"><div className="status-box"><strong>{radioData.listeners}</strong><span>Anlık dinleyici</span></div><div className="status-box"><strong>{isPlaying?"Yayında":"Hazır"}</strong><span>Yayın durumu</span></div></div>

          <div className="action-grid">
            <a className="action-button request-button" href={`https://wa.me/905333229560?text=${requestMessage}`} target="_blank" rel="noreferrer">❤️ Şarkı İste</a>
            <button type="button" className="action-button" onClick={()=>setShowQr(true)}>📱 QR Kodla Dinle</button>
            <button type="button" className="action-button" onClick={requestNotifications}>🔔 {notificationEnabled?"Bildirimler Açık":"Bildirimleri Aç"}</button>
            <button type="button" className="action-button" onClick={async()=>{try{await navigator.clipboard.writeText(RADIO_PAGE_URL);alert("Radyo bağlantısı kopyalandı.")}catch{alert(RADIO_PAGE_URL)}}}>🔗 Bağlantıyı Kopyala</button>
          </div>

          <section className="history-section">
            <div className="section-head"><h2>Son Çalanlar</h2><span>Son 5 şarkı</span></div>
            <div className="history-list">
              {songHistory.length>0 ? songHistory.map((item,index)=>{const song=item?.song||{};return <div className="history-item" key={`${item?.played_at||"song"}-${index}`}><img src={song?.art||"/radio-logo.png"} alt={song?.title||"Radyo Aslan"} onError={(e)=>{e.currentTarget.src="/radio-logo.png"}}/><div className="history-copy"><strong>{song?.title||song?.text||"Bilinmeyen Şarkı"}</strong><span>{song?.artist||"Radyo Aslan"}</span></div><span className="history-time">{formatHistoryTime(item?.played_at)}</span></div>}) : <p className="history-empty">Son çalan şarkılar yükleniyor...</p>}
            </div>
          </section>

          <div className="social-grid">{SOCIAL_LINKS.map(item=><a className="social-link" href={item.href} target="_blank" rel="noreferrer" key={item.label}><span className="social-icon">{item.icon}</span>{item.label}</a>)}</div>
          <a className="home-link" href="/">Aslan Stüdyo Ana Sayfasına Dön</a>
          <p className="footer-note">© {new Date().getFullYear()} Radyo Aslan — Kesintisiz müzik yayını</p>
        </section>
      </section>

      {showQr && <div className="qr-modal" onClick={()=>setShowQr(false)}><div className="qr-card" onClick={(e)=>e.stopPropagation()}><img src={QR_CODE} alt="Radyo Aslan QR kodu"/><h3>Telefondan Dinle</h3><p>Telefonunun kamerasıyla QR kodu okut ve Radyo Aslan’ı hemen aç.</p><button type="button" className="qr-close" onClick={()=>setShowQr(false)}>Kapat</button></div></div>}
    </main>
  );
}
