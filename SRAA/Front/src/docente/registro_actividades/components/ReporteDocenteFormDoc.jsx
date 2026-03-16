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
            <button type="button" onClick={handleAddDocente} className="rdfd__save-btn">
              + Agregar docente
            </button>
          </div>
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
        </div>
      </section>

      <section className="rdfd__section rdfd__section--button">
        <button type="button" className="rdfd__save-btn">Guardar Reporte de Desarrollo Docente</button>
      </section>
    </div>
  );
}
