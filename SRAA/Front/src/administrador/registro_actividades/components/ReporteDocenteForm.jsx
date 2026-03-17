import { useState } from "react";
import "./ReporteDocenteForm.css";

function InputBlock({ label, placeholder, type = "text", min = 0 }) {
  return (
    <div className="rdf__field">
      <label className="rdf__label">{label}</label>
      <input
        type={type}
        min={type === "number" ? min : undefined}
        placeholder={placeholder}
        className="rdf__input"
      />
    </div>
  );
}

function TextareaBlock({ label, placeholder, rows = 4, large = false }) {
  return (
    <div className="rdf__field">
      <label className="rdf__label">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`rdf__textarea ${large ? "rdf__textarea--lg" : ""}`}
      />
    </div>
  );
}

function SectionTitle({ children }) {
  return <h4 className="rdf__section-title">{children}</h4>;
}

function FileDropzone({ id, label, helpText, accept }) {
  return (
    <div className="rdf__dropzone-wrap">
      <label className="rdf__label">{label}</label>
      <input id={id} type="file" accept={accept} multiple className="rdf__dropzone-input" />
      <label htmlFor={id} className="rdf__dropzone">
        <i className="bi bi-upload rdf__dropzone-icon" />
        <span className="rdf__dropzone-title">Haz clic para cargar archivos</span>
        <span className="rdf__dropzone-text">{helpText}</span>
      </label>
    </div>
  );
}

export default function ReporteDocenteForm() {
  const [docentes, setDocentes] = useState([""]);
  const [guardado, setGuardado] = useState(false);

  const handleAddDocente = () => {
    setDocentes((prev) => [...prev, ""]);
  };

  const handleDocenteChange = (index, value) => {
    setDocentes((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  return (
    <div className="rdf">
      <section className="rdf__section">
        <SectionTitle>Personal Docente</SectionTitle>
        <div className="rdf__stack">
          <label className="rdf__label">Personal docente (participante/capacitado o certificado)</label>

          <div className="rdf__docentes-list">
            {docentes.map((docente, index) => (
              <input
                key={`docente-${index}`}
                type="text"
                value={docente}
                onChange={(event) => handleDocenteChange(index, event.target.value)}
                placeholder={`Nombre completo del docente ${index + 1}`}
                className="rdf__input"
              />
            ))}

            <button type="button" onClick={handleAddDocente} className="rdf__add-docente">
              + Agregar docente
            </button>
          </div>
        </div>
      </section>

      <section className="rdf__section">
        <SectionTitle>Informacion del Facilitador</SectionTitle>
        <div className="rdf__stack">
          <InputBlock label="Facilitador(a)" placeholder="Nombre completo del facilitador" />
          <InputBlock label="Datos de contacto" placeholder="Correo electronico, telefono, etc." />
        </div>
      </section>

      <section className="rdf__section">
        <SectionTitle>Informacion del Curso</SectionTitle>
        <div className="rdf__stack">
          <div className="rdf__grid-2">
            <InputBlock label="Fecha de inicio" placeholder="" type="date" />
            <InputBlock label="Fecha de fin" placeholder="" type="date" />
          </div>
          <InputBlock label="Nombre del curso" placeholder="Nombre completo del curso o capacitacion" />
          <div className="rdf__grid-2">
            <InputBlock label="Division Academica" placeholder="" />
            <InputBlock label="Carrera" placeholder="" />
          </div>
          <TextareaBlock label="Objetivo" placeholder="Descripcion del objetivo del curso" rows={5} large />
        </div>
      </section>

      <section className="rdf__section">
        <SectionTitle>Evidencias y Documentacion</SectionTitle>
        <div className="rdf__stack">
          <FileDropzone
            id="evidencias-fotograficas"
            label="Evidencias fotograficas"
            helpText="o arrastra y suelta imagenes aqui (PNG, JPG, JPEG)"
            accept="image/png,image/jpeg,image/jpg"
          />
          <FileDropzone
            id="constancias-certificados"
            label="Constancias/Certificados"
            helpText="o arrastra y suelta documentos aqui (PDF, DOC, DOCX)"
            accept=".pdf,.doc,.docx"
          />
          <FileDropzone
            id="anexos"
            label="Anexos"
            helpText="o arrastra y suelta archivos de cualquier tipo"
            accept="*"
          />
        </div>
      </section>

      <section className="rdf__section">
        <SectionTitle>Notas y Observaciones</SectionTitle>
        <div className="rdf__stack">
          <TextareaBlock
            label="Notas u observaciones"
            placeholder="Agregue cualquier nota u observacion adicional sobre el curso"
            rows={4}
          />
        </div>
      </section>

      <section className="rdf__section rdf__section--button">
        <button type="button" className="rdf__save-btn" onClick={() => setGuardado(true)}>
          Guardar Reporte de Desarrollo Docente
        </button>
      </section>

      {guardado && (
        <div className="rdf__modal-overlay" onClick={() => setGuardado(false)}>
          <div className="rdf__modal" onClick={(e) => e.stopPropagation()}>
            <div className="rdf__modal-icon">
              <i className="bi bi-check-circle-fill" />
            </div>
            <h3 className="rdf__modal-title">Reporte guardado</h3>
            <p className="rdf__modal-text">El reporte de desarrollo docente se ha guardado correctamente.</p>
            <button type="button" className="rdf__modal-btn" onClick={() => setGuardado(false)}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
