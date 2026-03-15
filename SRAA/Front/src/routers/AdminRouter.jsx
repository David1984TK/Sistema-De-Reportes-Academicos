import { Navigate, Route, Routes } from "react-router-dom";
import SidebarAdmin from "../administrador/components/SidebarAdmin";
import ActividadesAcademicas from "../administrador/generacion_actividades/ActiviadesAcademicas";
import RegistroActividades from "../administrador/registro_actividades/RegistroActividades";
import RegistroReportes from "../administrador/registro_reportes/RegistroReportes";
import Calendario from "../administrador/calendario/Calendario";
import GestionarDocente from "../administrador/gestionar_docentes/GestionarDocente";
import MiPerfil from "../administrador/perfil/MiPerfil";

export default function AdminRouter({ setSession }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarAdmin setSession={setSession} />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/consulta-actividades"/>} />
          <Route path="/consulta-actividades"    element={<ActividadesAcademicas to="/consulta-actividades" />} />
          <Route path="/registrar-actividades"   element={<RegistroActividades to="/registrar-actividades" />} />
          <Route path="/calendario"         element={<Calendario to="/calendario" />} />
          <Route path="/registro-reportes"  element={<RegistroReportes to="/registro-reportes" />} />
          <Route path="/gestionar-docentes" element={<GestionarDocente to="/gestionar-docentes" />} />
          <Route path="/mi-perfil"          element={<MiPerfil to="/mi-perfil" />} />

          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </div>
    </div>
  );
}