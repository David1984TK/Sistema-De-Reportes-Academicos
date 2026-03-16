import { useRef, useState } from "react";
import "./ReporteGeneralFormDoc.css";

function InputDoc({ label, placeholder, type = "text" }) {
  return (
    <div className="rgfd__field">
      <label className="rgfd__label">{label}</label>
      <input type={type} placeholder={placeholder} className="rgfd__input" />
    </div>
  );
}

export default function ReporteGeneralFormDoc() {
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

      <section className="rgfd__section rgfd__section--button">
        <button type="button" className="rgfd__save-btn">Guardar Reporte General</button>
      </section>
    </div>
  );
}
