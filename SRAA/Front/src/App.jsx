import { useState } from "react";
import AdminRouter from "./routers/AdminRouter";
import DocenteRouter from "./routers/DocenteRouter";
import Login from "./login/Login";

export default function App() {
  const [session, setSession] = useState(() => Boolean(sessionStorage.getItem("token")));
  const [role, setRole] = useState(() => sessionStorage.getItem("role") || null);

  const handleSetSession = (isLogged, roleValue) => {
    setSession(isLogged);
    setRole(roleValue);
  };

  if (!session) {
    return <Login setSession={handleSetSession} />;
  }

  if (role === "administrador") {
    return <AdminRouter setSession={handleSetSession} />;
  }

  if (role === "docente") {
    return <DocenteRouter setSession={handleSetSession} />;
  }

  // si hay token pero role inválido, forzar cierre y login
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
  return <Login setSession={handleSetSession} />;
}