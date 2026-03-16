import './ActividadCardDocente.css';

// ActividadCardDocente.jsx
export default function ActividadCardDocente({ actividad, onVerDetalles, onDescargarReporte }) {
  const { titulo, fecha, hora, carrera, tipo } = ac
  const labelDescarga = tipo === 'Docente' ? 'Descargar Reporte Docente' : 'Descargar Reporte General';

  return (
    <div className="actividad-card">
      <div className="actividad-card__info">
        <p className="actividad-card__titulo">{titulo}</p>
        <div className="actividad-card__meta">
          <span>Fecha:{fecha}</span>
          <span>Hora:{hora}</span>
          <span>Carrera:{carrera}</span>
          <span>Tipo:{tipo}</span>
        </div>
      </div>

      <div className="actividad-card__acciones">
        <button onClick={() => onVerDetalles(actividad)} className="actividad-card__boton actividad-card__boton--detalles">
          <i className="bi bi-eye"></i>
          Ver Detalles
        </button>
        <button onClick={() => onDescargarReporte(actividad)} className="actividad-card__boton actividad-card__boton--descargar">
          <i className="bi bi-download"></i>
          {labelDescarga}
        </button>
      </div>
    </div>
  );
}
