import { useMemo, useRef, useState } from "react";
import "./ReporteGeneralForm.css";

function InputBlock({ label, placeholder, type = "text", min = 0 }) {
  return (
    <div className="rgf__field">
      <label className="rgf__label">{label}</label>
      <input
        type={type}
        min={type === "number" ? min : undefined}
        placeholder={placeholder}
        className="rgf__input"
      />
    </div>
  );
}

function SectionTitle({ children }) {
  return <h4 className="rgf__section-title">{children}</h4>;
}

function EvidenceDropzone({ fileInputRef, onPickFiles, onChangeFiles, selectedFiles }) {
  return (
    <button type="button" onClick={onPickFiles} className="rgf__dropzone">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        multiple
        onChange={onChangeFiles}
        className="rgf__dropzone-input"
      />
      <i className="bi bi-upload rgf__dropzone-icon" />
      <p className="rgf__dropzone-title">Haz clic para cargar fotografias</p>
      <p className="rgf__dropzone-text">o arrastra y suelta las imagenes aqui</p>
      <p className="rgf__dropzone-help">Puedes seleccionar multiples imagenes (PNG, JPG, JPEG)</p>
      {selectedFiles.length > 0 && (
        <p className="rgf__dropzone-selected">
          {selectedFiles.length === 1
            ? `Archivo seleccionado: ${selectedFiles[0].name}`
            : `${selectedFiles.length} archivos seleccionados`}
        </p>
      )}
    </button>
  );
}

