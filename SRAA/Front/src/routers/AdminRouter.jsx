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
    <Routes>
      <Route path="/" element={<SidebarAdmin setSession={setSession} />}>
        <Route index element={<Navigate to="consulta-actividades" />} />
        <Route path="consulta-actividades" element={<ActividadesAcademicas />} />
        <Route path="registrar-actividades" element={<RegistroActividades />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="registro-reportes" element={<RegistroReportes />} />
        <Route path="gestionar-docentes" element={<GestionarDocente />} />
        <Route path="mi-perfil" element={<MiPerfil />} />
        <Route path="*" element={<Navigate to="consulta-actividades" />} />
      </Route>
    </Routes>
  );
}