import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-glow"></div>

      <img
        src="/images/logo.png"
        alt="Aslan Stüdyo"
        className="loading-logo"
      />

      <h1>Aslan Stüdyo</h1>

      <p>Hatıralar Aslan'la Sonsuz</p>

      <div className="loading-line">
        <span></span>
      </div>
    </div>
  );
}

export default LoadingScreen;