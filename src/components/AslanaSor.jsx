import { useState } from "react";

const quickQuestions = [
  "Hizmetleriniz neler?",
  "Çalışma saatleri",
  "Adresiniz nerede?",
  "Drone çekimi var mı?",
  "Rezervasyon yapmak istiyorum",
];

function findAnswer(message) {
  const text = message
    .toLocaleLowerCase("tr-TR")
    .replace(/[?.!,]/g, "")
    .trim();

  if (text.includes("merhaba") || text.includes("selam")) {
    return "Merhaba 👋 Aslan Stüdyo’ya hoş geldiniz. Size nasıl yardımcı olabilirim?";
  }

  if (text.includes("hizmet") || text.includes("neler yapıyorsunuz")) {
    return "Düğün, nişan, kına, söz, mezuniyet, dış çekim, drone, video, albüm, baskı, çerçeve ve organizasyon hizmetleri sunuyoruz.";
  }

  if (
    text.includes("saat") ||
    text.includes("açık") ||
    text.includes("kaçta")
  ) {
    return "Aslan Stüdyo her gün 09:00–19:00 saatleri arasında hizmet vermektedir.";
  }

  if (
    text.includes("adres") ||
    text.includes("nerede") ||
    text.includes("konum")
  ) {
    return "Adresimiz: Çayırlık Mahallesi, Aksaray Caddesi No:23/C, Acıgöl / Nevşehir.";
  }

  if (
    text.includes("telefon") ||
    text.includes("numara") ||
    text.includes("iletişim")
  ) {
    return "Bize 0 533 322 95 60 numaralı telefondan ulaşabilirsiniz.";
  }

  if (text.includes("drone") || text.includes("havadan")) {
    return "Evet, düğün, dış çekim, tanıtım ve organizasyonlar için profesyonel drone çekimi yapıyoruz.";
  }

  if (
    text.includes("fiyat") ||
    text.includes("ücret") ||
    text.includes("kaç tl") ||
    text.includes("paket")
  ) {
    return "Fiyatlarımız çekim türü, tarih, süre ve seçilen pakete göre değişmektedir. Size özel fiyat için WhatsApp üzerinden bize ulaşabilirsiniz.";
  }

  if (
    text.includes("rezervasyon") ||
    text.includes("randevu") ||
    text.includes("tarih")
  ) {
    return "Rezervasyon bölümündeki formu doldurabilirsiniz. Talebiniz doğrudan yönetim panelimize ulaşacaktır.";
  }

  return "Bu konuda ayrıntılı bilgi için WhatsApp üzerinden bize yazabilirsiniz. Aslan Stüdyo ekibi size yardımcı olacaktır.";
}

function AslanaSor() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Merhaba 👋 Ben Aslan Stüdyo Asistanı. Size nasıl yardımcı olabilirim?",
    },
  ]);

  const sendMessage = (customMessage) => {
    const sentMessage = (customMessage || message).trim();

    if (!sentMessage) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "user",
        text: sentMessage,
      },
      {
        id: Date.now() + 1,
        sender: "bot",
        text: findAnswer(sentMessage),
      },
    ]);

    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const buttonStyle = {
    position: "fixed",
    right: "20px",
    bottom: "155px",
    zIndex: 999999,
    display: "flex",
    alignItems: "center",
    gap: "9px",
    minHeight: "54px",
    padding: "8px 18px 8px 10px",
    border: "none",
    borderRadius: "999px",
    background: "#e30613",
    color: "#ffffff",
    cursor: "pointer",
    boxShadow: "0 14px 35px rgba(227, 6, 19, 0.4)",
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={buttonStyle}
        >
          <span
            style={{
              display: "grid",
              placeItems: "center",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#ffffff",
              fontSize: "22px",
            }}
          >
            🦁
          </span>

          <strong>Aslan’a Sor</strong>
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "155px",
            zIndex: 999999,
            width: "min(370px, calc(100vw - 30px))",
            overflow: "hidden",
            borderRadius: "22px",
            background: "#121212",
            color: "#ffffff",
            boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              background: "linear-gradient(135deg, #e30613, #9e0009)",
            }}
          >
            <div>
              <strong>🦁 Aslan Stüdyo Asistanı</strong>
              <div style={{ marginTop: "4px", fontSize: "12px" }}>
                🟢 Çevrim içi
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                color: "#ffffff",
                fontSize: "28px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <div
            style={{
              height: "260px",
              overflowY: "auto",
              padding: "16px",
              background: "#181818",
            }}
          >
            {messages.map((item) => (
              <div
                key={item.id}
                style={{
                  width: "fit-content",
                  maxWidth: "84%",
                  marginBottom: "11px",
                  marginLeft: item.sender === "user" ? "auto" : "0",
                  padding: "11px 13px",
                  borderRadius: "15px",
                  background:
                    item.sender === "user" ? "#e30613" : "#2a2a2a",
                  fontSize: "13px",
                  lineHeight: "1.55",
                }}
              >
                {item.text}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "7px",
              overflowX: "auto",
              padding: "10px",
            }}
          >
            {quickQuestions.map((question) => (
              <button
                type="button"
                key={question}
                onClick={() => sendMessage(question)}
                style={{
                  flex: "0 0 auto",
                  padding: "8px 11px",
                  border: "1px solid #444",
                  borderRadius: "999px",
                  background: "transparent",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                {question}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "8px",
              padding: "12px",
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Mesajınızı yazın..."
              style={{
                minWidth: 0,
                flex: 1,
                padding: "12px 14px",
                border: "1px solid #444",
                borderRadius: "999px",
                outline: "none",
                background: "#222222",
                color: "#ffffff",
              }}
            />

            <button
              type="submit"
              style={{
                width: "44px",
                height: "44px",
                border: "none",
                borderRadius: "50%",
                background: "#e30613",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </form>

          <a
            href="https://wa.me/905333229560"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              padding: "12px",
              borderTop: "1px solid #333",
              color: "#63dd87",
              textAlign: "center",
              textDecoration: "none",
              fontSize: "12px",
            }}
          >
            WhatsApp’tan canlı destek
          </a>
        </div>
      )}
    </>
  );
}

export default AslanaSor;