import './DetalleActividadModal.css';

function Campo({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="dam__field">
      <span className="dam__field-label">{label}</span>
      <span className="dam__field-value">{value}</span>
    </div>
  );
}

function SeccionTitulo({ children }) {
  return <h4 className="dam__section-title">{children}</h4>;
}

export default function DetalleActividadModal({ actividad, onClose }) {
  if (!actividad) return null;

  const esGeneral = actividad.tipoReporte === "General";

  return (
    <div className="dam__overlay" onClick={onClose}>
      <div className="dam__panel" onClick={(e) => e.stopPropagation()}>
        <div className="dam__header">
          <h3 className="dam__title">
            {esGeneral ? "Detalles del Reporte General" : "Detalles del Reporte Docente"}
          </h3>
          <button className="dam__close" onClick={onClose} type="button" aria-label="Cerrar">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="dam__body">
          {esGeneral ? (
            <>
              <SeccionTitulo>Información General</SeccionTitulo>
              <Campo label="Folio" value={actividad.folio} />
              <Campo label="Evento" value={actividad.nombre} />
              <Campo label="Objetivo" value={actividad.objetivo} />
              <Campo label="Tipo" value={actividad.tipo} />
              <Campo label="Fecha inicio" value={actividad.fechaInicio} />
              <Campo label="Fecha fin" value={actividad.fechaFin} />

              <SeccionTitulo>Ubicación</SeccionTitulo>
              <Campo label="Lugar" value={actividad.lugar} />
              <Campo label="Municipio" value={actividad.municipio} />
              <Campo label="Estado" value={actividad.estado} />
              <Campo label="Institución" value={actividad.institucionOrganizadora} />

              {actividad.responsables && actividad.responsables.length > 0 && (
                <>
                  <SeccionTitulo>Responsables</SeccionTitulo>
                  {actividad.responsables.map((r, i) => (
                    <Campo key={i} label={r.cargo || "Responsable"} value={r.nombre} />
                  ))}
                </>
              )}

              {actividad.estadisticasEstudiantes && (
                <>
                  <SeccionTitulo>Estudiantes</SeccionTitulo>
                  <Campo label="Total estudiantes" value={actividad.estadisticasEstudiantes.totalEstudiantes} />
                  <Campo label="Espectadores" value={actividad.estadisticasEstudiantes.espectadores} />
                  <Campo label="Participantes" value={actividad.estadisticasEstudiantes.participantes} />
                  <Campo label="Mujeres (sexo)" value={actividad.estadisticasEstudiantes.sexoMujer} />
                  <Campo label="Hombres (sexo)" value={actividad.estadisticasEstudiantes.sexoHombre} />
                  <Campo label="Femenino" value={actividad.estadisticasEstudiantes.generoFemenino} />
                  <Campo label="Masculino" value={actividad.estadisticasEstudiantes.generoMasculino} />
                  <Campo label="No binario" value={actividad.estadisticasEstudiantes.generoNoBinario} />
                  <Campo label="Discapacidad" value={actividad.estadisticasEstudiantes.autoidentDiscapacidad} />
                  <Campo label="Migrante" value={actividad.estadisticasEstudiantes.autoidentMigrante} />
                  <Campo label="Indígena" value={actividad.estadisticasEstudiantes.autoidentIndigena} />
                  <Campo label="Afroamericano" value={actividad.estadisticasEstudiantes.autoidentAfroamericano} />
                  <Campo label="LGBTIQ+" value={actividad.estadisticasEstudiantes.autoidentLgbtiq} />
                  <Campo label="15-19 años" value={actividad.estadisticasEstudiantes.edad1519} />
                  <Campo label="20-29 años" value={actividad.estadisticasEstudiantes.edad2029} />
                  <Campo label="30-39 años" value={actividad.estadisticasEstudiantes.edad3039} />
                </>
              )}

              {actividad.estadisticasDocentes && (
                <>
                  <SeccionTitulo>Docentes y Administrativos</SeccionTitulo>
                  <Campo label="Docentes Mujeres" value={actividad.estadisticasDocentes.docentesMujeres} />
                  <Campo label="Docentes Hombres" value={actividad.estadisticasDocentes.docentesHombres} />
                  <Campo label="Admin. Mujeres" value={actividad.estadisticasDocentes.administrativosMujeres} />
                  <Campo label="Admin. Hombres" value={actividad.estadisticasDocentes.administrativosHombres} />
                </>
              )}

              {actividad.participaciones && actividad.participaciones.length > 0 && (
                <>
                  <SeccionTitulo>Programas Educativos</SeccionTitulo>
                  {actividad.participaciones.map((p, i) => (
                    <Campo key={i} label={`${p.division} - ${p.programa}`} value={p.cantidad} />
                  ))}
                </>
              )}

              <SeccionTitulo>Descripción</SeccionTitulo>
              <Campo label="Reseña" value={actividad.resena} />
              <Campo label="Invitados" value={actividad.invitadosEspeciales} />
              <Campo label="Elaboró" value={actividad.nombreElabora} />
            </>
          ) : (
            <>
              <SeccionTitulo>Información del Curso</SeccionTitulo>
              <Campo label="Curso" value={actividad.nombreCurso} />
              <Campo label="Objetivo" value={actividad.objetivo} />
              <Campo label="División" value={actividad.division} />
              <Campo label="Carrera" value={actividad.carrera} />
              <Campo label="Fecha inicio" value={actividad.fechaInicio} />
              <Campo label="Fecha fin" value={actividad.fechaFin} />

              <SeccionTitulo>Facilitador</SeccionTitulo>
              <Campo label="Nombre" value={actividad.facilitador} />
              <Campo label="Contacto" value={actividad.datosContactoFacilitador} />

              {actividad.participantes && actividad.participantes.length > 0 && (
                <>
                  <SeccionTitulo>Participantes</SeccionTitulo>
                  {actividad.participantes.map((p, i) => (
                    <Campo key={i} label={p.tipo || "Capacitado"} value={p.nombreExterno} />
                  ))}
                </>
              )}

              <SeccionTitulo>Observaciones</SeccionTitulo>
              <Campo label="Notas" value={actividad.notas} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