export default function ReporteGeneralForm() {
  const evidenceInputRef = useRef(null);
  const [selectedEvidenceFiles, setSelectedEvidenceFiles] = useState([]);

  const handlePickEvidenceFiles = () => {
    evidenceInputRef.current?.click();
  };

  const handleEvidenceFilesChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedEvidenceFiles(files);
  };

  const programaEducativo = useMemo(
    () => [
      { group: "DACEA", fields: ["CO", "ME", "EFEP", "GCH", "LCO", "LINM", "LGCH"] },
      { group: "DAMI", fields: ["AUT", "MT", "NT", "PP", "IMC", "IMT", "INT", "IIN"] },
      { group: "DATEFI", fields: ["GB", "LGB", "LTF"] },
      { group: "DATID", fields: ["DA", "DI", "DS", "IRD", "LDDyPA", "IDTyM", "IDyGs", "IRIyC"] },
    ],
    []
  );

  return (
    <div className="rgf">
      <section className="rgf__section">
        <SectionTitle>1. INFORMACION GENERAL</SectionTitle>
        <div className="rgf__stack">
          <div className="rgf__grid-2">
            <InputBlock label="Folio" placeholder="Numero de folio" />
            <InputBlock label="Fecha de inicio" placeholder="" type="date" />
          </div>
          <InputBlock label="Evento" placeholder="TITULO DE LA ACTIVIDAD" />
          <div className="rgf__field">
            <label className="rgf__label">Objetivo</label>
            <textarea
              rows={4}
              placeholder="Descripcion del objetivo de la actividad"
              className="rgf__textarea"
            />
          </div>
          <div className="rgf__grid-2">
            <InputBlock label="Division" placeholder="Division academica" />
            <InputBlock label="Carrera" placeholder="Carrera o programa" />
          </div>
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>2. FOTOGRAFIAS DE EVIDENCIA</SectionTitle>
        <div className="rgf__stack">
          <EvidenceDropzone
            fileInputRef={evidenceInputRef}
            onPickFiles={handlePickEvidenceFiles}
            onChangeFiles={handleEvidenceFilesChange}
            selectedFiles={selectedEvidenceFiles}
          />
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>3. RESPONSABLES</SectionTitle>
        <div className="rgf__stack">
          <InputBlock label="Nombre y cargo del responsable" placeholder="Persona a cargo de la actividad" />
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>4. INFORMACION DE ESTUDIANTES</SectionTitle>
        <div className="rgf__stack">
          <p className="rgf__subtitle">Participacion</p>
          <div className="rgf__grid-3">
            <InputBlock label="Total de estudiantes" placeholder="0" type="number" />
            <InputBlock label="Estudiantes espectadores" placeholder="0" type="number" />
            <InputBlock label="Estudiantes participantes" placeholder="0" type="number" />
          </div>

          <p className="rgf__subtitle rgf__subtitle--spaced">Sexo</p>
          <div className="rgf__grid-2">
            <InputBlock label="Mujer" placeholder="0" type="number" />
            <InputBlock label="Hombre" placeholder="0" type="number" />
          </div>

          <p className="rgf__subtitle rgf__subtitle--spaced">Genero</p>
          <div className="rgf__grid-3">
            <InputBlock label="Femenino" placeholder="0" type="number" />
            <InputBlock label="Masculino" placeholder="0" type="number" />
            <InputBlock label="No binario" placeholder="0" type="number" />
          </div>

          <p className="rgf__subtitle rgf__subtitle--spaced">Autoidentificacion</p>
          <div className="rgf__grid-3">
            <InputBlock label="Discapacidad" placeholder="0" type="number" />
            <InputBlock label="Migrante" placeholder="0" type="number" />
            <InputBlock label="Indigena" placeholder="0" type="number" />
            <InputBlock label="Afroamericano" placeholder="0" type="number" />
            <InputBlock label="LGBTIQ+" placeholder="0" type="number" />
            <InputBlock label="No aplica" placeholder="0" type="number" />
          </div>

          <p className="rgf__subtitle rgf__subtitle--spaced">Rango de edad</p>
          <div className="rgf__grid-3">
            <InputBlock label="15 a 19 anos" placeholder="0" type="number" />
            <InputBlock label="20 a 29 anos" placeholder="0" type="number" />
            <InputBlock label="30 a 39 anos" placeholder="0" type="number" />
          </div>
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>5. INFORMACION DOCENTES/ADMINISTRATIVOS</SectionTitle>
        <div className="rgf__stack">
          <InputBlock label="Institucion que organiza la actividad" placeholder="Nombre de la institucion" />
          <div className="rgf__grid-2">
            <InputBlock label="Total docentes participantes (M)" placeholder="Mujer" type="number" />
            <InputBlock label="Total docentes participantes (H)" placeholder="Hombre" type="number" />
            <InputBlock label="Administrativos participantes (M)" placeholder="Mujer" type="number" />
            <InputBlock label="Administrativos participantes (H)" placeholder="Hombre" type="number" />
          </div>
          <InputBlock label="Total docentes + administrativos" placeholder="Se calcula automaticamente" />
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>6. ESTUDIANTES POR PROGRAMA EDUCATIVO</SectionTitle>
        <div className="rgf__program-grid">
          {programaEducativo.map((program) => (
            <div key={program.group} className="rgf__program-item">
              <p className="rgf__subtitle">{program.group}</p>
              <div className="rgf__program-fields">
                {program.fields.map((field) => (
                  <InputBlock key={field} label={field} placeholder="0" type="number" />
                ))}
              </div>
            </div>
          ))}
          <InputBlock label="Total estudiantes" placeholder="Se calcula automaticamente" />
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>7. UBICACION Y CONTEXTO</SectionTitle>
        <div className="rgf__stack">
          <InputBlock label="Lugar donde se desarrollo la actividad" placeholder="Lugar, municipio y estado" />
          <div className="rgf__field">
            <label className="rgf__label">Invitados especiales</label>
            <textarea
              rows={3}
              placeholder="Nombre de instituciones o personas invitadas"
              className="rgf__textarea rgf__textarea--sm"
            />
          </div>
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>8. DESCRIPCION</SectionTitle>
        <div className="rgf__stack">
          <InputBlock label="Nombre de quien elabora el formato" placeholder="Persona que completa el documento" />
          <div className="rgf__field">
            <label className="rgf__label">Descripcion de la actividad</label>
            <textarea rows={4} placeholder="Detalle de lo realizado" className="rgf__textarea rgf__textarea--md" />
          </div>
        </div>
      </section>

      <section className="rgf__section rgf__section--button">
        <button type="button" className="rgf__save-btn">
          Guardar Reporte General
        </button>
      </section>
    </div>
  );
}
