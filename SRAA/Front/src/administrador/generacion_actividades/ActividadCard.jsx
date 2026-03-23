import './ActividadCard.css';

export default function ActividadCard({ actividad, onVerDetalles, onDescargar }) {
  const { titulo, fecha, division, tipoReporte } = actividad;

  const labelDescarga = tipoReporte === 'Docente' ? 'Descargar Reporte Docente' : 'Descargar Reporte General';

  return (
    <div className="actividad-card">
      <div className="actividad-card__info">
        <p className="actividad-card__titulo">{titulo}</p>
        <div className="actividad-card__meta">
          <span>Fecha: {fecha}</span>
          {division && <span>División: {division}</span>}
          <span>Tipo: {tipoReporte}</span>
        </div>
      </div>

      <div className="actividad-card__acciones">
        <button onClick={() => onVerDetalles(actividad)} className="actividad-card__boton actividad-card__boton--detalles">
          <i className="bi bi-eye"></i>
          Ver Detalles
        </button>
        <button onClick={() => onDescargar(actividad)} className="actividad-card__boton actividad-card__boton--descargar">
          <i className="bi bi-download"></i>
          {labelDescarga}
        </button>
      </div>
    </div>
  );
}
