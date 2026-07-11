import { useEffect } from "react";

function RegistrationBadge() {
  useEffect(() => {
    const container = document.getElementById("belgecontainer");

    if (!container) return;

    container.innerHTML = `
      <div id="oatb"
        onmouseover="gst()"
        onmouseout="gz()"
        token="192402712180ae39c466b1b202e97079"
        styleType="bl"
        imgsize="small"
        position="absolute">
      </div>
    `;

    const script = document.createElement("script");
    script.src = "https://www.turkticaret.net/siberhosting/js/tescilbelge.js";
    script.async = true;

    container.appendChild(script);
  }, []);

  return (
    <div
      id="belgecontainer"
      style={{
        position: "fixed",
        left: "20px",
        bottom: "20px",
        zIndex: 9999,
      }}
    />
  );
}

export default RegistrationBadge;