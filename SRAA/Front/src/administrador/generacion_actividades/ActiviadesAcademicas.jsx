import { useEffect, useState } from "react";
import { apiRequest } from "../../api/httpClient";
import "./ActiviadesAcademicas.css";
import FiltrosBusqueda from "./FiltrosBusqueda";
import ActividadCard from "./ActividadCard";
import DetalleActividadModal from "./DetalleActividadModal";

export default function ActividadesAcademicas() {
  const [actividades, setActividades] = useState([]);
  const [reportesPdd, setReportesPdd] = useState([]);
  const [todasLasActividades, setTodasLasActividades] = useState([]);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);

  const divisionNombres = { 1: "DACEA", 2: "DAMI", 3: "DATEFI", 4: "DATID" };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [resAct, resPdd] = await Promise.all([
        apiRequest("/actividades").catch(() => ({ result: [] })),
        apiRequest("/reportes-pdd").catch(() => ({ result: [] })),
      ]);

      const acts = (resAct.result || []).map((a) => ({
        ...a,
        tipoReporte: "General",
        titulo: a.nombre,
        fecha: a.fechaInicio,
        division: divisionNombres[a.idArea] || "",
      }));

      const pdds = (resPdd.result || []).map((r) => ({
        ...r,
        tipoReporte: "Docente",
        titulo: r.nombreCurso,
        fecha: r.fechaInicio,
        division: r.division || "",
        carrera: r.carrera || "",
      }));

      setActividades(acts);
      setReportesPdd(pdds);
      setTodasLasActividades([...acts, ...pdds]);
    } catch (err) {
      console.error("Error cargando actividades:", err);
    } finally {
      setCargando(false);
    }
  };

  const handleBuscar = (filtros) => {
    let resultado = [...actividades, ...reportesPdd];

    if (filtros.divisionAcademica) {
      resultado = resultado.filter((a) => a.division === filtros.divisionAcademica);
    }

    if (filtros.carrera) {
      const carreraFiltro = filtros.carrera.toLowerCase();
      resultado = resultado.filter((a) => {
        if (a.tipoReporte === "General" && a.participaciones) {
          return a.participaciones.some((p) => p.programa.toLowerCase() === carreraFiltro);
        }
        if (a.tipoReporte === "Docente") {
          return (a.carrera || "").toLowerCase() === carreraFiltro;
        }
        return false;
      });
    }

    if (filtros.tipoReporte) {
      resultado = resultado.filter((a) => a.tipoReporte === filtros.tipoReporte);
    }

    if (filtros.fechaInicio) {
      resultado = resultado.filter((a) => a.fecha >= filtros.fechaInicio);
    }
    if (filtros.fechaFin) {
      resultado = resultado.filter((a) => a.fecha <= filtros.fechaFin);
    }

    setTodasLasActividades(resultado);
  };

  return (
    <main className="actividades-academicas">
      <div className="actividades-academicas__encabezado">
        <h1 className="actividades-academicas__titulo">Actividades Académicas</h1>
        <p className="actividades-academicas__descripcion">Gestiona y consulta las actividades académicas vigentes</p>
      </div>

      <FiltrosBusqueda onBuscar={handleBuscar} />

      <div className="actividades-academicas__resultado">
        <h2 className="actividades-academicas__resultado-titulo">Actividades Encontradas</h2>
        <div className="actividades-academicas__lista">
          {cargando ? (
            <p className="actividades-academicas__mensaje">Cargando actividades...</p>
          ) : todasLasActividades.length === 0 ? (
            <p className="actividades-academicas__mensaje">No se encontraron actividades registradas</p>
          ) : (
            todasLasActividades.map((actividad, index) => (
              <ActividadCard
                key={actividad.idActividad || actividad.idReportePdd || index}
                actividad={actividad}
                onVerDetalles={setActividadSeleccionada}
              />
            ))
          )}
        </div>
      </div>

      <DetalleActividadModal
        actividad={actividadSeleccionada}
        onClose={() => setActividadSeleccionada(null)}
      />
    </main>
  );
}
