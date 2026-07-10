import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function RadioPlayer() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "songs"));

        const songList = snapshot.docs.map((songDoc) => ({
          id: songDoc.id,
          ...songDoc.data(),
        }));

        songList.sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return aTime - bTime;
        });

        setSongs(songList);
      } catch (error) {
        console.error("Radyo şarkıları yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  useEffect(() => {
    if (!audioRef.current || songs.length === 0) {
      return;
    }

    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentIndex, songs]);

  const currentSong = songs[currentIndex];

  const playPause = async () => {
    if (!audioRef.current) {
      return;
    }

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Şarkı oynatılamadı:", error);
    }
  };

  const nextSong = () => {
    setCurrentIndex((index) => (index + 1) % songs.length);
  };

  const previousSong = () => {
    setCurrentIndex((index) =>
      index === 0 ? songs.length - 1 : index - 1
    );
  };

  if (loading) {
    return null;
  }

  if (songs.length === 0) {
    return (
      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "90px",
          zIndex: 999999,
          background: "#e30613",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "12px",
          fontWeight: "700",
        }}
      >
        📻 Radyo şarkısı bulunamadı
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "90px",
        zIndex: 999999,
        width: isOpen ? "330px" : "58px",
        background: "#111",
        color: "#fff",
        border: "1px solid #333",
        borderRadius: "18px",
        padding: isOpen ? "16px" : "9px",
        boxShadow: "0 15px 40px rgba(0,0,0,.45)",
      }}
    >
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Aslan Radyo'yu aç"
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "50%",
            background: "#e30613",
            color: "#fff",
            cursor: "pointer",
            fontSize: "19px",
          }}
        >
          📻
        </button>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <strong>📻 Aslan Radyo</strong>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Radyoyu küçült"
              style={{
                border: "none",
                background: "transparent",
                color: "#fff",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ marginTop: "14px" }}>
            <h4 style={{ margin: "0 0 5px" }}>
              {currentSong.title || "İsimsiz Şarkı"}
            </h4>

            <p
              style={{
                margin: "0",
                color: "#bbb",
                fontSize: "14px",
              }}
            >
              {currentSong.artist || "Bilinmeyen Sanatçı"}
            </p>
          </div>

          <audio
            ref={audioRef}
            src={currentSong.audioUrl}
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={nextSong}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <button
              type="button"
              onClick={previousSong}
              style={controlButtonStyle}
            >
              ⏮
            </button>

            <button
              type="button"
              onClick={playPause}
              style={{
                ...controlButtonStyle,
                width: "48px",
                height: "48px",
                background: "#e30613",
              }}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              type="button"
              onClick={nextSong}
              style={controlButtonStyle}
            >
              ⏭
            </button>
          </div>

          <audio
            controls
            src={currentSong.audioUrl}
            style={{
              width: "100%",
              marginTop: "14px",
            }}
            onEnded={nextSong}
          />
        </>
      )}
    </div>
  );
}

const controlButtonStyle = {
  width: "40px",
  height: "40px",
  border: "none",
  borderRadius: "50%",
  background: "#2b2b2b",
  color: "#fff",
  cursor: "pointer",
  fontSize: "17px",
};

export default RadioPlayer;