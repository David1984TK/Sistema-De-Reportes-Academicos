import { useMemo, useRef, useState } from "react";
import "./ReporteGeneralFormDoc.css";

function InputDoc({ label, placeholder, type = "text", min = 0 }) {
  return (
    <div className="rgfd__field">
      <label className="rgfd__label">{label}</label>
      <input
        type={type}
        min={type === "number" ? min : undefined}
        placeholder={placeholder}
        className="rgfd__input"
      />
    </div>
  );
}

export default function ReporteGeneralFormDoc() {
  const [guardado, setGuardado] = useState(false);
  const programaEducativo = useMemo(
    () => [
      { group: "DACEA", fields: ["CO", "ME", "EFEP", "GCH", "LCO", "LINM", "LGCH"] },
      { group: "DAMI", fields: ["AUT", "MT", "NT", "PP", "IMC", "IMT", "INT", "IIN"] },
      { group: "DATEFI", fields: ["GB", "LGB", "LTF"] },
      { group: "DATID", fields: ["DA", "DI", "DS", "IRD", "LDDyPA", "IDTyM", "IDyGs", "IRIyC"] },
    ],
    []
  );
  const evidenceInputRef = useRef(null);
  const [selectedEvidenceFiles, setSelectedEvidenceFiles] = useState([]);

  const handlePickEvidenceFiles = () => {
    evidenceInputRef.current?.click();
  };

  const handleEvidenceFilesChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedEvidenceFiles(files);
  };

  return (
    <div className="rgfd">
      <section className="rgfd__section">
        <h4 className="rgfd__title">1. INFORMACION GENERAL</h4>
        <div className="rgfd__stack">
          <div className="rgfd__grid">
            <InputDoc label="Folio" placeholder="Numero de folio" />
            <InputDoc label="Fecha de inicio" placeholder="" type="date" />
          </div>
          <InputDoc label="Evento" placeholder="TITULO DE LA ACTIVIDAD" />
          <div className="rgfd__field">
            <label className="rgfd__label">Objetivo</label>
            <textarea rows={4} placeholder="Descripcion del objetivo de la actividad" className="rgfd__textarea" />
          </div>
          <div className="rgfd__grid">
            <InputDoc label="Division" placeholder="Division academica" />
            <InputDoc label="Carrera" placeholder="Carrera o programa" />
          </div>
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">2. FOTOGRAFIAS DE EVIDENCIA</h4>
        <div className="rgfd__stack">
          <button type="button" onClick={handlePickEvidenceFiles} className="rgfd__dropzone">
            <input
              ref={evidenceInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              multiple
              onChange={handleEvidenceFilesChange}
              className="rgfd__dropzone-input"
            />
            <i className="bi bi-upload rgfd__dropzone-icon" />
            <p className="rgfd__dropzone-title">Haz clic para cargar fotografias</p>
            <p className="rgfd__dropzone-text">o arrastra y suelta las imagenes aqui</p>
            <p className="rgfd__dropzone-help">Puedes seleccionar multiples imagenes (PNG, JPG, JPEG)</p>
            {selectedEvidenceFiles.length > 0 && (
              <p className="rgfd__dropzone-selected">
                {selectedEvidenceFiles.length === 1
                  ? `Archivo seleccionado: ${selectedEvidenceFiles[0].name}`
                  : `${selectedEvidenceFiles.length} archivos seleccionados`}
              </p>
            )}
          </button>
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">3. RESPONSABLES</h4>
        <div className="rgfd__stack">
          <InputDoc label="Nombre y cargo del responsable" placeholder="Persona a cargo de la actividad" />
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">4. INFORMACION DE ESTUDIANTES</h4>
        <div className="rgfd__stack">
          <p className="rgfd__subtitle">Participacion</p>
          <div className="rgfd__grid-3">
            <InputDoc label="Total de estudiantes" placeholder="0" type="number" />
            <InputDoc label="Estudiantes espectadores" placeholder="0" type="number" />
            <InputDoc label="Estudiantes participantes" placeholder="0" type="number" />
          </div>

          <p className="rgfd__subtitle rgfd__subtitle--spaced">Sexo</p>
          <div className="rgfd__grid">
            <InputDoc label="Mujer" placeholder="0" type="number" />
            <InputDoc label="Hombre" placeholder="0" type="number" />
          </div>

          <p className="rgfd__subtitle rgfd__subtitle--spaced">Genero</p>
          <div className="rgfd__grid-3">
            <InputDoc label="Femenino" placeholder="0" type="number" />
            <InputDoc label="Masculino" placeholder="0" type="number" />
            <InputDoc label="No binario" placeholder="0" type="number" />
          </div>

          <p className="rgfd__subtitle rgfd__subtitle--spaced">Autoidentificacion</p>
          <div className="rgfd__grid-3">
            <InputDoc label="Discapacidad" placeholder="0" type="number" />
            <InputDoc label="Migrante" placeholder="0" type="number" />
            <InputDoc label="Indigena" placeholder="0" type="number" />
            <InputDoc label="Afroamericano" placeholder="0" type="number" />
            <InputDoc label="LGBTIQ+" placeholder="0" type="number" />
            <InputDoc label="No aplica" placeholder="0" type="number" />
          </div>

          <p className="rgfd__subtitle rgfd__subtitle--spaced">Rango de edad</p>
          <div className="rgfd__grid-3">
            <InputDoc label="15 a 19 anos" placeholder="0" type="number" />
            <InputDoc label="20 a 29 anos" placeholder="0" type="number" />
            <InputDoc label="30 a 39 anos" placeholder="0" type="number" />
          </div>
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">5. INFORMACION DOCENTES/ADMINISTRATIVOS</h4>
        <div className="rgfd__stack">
          <InputDoc label="Institucion que organiza la actividad" placeholder="Nombre de la institucion" />
          <div className="rgfd__grid">
            <InputDoc label="Total docentes participantes (M)" placeholder="Mujer" type="number" />
            <InputDoc label="Total docentes participantes (H)" placeholder="Hombre" type="number" />
            <InputDoc label="Administrativos participantes (M)" placeholder="Mujer" type="number" />
            <InputDoc label="Administrativos participantes (H)" placeholder="Hombre" type="number" />
          </div>
          <InputDoc label="Total docentes + administrativos" placeholder="Se calcula automaticamente" />
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">6. ESTUDIANTES POR PROGRAMA EDUCATIVO</h4>
        <div className="rgfd__program-grid">
          {programaEducativo.map((program) => (
            <div key={program.group} className="rgfd__program-item">
              <p className="rgfd__subtitle">{program.group}</p>
              <div className="rgfd__program-fields">
                {program.fields.map((field) => (
                  <InputDoc key={field} label={field} placeholder="0" type="number" />
                ))}
              </div>
            </div>
          ))}
          <InputDoc label="Total estudiantes" placeholder="Se calcula automaticamente" />
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">7. UBICACION Y CONTEXTO</h4>
        <div className="rgfd__stack">
          <InputDoc label="Lugar donde se desarrollo la actividad" placeholder="Lugar, municipio y estado" />
          <div className="rgfd__field">
            <label className="rgfd__label">Invitados especiales</label>
            <textarea
              rows={3}
              placeholder="Nombre de instituciones o personas invitadas"
              className="rgfd__textarea rgfd__textarea--sm"
            />
          </div>
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">8. DESCRIPCION</h4>
        <div className="rgfd__stack">
          <InputDoc label="Nombre de quien elabora el formato" placeholder="Persona que completa el documento" />
          <div className="rgfd__field">
            <label className="rgfd__label">Descripcion de la actividad</label>
            <textarea rows={4} placeholder="Detalle de lo realizado" className="rgfd__textarea rgfd__textarea--md" />
          </div>
        </div>
      </section>

      <section className="rgfd__section rgfd__section--button">
        <button type="button" className="rgfd__save-btn" onClick={() => setGuardado(true)}>Guardar Reporte General</button>
      </section>

      {guardado && (
        <div className="rgfd__modal-overlay" onClick={() => setGuardado(false)}>
          <div className="rgfd__modal" onClick={(e) => e.stopPropagation()}>
            <div className="rgfd__modal-icon">
              <i className="bi bi-check-circle-fill" />
            </div>
            <h3 className="rgfd__modal-title">Reporte guardado</h3>
            <p className="rgfd__modal-text">El reporte general se ha guardado correctamente.</p>
            <button type="button" className="rgfd__modal-btn" onClick={() => setGuardado(false)}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
