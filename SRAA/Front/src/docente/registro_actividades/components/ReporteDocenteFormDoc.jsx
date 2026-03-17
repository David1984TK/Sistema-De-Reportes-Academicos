import { useState } from "react";
import "./ReporteDocenteFormDoc.css";

function InputDoc({ label, placeholder, type = "text" }) {
  return (
    <div className="rdfd__field">
      <label className="rdfd__label">{label}</label>
      <input type={type} placeholder={placeholder} className="rdfd__input" />
    </div>
  );
}

function TextareaDoc({ label, placeholder, rows = 4, large = false }) {
  return (
    <div className="rdfd__field">
      <label className="rdfd__label">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`rdfd__textarea${large ? " rdfd__textarea--lg" : ""}`}
      />
    </div>
  );
}

function FileDropzoneDoc({ id, label, helpText, accept }) {
  return (
    <div className="rdfd__dropzone-wrap">
      <label className="rdfd__label">{label}</label>
      <input id={id} type="file" accept={accept} multiple className="rdfd__dropzone-input" />
      <label htmlFor={id} className="rdfd__dropzone">
        <i className="bi bi-upload rdfd__dropzone-icon" />
        <span className="rdfd__dropzone-title">Haz clic para cargar archivos</span>
        <span className="rdfd__dropzone-text">{helpText}</span>
      </label>
    </div>
  );
}

export default function ReporteDocenteFormDoc() {
  const [docentes, setDocentes] = useState([""]);
  const [guardado, setGuardado] = useState(false);

  const handleAddDocente = () => {
    setDocentes((prev) => [...prev, ""]);
  };

  const handleDocenteChange = (index, value) => {
    setDocentes((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  return (
    <div className="rdfd">
      <section className="rdfd__section">
        <h4 className="rdfd__title">Personal Docente</h4>
        <div className="rdfd__stack">
          <label className="rdfd__label">Personal docente (participante/capacitado o certificado)</label>
          <div className="rdfd__stack">
            {docentes.map((docente, index) => (
              <input
                key={`docente-${index}`}
                type="text"
                value={docente}
                onChange={(event) => handleDocenteChange(index, event.target.value)}
                placeholder={`Nombre completo del docente ${index + 1}`}
                className="rdfd__input"
              />
            ))}
            <button type="button" onClick={handleAddDocente} className="rdfd__add-docente">
              + Agregar docente
            </button>
          </div>
        </div>
      </section>

      <section className="rdfd__section">
        <h4 className="rdfd__title">Informacion del Facilitador</h4>
        <div className="rdfd__stack">
          <InputDoc label="Facilitador(a)" placeholder="Nombre completo del facilitador" />
          <InputDoc label="Datos de contacto" placeholder="Correo electronico, telefono, etc." />
        </div>
      </section>

      <section className="rdfd__section">
        <h4 className="rdfd__title">Informacion del Curso</h4>
        <div className="rdfd__stack">
          <div className="rdfd__grid">
            <InputDoc label="Fecha de inicio" placeholder="" type="date" />
            <InputDoc label="Fecha de fin" placeholder="" type="date" />
          </div>
          <InputDoc label="Nombre del curso" placeholder="Nombre completo del curso o capacitacion" />
          <div className="rdfd__grid">
            <InputDoc label="Division Academica" placeholder="" />
            <InputDoc label="Carrera" placeholder="" />
          </div>
          <TextareaDoc label="Objetivo" placeholder="Descripcion del objetivo del curso" rows={5} large />
        </div>
      </section>

      <section className="rdfd__section">
        <h4 className="rdfd__title">Evidencias y Documentacion</h4>
        <div className="rdfd__stack">
          <FileDropzoneDoc
            id="doc-evidencias-fotograficas"
            label="Evidencias fotograficas"
            helpText="o arrastra y suelta imagenes aqui (PNG, JPG, JPEG)"
            accept="image/png,image/jpeg,image/jpg"
          />
          <FileDropzoneDoc
            id="doc-constancias-certificados"
            label="Constancias/Certificados"
            helpText="o arrastra y suelta documentos aqui (PDF, DOC, DOCX)"
            accept=".pdf,.doc,.docx"
          />
          <FileDropzoneDoc
            id="doc-anexos"
            label="Anexos"
            helpText="o arrastra y suelta archivos de cualquier tipo"
            accept="*"
          />
        </div>
      </section>

      <section className="rdfd__section">
        <h4 className="rdfd__title">Notas y Observaciones</h4>
        <div className="rdfd__stack">
          <TextareaDoc
            label="Notas u observaciones"
            placeholder="Agregue cualquier nota u observacion adicional sobre el curso"
            rows={4}
          />
        </div>
      </section>

      <section className="rdfd__section rdfd__section--button">
        <button type="button" className="rdfd__save-btn" onClick={() => setGuardado(true)}>Guardar Reporte de Desarrollo Docente</button>
      </section>

      {guardado && (
        <div className="rdfd__modal-overlay" onClick={() => setGuardado(false)}>
          <div className="rdfd__modal" onClick={(e) => e.stopPropagation()}>
            <div className="rdfd__modal-icon">
              <i className="bi bi-check-circle-fill" />
            </div>
            <h3 className="rdfd__modal-title">Reporte guardado</h3>
            <p className="rdfd__modal-text">El reporte de desarrollo docente se ha guardado correctamente.</p>
            <button type="button" className="rdfd__modal-btn" onClick={() => setGuardado(false)}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
