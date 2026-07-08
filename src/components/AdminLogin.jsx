import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch {
      alert("E-posta veya şifre hatalı.");
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={login} className="admin-login-box">
        <img src="/images/logo.png" alt="Aslan Stüdyo" />

        <h2>Yönetim Paneli</h2>

        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default AdminLogin;