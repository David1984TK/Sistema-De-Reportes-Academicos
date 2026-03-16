import { Navigate, Route, Routes } from "react-router-dom";
import DocenteSideBar from "../docente/components/DocenteSideBar";
import ActividadesAcademicas from "../administrador/generacion_actividades/ActiviadesAcademicas";
import RegistroActividadesDocente from "../docente/registro_actividades/RegistroActiviadesDocente";
import RegistroReportesDocente from "../docente/registro_reportes/RegsitroReportesDocente";
import CalendarioDocente from "../docente/calendario/CalendarioDocente";
import PerfilDocente from "../docente/perfil/PerfilDocente";

export default function DocenteRouter({ setSession }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/docente/consulta-actividades" />} />
      <Route path="/docente" element={<DocenteSideBar setSession={setSession} />}>
        <Route index element={<Navigate to="consulta-actividades" />} />
        <Route path="consulta-actividades" element={<ActividadesAcademicas />} />
        <Route path="registrar-actividades" element={<RegistroActividadesDocente />} />
        <Route path="calendario" element={<CalendarioDocente />} />
        <Route path="registro-reportes" element={<RegistroReportesDocente />} />
        <Route path="mi-perfil" element={<PerfilDocente />} />
        <Route path="*" element={<Navigate to="consulta-actividades" />} />
      </Route>
      <Route path="*" element={<Navigate to="/docente/consulta-actividades" />} />
    </Routes>
  );
}