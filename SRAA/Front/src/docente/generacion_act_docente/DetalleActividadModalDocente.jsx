import './DetalleActividadModalDocente.css';

export default function DetalleActividadModalDocente({ actividad, onClose }) {
  if (!actividad) return null;

  const campos = [
    { label: 'Título',   value: actividad.titulo },
    { label: 'Fecha',    value: actividad.fecha },
    { label: 'Hora',     value: actividad.hora },
    { label: 'Carrera',  value: actividad.carrera },
    { label: 'Tipo',     value: actividad.tipo },
  ];

  return (
    <div className="damd__overlay" onClick={onClose}>
      <div className="damd__panel" onClick={(e) => e.stopPropagation()}>
        <div className="damd__header">
          <h3 className="damd__title">Detalles de la Actividad</h3>
          <button className="damd__close" onClick={onClose} type="button" aria-label="Cerrar">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="damd__body">
          {campos.map(({ label, value }) => (
            <div key={label} className="damd__field">
              <span className="damd__field-label">{label}</span>
              <span className="damd__field-value">{value ?? '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
