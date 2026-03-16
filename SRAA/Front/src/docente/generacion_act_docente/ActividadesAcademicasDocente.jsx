import { useState } from "react";
import "./ActividadesAcademicasDocente.css";
import FiltrosBusquedaDocente from "./FiltrosBusquedaDocente";
import ActividadCardDocente from "./ActividadCardDocente";

export default function ActividadesAcademicasDocente() {
  const [actividades, setActividades] = useState([
    { id: 1, titulo: 'Actividad 1', fecha: '2026-03-10', hora: '09:00', carrera: 'IIN', tipo: 'General' },
    { id: 2, titulo: 'Actividad 2', fecha: '2026-03-12', hora: '11:00', carrera: 'DS', tipo: 'Docente' },
  ]);

  const handleBuscar = async (filtros) => {
    // aquí después conectas con tu backend
    console.log("Buscando con filtros:", filtros);
  };

  return (
    <main className="actividades-academicas">
      <div className="actividades-academicas__encabezado">
        <h1 className="actividades-academicas__titulo">Actividades Académicas</h1>
        <p className="actividades-academicas__descripcion">Gestiona y consulta las actividades académicas vigentes</p>
      </div>

      <FiltrosBusquedaDocente onBuscar={handleBuscar} />

      <div className="actividades-academicas__resultado">
        <h2 className="actividades-academicas__resultado-titulo">Actividades Encontradas</h2>
        <div className="actividades-academicas__lista">
          {actividades.map((actividad) => (
            <ActividadCardDocente
              key={actividad.id}
              actividad={actividad}
              onVerDetalles={(a) => console.log('Ver:', a)}
              onDescargarReporte={(a) => console.log('Descargar:', a)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
