import { useState } from "react";
import "./FiltrosBusqueda.css";

// FiltrosBusqueda.jsx
export default function FiltrosBusqueda({ onBuscar }) {

  const divisionesAcademicas = ['DATID', 'DAMI', 'DACEA', 'DATEFI'];

  const carreras = [
    'CO', 'ME', 'EFEP', 'GCH', 'LCO', 'LINM', 'LGCH', 'AUT', 'MT', 'NT',
    'PP', 'IMC', 'IMT', 'INT', 'IIN', 'GB', 'LGB', 'LTF', 'DA', 'DI', 'DS',
    'IRD', 'LDDyPA', 'IDTyM', 'IDyGs', 'IRIyC'
  ];

  const tiposReporte = ['General', 'Docente'];

  const [filtros, setFiltros] = useState({
    divisionAcademica: '',
    carrera: '',
    tipoReporte: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = () => {
    onBuscar(filtros);
  };

  return (
    <div className="filtros-busqueda">
      {/* Título */}
      <div className="filtros-busqueda__titulo">
        <svg viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        <span className="filtros-busqueda__titulo-texto">Filtros de Búsqueda</span>
      </div>

      {/* Fila 1 */}
      <div className="filtros-busqueda__fila">
        <div className="filtros-busqueda__campo filtros-busqueda__campo--wide">
          <label className="filtros-busqueda__label">División Académica</label>
          <select
            name="divisionAcademica"
            value={filtros.divisionAcademica}
            onChange={handleChange}
            className={`filtros-busqueda__select ${!filtros.divisionAcademica ? "filtros-busqueda__select--placeholder" : ""}`}
          >
            <option value="">Seleccionar...</option>
            {divisionesAcademicas.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="filtros-busqueda__campo filtros-busqueda__campo--wide">
          <label className="filtros-busqueda__label">Carrera</label>
          <select
            name="carrera"
            value={filtros.carrera}
            onChange={handleChange}
            className={`filtros-busqueda__select ${!filtros.carrera ? "filtros-busqueda__select--placeholder" : ""}`}
          >
            <option value="">Seleccionar...</option>
            {carreras.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="filtros-busqueda__campo filtros-busqueda__campo--wide">
          <label className="filtros-busqueda__label">Tipo de Reporte</label>
          <select
            name="tipoReporte"
            value={filtros.tipoReporte}
            onChange={handleChange}
            className={`filtros-busqueda__select ${!filtros.tipoReporte ? "filtros-busqueda__select--placeholder" : ""}`}
          >
            <option value="">Seleccionar...</option>
            {tiposReporte.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Fila 2 */}
      <div className="filtros-busqueda__fila filtros-busqueda__fila--bottom">
        <div className="filtros-busqueda__campo filtros-busqueda__campo--wide">
          <label className="filtros-busqueda__label">Fecha inicio</label>
          <input type="date" name="fechaInicio" value={filtros.fechaInicio} onChange={handleChange} className="filtros-busqueda__input" />
        </div>

        <div className="filtros-busqueda__campo filtros-busqueda__campo--wide">
          <label className="filtros-busqueda__label">Fecha fin</label>
          <input type="date" name="fechaFin" value={filtros.fechaFin} onChange={handleChange} className="filtros-busqueda__input" />
        </div>

        <button onClick={handleBuscar} className="filtros-busqueda__boton">
          <i className="bi bi-search"></i>
          Buscar
        </button>
      </div>
    </div>
  );
}