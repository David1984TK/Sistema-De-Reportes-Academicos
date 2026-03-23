import { useState } from "react";
import { apiRequest } from "../../../api/httpClient";
import "./ReporteDocenteForm.css";

function InputBlock({ label, placeholder, type = "text", value, onChange, min = 0 }) {
  return (
    <div className="rdf__field">
      <label className="rdf__label">{label}</label>
      <input
        type={type}
        min={type === "number" ? min : undefined}
        placeholder={placeholder}
        className="rdf__input"
        value={value || ""}
        onChange={(e) => onChange(type === "number" ? (e.target.value === "" ? 0 : parseInt(e.target.value)) : e.target.value)}
      />
    </div>
  );
}

function TextareaBlock({ label, placeholder, rows = 4, large = false, value, onChange }) {
  return (
    <div className="rdf__field">
      <label className="rdf__label">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`rdf__textarea ${large ? "rdf__textarea--lg" : ""}`}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SectionTitle({ children }) {
  return <h4 className="rdf__section-title">{children}</h4>;
}

function FileDropzone({ id, label, helpText, accept, files, onChangeFiles }) {
  return (
    <div className="rdf__dropzone-wrap">
      <label className="rdf__label">{label}</label>
      <input id={id} type="file" accept={accept} multiple className="rdf__dropzone-input" onChange={onChangeFiles} />
      <label htmlFor={id} className="rdf__dropzone">
        <i className="bi bi-upload rdf__dropzone-icon" />
        <span className="rdf__dropzone-title">Haz clic para cargar archivos</span>
        <span className="rdf__dropzone-text">{helpText}</span>
        {files && files.length > 0 && (
          <span className="rdf__dropzone-selected">
            {files.length === 1 ? `Archivo: ${files[0].name}` : `${files.length} archivos seleccionados`}
          </span>
        )}
      </label>
    </div>
  );
}

const INITIAL_FORM = {
  nombreCurso: "", objetivo: "", folioPdd: "", numeroActividad: "",
  facilitador: "", datosContactoFacilitador: "",
  fechaInicio: "", fechaFin: "", horasDuracion: 0,
  docentesHombres: 0, docentesMujeres: 0,
  notas: "",
};

export default function ReporteDocenteForm() {
  const [form, setForm] = useState({ ...INITIAL_FORM });
  const [participantes, setParticipantes] = useState([{ nombreExterno: "", tipo: "capacitado" }]);
  const [guardado, setGuardado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [evidencias, setEvidencias] = useState([]);
  const [constancias, setConstancias] = useState([]);

  const set = (campo) => (valor) => setForm((prev) => ({ ...prev, [campo]: valor }));

  const handleAddParticipante = () => {
    setParticipantes((prev) => [...prev, { nombreExterno: "", tipo: "capacitado" }]);
  };

  const handleParticipanteChange = (index, field, value) => {
    setParticipantes((prev) => prev.map((item, idx) => idx === index ? { ...item, [field]: value } : item));
  };

  const handleRemoveParticipante = (index) => {
    if (participantes.length <= 1) return;
    setParticipantes((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleGuardar = async () => {
    if (!form.nombreCurso || !form.fechaInicio || !form.fechaFin) {
      setError("Completa los campos obligatorios: nombre del curso, fecha inicio y fecha fin");
      return;
    }
    setEnviando(true);
    setError("");

    const listaParticipantes = participantes
      .filter((p) => p.nombreExterno.trim() !== "")
      .map((p) => ({ nombreExterno: p.nombreExterno, tipo: p.tipo }));

    const payload = {
      nombreCurso: form.nombreCurso,
      objetivo: form.objetivo || "Sin objetivo especificado",
      folioPdd: form.folioPdd,
      numeroActividad: form.numeroActividad,
      facilitador: form.facilitador,
      datosContactoFacilitador: form.datosContactoFacilitador,
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin,
      horasDuracion: form.horasDuracion,
      docentesHombres: form.docentesHombres,
      docentesMujeres: form.docentesMujeres,
      notas: form.notas,
      participantes: listaParticipantes,
    };

    try {
      await apiRequest("/reportes-pdd", { method: "POST", body: payload });
      setGuardado(true);
      setForm({ ...INITIAL_FORM });
      setParticipantes([{ nombreExterno: "", tipo: "capacitado" }]);
    } catch (err) {
      setError(err.message || "Error al guardar el reporte");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="rdf">
      <section className="rdf__section">
        <SectionTitle>Personal Docente</SectionTitle>
        <div className="rdf__stack">
          <label className="rdf__label">Personal docente (participante/capacitado o certificado)</label>
          <div className="rdf__docentes-list">
            {participantes.map((participante, index) => (
              <div key={`part-${index}`} className="rdf__participante-row">
                <input
                  type="text"
                  value={participante.nombreExterno}
                  onChange={(e) => handleParticipanteChange(index, "nombreExterno", e.target.value)}
                  placeholder={`Nombre completo del docente ${index + 1}`}
                  className="rdf__input"
                />
                <select
                  value={participante.tipo}
                  onChange={(e) => handleParticipanteChange(index, "tipo", e.target.value)}
                  className="rdf__input rdf__input--select"
                >
                  <option value="capacitado">Capacitado</option>
                  <option value="certificado">Certificado</option>
                </select>
                {participantes.length > 1 && (
                  <button type="button" onClick={() => handleRemoveParticipante(index)} className="rdf__remove-btn">
                    <i className="bi bi-trash" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddParticipante} className="rdf__add-docente">
              + Agregar docente
            </button>
          </div>
        </div>
      </section>

      <section className="rdf__section">
        <SectionTitle>Informacion del Facilitador</SectionTitle>
        <div className="rdf__stack">
          <InputBlock label="Facilitador(a)" placeholder="Nombre completo del facilitador" value={form.facilitador} onChange={set("facilitador")} />
          <InputBlock label="Datos de contacto" placeholder="Correo electronico, telefono, etc." value={form.datosContactoFacilitador} onChange={set("datosContactoFacilitador")} />
        </div>
      </section>

      <section className="rdf__section">
        <SectionTitle>Informacion del Curso</SectionTitle>
        <div className="rdf__stack">
          <div className="rdf__grid-2">
            <InputBlock label="Fecha de inicio" type="date" value={form.fechaInicio} onChange={set("fechaInicio")} />
            <InputBlock label="Fecha de fin" type="date" value={form.fechaFin} onChange={set("fechaFin")} />
          </div>
          <InputBlock label="Nombre del curso" placeholder="Nombre completo del curso o capacitacion" value={form.nombreCurso} onChange={set("nombreCurso")} />
          <div className="rdf__grid-2">
            <InputBlock label="Folio PDD" placeholder="Folio del programa" value={form.folioPdd} onChange={set("folioPdd")} />
            <InputBlock label="Numero de actividad" placeholder="Numero" value={form.numeroActividad} onChange={set("numeroActividad")} />
          </div>
          <div className="rdf__grid-2">
            <InputBlock label="Horas de duracion" placeholder="0" type="number" value={form.horasDuracion} onChange={set("horasDuracion")} />
          </div>
          <TextareaBlock label="Objetivo" placeholder="Descripcion del objetivo del curso" rows={5} large value={form.objetivo} onChange={set("objetivo")} />
        </div>
      </section>

      <section className="rdf__section">
        <SectionTitle>Estadisticas de Participacion</SectionTitle>
        <div className="rdf__stack">
          <div className="rdf__grid-2">
            <InputBlock label="Docentes Hombres" placeholder="0" type="number" value={form.docentesHombres} onChange={set("docentesHombres")} />
            <InputBlock label="Docentes Mujeres" placeholder="0" type="number" value={form.docentesMujeres} onChange={set("docentesMujeres")} />
          </div>
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
            files={evidencias}
            onChangeFiles={(e) => setEvidencias(Array.from(e.target.files || []))}
          />
          <FileDropzone
            id="constancias-certificados"
            label="Constancias/Certificados"
            helpText="o arrastra y suelta documentos aqui (PDF, DOC, DOCX)"
            accept=".pdf,.doc,.docx"
            files={constancias}
            onChangeFiles={(e) => setConstancias(Array.from(e.target.files || []))}
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
            value={form.notas}
            onChange={set("notas")}
          />
        </div>
      </section>

      {error && <p style={{ color: "#f87171", textAlign: "center", fontSize: 13, margin: "8px 0" }}>{error}</p>}

      <section className="rdf__section rdf__section--button">
        <button type="button" className="rdf__save-btn" onClick={handleGuardar} disabled={enviando}>
          {enviando ? "Guardando..." : "Guardar Reporte de Desarrollo Docente"}
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
