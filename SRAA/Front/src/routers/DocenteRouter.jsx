import { Navigate, Route, Routes } from "react-router-dom";
import DocenteSideBar from "../docente/components/DocenteSideBar";
import ActividadesAcademicasDocente from "../docente/generacion_act_docente/ActividadesAcademicasDocente";
import RegistroActividadesDocente from "../docente/registro_actividades/RegistroActiviadesDocente";
import RegistroReportesDocente from "../docente/registro_reportes/RegsitroReportesDocente";
import CalendarioDocente from "../docente/calendario/CalendarioDocente";
import PerfilDocente from "../docente/perfil/PerfilDocente";

export default function DocenteRouter({ setSession }) {
  console.log("SidebarAdmin setSession:", setSession, typeof setSession);
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <DocenteSideBar setSession={setSession} />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/docente/consulta-actividades" replace />} />
          <Route path="/docente/consulta-actividades" element={<ActividadesAcademicasDocente />} />
          <Route path="/docente/registrar-actividades" element={<RegistroActividadesDocente />} />
          <Route path="/docente/calendario" element={<CalendarioDocente />} />
          <Route path="/docente/registro-reportes" element={<RegistroReportesDocente />} />
          <Route path="/docente/mi-perfil" element={<PerfilDocente />} />
          <Route path="*" element={<Navigate to="/docente/consulta-actividades" replace />} />
        </Routes>
      </div>
    </div>
  );
}