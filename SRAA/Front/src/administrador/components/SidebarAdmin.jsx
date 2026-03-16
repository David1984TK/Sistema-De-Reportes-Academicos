import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function SidebarAdmin({ setSession }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setSession(false, null);
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* ── Navbar superior ── */}
      <div style={{ backgroundColor: "#00AB84", height: "48px", display: "flex", alignItems: "center", paddingLeft: "16px", paddingRight: "16px", flexShrink: 0 }}>
        <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", color: "#fff", letterSpacing: "-0.3125px" }}>
          Sistema de Gestión de Actividades Académicas | SGAA
        </p>
      </div>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── Sidebar ── */}
        <div style={{ backgroundColor: "#f8fafc", width: "180px", minWidth: "180px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", height: "calc(100vh - 48px)", position: "sticky", top: 0 }}>
          {/* Perfil */}
          <div style={{ backgroundColor: "#e0e7ff", padding: "12px 8px", cursor: "pointer", textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1e293b", letterSpacing: "-0.4492px", lineHeight: "16px" }}>
              Nombre del Docente
            </p>
            <p style={{ margin: "2px 0 0", fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "11px", color: "#475569", letterSpacing: "-0.4492px", lineHeight: "14px" }}>
              Docente
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: "1.5px", backgroundColor: "#cbd5e1", flexShrink: 0 }} />

          {/* Navegación */}
          <div style={{ flex: 1, overflowY: "auto", paddingTop: "8px" }}>
            {[
              { to: "/consulta-actividades",  label: "Generación y consulta de actividades académicas", end: true },
              { to: "/registrar-actividades", label: "Registro de actividades" },
              { to: "/calendario",            label: "Calendario de Actividades Académicas" },
              { to: "/registro-reportes",     label: "Registro de reportes" },
              { to: "/gestionar-docentes",    label: "Gestionar Docentes" },
              { to: "/mi-perfil",             label: "Mi perfil" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({ display: "flex", flexDirection: "column", textDecoration: "none", backgroundColor: isActive ? "#3b82f6" : "transparent" })}
              >
                {({ isActive }) => (
                  <>
                    <div style={{ height: "52px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
                      <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "12px", textAlign: "center", lineHeight: "16px", letterSpacing: "-0.2344px", color: isActive ? "#fff" : "#334155" }}>
                        {item.label}
                      </p>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "#cbd5e1" }} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Salir */}
          <div style={{ borderTop: "1px solid #e2e8f0", flexShrink: 0 }}>
            <button
              onClick={handleLogout}
              style={{ width: "100%", height: "52px", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#64748b", letterSpacing: "-0.1504px" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <i className="bi bi-box-arrow-right" style={{ fontSize: "15px" }}></i>
              salir
            </button>
            <div style={{ height: "1px", backgroundColor: "#cbd5e1" }} />
          </div>
        </div>

        {/* ── Contenido principal ── */}
        <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#f0f2f5", width: 0 }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}