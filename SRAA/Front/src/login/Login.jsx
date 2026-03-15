import { useState } from "react";
import "./Login.css";

function validate(email, password) {
  const e = {};
  if (!email) e.email = "El correo es requerido";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Formato inválido";
  if (!password) e.password = "La contraseña es requerida";
  else if (password.length < 6) e.password = "Mínimo 6 caracteres";
  return e;
}

// Se recibe setSession como prop
export default function Login({ setSession }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    const e = validate(email, password);
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);

    // --- Cuando tengas el backend real, reemplaza esto: ---
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await res.json();
    // if (!res.ok) {
    //   setErrors({ password: "Credenciales incorrectas" });
    //   setLoading(false);
    //   return;
    // }
    // sessionStorage.setItem("token", data.token);

    // Simulación temporal:
    await new Promise((r) => setTimeout(r, 800));

    const credentials = {
      "admin@gmail.com": "admin123",
      "docente@gmail.com": "docente123",
    };

    const expectedPassword = credentials[email.toLowerCase()];

    if (!expectedPassword || expectedPassword !== password) {
      setErrors({ password: "Correo o contraseña incorrectos" });
      setLoading(false);
      return;
    }

    const role = email.toLowerCase() === "admin@gmail.com" ? "administrador" : "docente";

    sessionStorage.setItem("token", "demo-token");
    sessionStorage.setItem("role", role);

    setLoading(false);
    setSuccess(true);

    setTimeout(() => setSession(true, role), 800);
  };

  const onKey = (e) => { if (e.key === "Enter") submit(); };

  return (
    <>
      <div className="root">
        <div className="card">
          <div className="header">
            <div className="dot-row">
              <div className="dot dot-1" />
              <div className="dot dot-2" />
              <div className="dot dot-3" />
            </div>
            <div className="title">Iniciar sesión</div>
            <div className="sub">Sistema de Actividades Académicas</div>
          </div>

          {success ? (
            <div className="ok">
              <div className="ok-circle">✓</div>
              <div className="ok-title">Bienvenido</div>
              <div className="ok-sub">Acceso concedido</div>
            </div>
          ) : (
            <>
              <div className="field">
                <label className="label">Correo</label>
                <div className="wrap">
                  <input
                    className={`input${errors.email ? " error" : ""}`}
                    type="email"
                    placeholder="usuario@utez.edu.mx"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); }}
                    onKeyDown={onKey}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <div className="err">{errors.email}</div>}
              </div>

              <div className="field">
                <label className="label">Contraseña</label>
                <div className="wrap">
                  <input
                    className={`input${errors.password ? " error" : ""}`}
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})); }}
                    onKeyDown={onKey}
                    autoComplete="current-password"
                    style={{ paddingRight: "48px" }}
                  />
                  <button className="eye" onClick={() => setShow(v => !v)} type="button">
                    {show ? "ocultar" : "ver"}
                  </button>
                </div>
                {errors.password && <div className="err">{errors.password}</div>}
              </div>

              <button className="login-btn" onClick={submit} disabled={loading} type="button">
                {loading && <span className="spinner" />}
                {loading ? "Autenticando..." : "Ingresar"}
              </button>
            </>
          )}

          <div className="footer">SGAA · UTEZ</div>
        </div>
      </div>
    </>
  );
}