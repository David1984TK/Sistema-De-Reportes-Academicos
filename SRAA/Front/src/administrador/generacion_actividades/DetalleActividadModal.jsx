import './DetalleActividadModal.css';

export default function DetalleActividadModal({ actividad, onClose }) {
  if (!actividad) return null;

  const campos = [
    { label: 'Título',   value: actividad.titulo },
    { label: 'Fecha',    value: actividad.fecha },
    { label: 'Hora',     value: actividad.hora },
    { label: 'Carrera',  value: actividad.carrera },
    { label: 'Tipo',     value: actividad.tipo },
  ];

  return (
    <div className="dam__overlay" onClick={onClose}>
      <div className="dam__panel" onClick={(e) => e.stopPropagation()}>
        <div className="dam__header">
          <h3 className="dam__title">Detalles de la Actividad</h3>
          <button className="dam__close" onClick={onClose} type="button" aria-label="Cerrar">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="dam__body">
          {campos.map(({ label, value }) => (
            <div key={label} className="dam__field">
              <span className="dam__field-label">{label}</span>
              <span className="dam__field-value">{value ?? '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
