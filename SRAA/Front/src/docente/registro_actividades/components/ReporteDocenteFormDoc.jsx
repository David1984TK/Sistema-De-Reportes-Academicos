import { useState } from "react";
import { apiRequest } from "../../../api/httpClient";
import "./ReporteDocenteFormDoc.css";

function InputDoc({ label, placeholder, type = "text", value, onChange, min = 0 }) {
  return (
    <div className="rdfd__field">
      <label className="rdfd__label">{label}</label>
      <input
        type={type}
        min={type === "number" ? min : undefined}
        placeholder={placeholder}
        className="rdfd__input"
        value={value || ""}
        onChange={(e) => onChange(type === "number" ? (e.target.value === "" ? 0 : parseInt(e.target.value)) : e.target.value)}
      />
    </div>
  );
}

function TextareaDoc({ label, placeholder, rows = 4, large = false, value, onChange }) {
  return (
    <div className="rdfd__field">
      <label className="rdfd__label">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`rdfd__textarea${large ? " rdfd__textarea--lg" : ""}`}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function FileDropzoneDoc({ id, label, helpText, accept, files, onChangeFiles }) {
  return (
    <div className="rdfd__dropzone-wrap">
      <label className="rdfd__label">{label}</label>
      <input id={id} type="file" accept={accept} multiple className="rdfd__dropzone-input" onChange={onChangeFiles} />
      <label htmlFor={id} className="rdfd__dropzone">
        <i className="bi bi-upload rdfd__dropzone-icon" />
        <span className="rdfd__dropzone-title">Haz clic para cargar archivos</span>
        <span className="rdfd__dropzone-text">{helpText}</span>
        {files && files.length > 0 && (
          <span className="rdfd__dropzone-selected">
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

export default function ReporteDocenteFormDoc() {
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
    <div className="rdfd">
      <section className="rdfd__section">
        <h4 className="rdfd__title">Personal Docente</h4>
        <div className="rdfd__stack">
          <label className="rdfd__label">Personal docente (participante/capacitado o certificado)</label>
          <div className="rdfd__stack">
            {participantes.map((participante, index) => (
              <div key={`part-${index}`} className="rdfd__participante-row">
                <input
                  type="text"
                  value={participante.nombreExterno}
                  onChange={(e) => handleParticipanteChange(index, "nombreExterno", e.target.value)}
                  placeholder={`Nombre completo del docente ${index + 1}`}
                  className="rdfd__input"
                />
                <select
                  value={participante.tipo}
                  onChange={(e) => handleParticipanteChange(index, "tipo", e.target.value)}
                  className="rdfd__input rdfd__input--select"
                >
                  <option value="capacitado">Capacitado</option>
                  <option value="certificado">Certificado</option>
                </select>
                {participantes.length > 1 && (
                  <button type="button" onClick={() => handleRemoveParticipante(index)} className="rdfd__remove-btn">
                    <i className="bi bi-trash" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddParticipante} className="rdfd__add-docente">
              + Agregar docente
            </button>
          </div>
        </div>
      </section>

      <section className="rdfd__section">
        <h4 className="rdfd__title">Informacion del Facilitador</h4>
        <div className="rdfd__stack">
          <InputDoc label="Facilitador(a)" placeholder="Nombre completo del facilitador" value={form.facilitador} onChange={set("facilitador")} />
          <InputDoc label="Datos de contacto" placeholder="Correo electronico, telefono, etc." value={form.datosContactoFacilitador} onChange={set("datosContactoFacilitador")} />
        </div>
      </section>

      <section className="rdfd__section">
        <h4 className="rdfd__title">Informacion del Curso</h4>
        <div className="rdfd__stack">
          <div className="rdfd__grid">
            <InputDoc label="Fecha de inicio" type="date" value={form.fechaInicio} onChange={set("fechaInicio")} />
            <InputDoc label="Fecha de fin" type="date" value={form.fechaFin} onChange={set("fechaFin")} />
          </div>
          <InputDoc label="Nombre del curso" placeholder="Nombre completo del curso o capacitacion" value={form.nombreCurso} onChange={set("nombreCurso")} />
          <div className="rdfd__grid">
            <InputDoc label="Folio PDD" placeholder="Folio del programa" value={form.folioPdd} onChange={set("folioPdd")} />
            <InputDoc label="Numero de actividad" placeholder="Numero" value={form.numeroActividad} onChange={set("numeroActividad")} />
          </div>
          <InputDoc label="Horas de duracion" placeholder="0" type="number" value={form.horasDuracion} onChange={set("horasDuracion")} />
          <TextareaDoc label="Objetivo" placeholder="Descripcion del objetivo del curso" rows={5} large value={form.objetivo} onChange={set("objetivo")} />
        </div>
      </section>

      <section className="rdfd__section">
        <h4 className="rdfd__title">Estadisticas de Participacion</h4>
        <div className="rdfd__stack">
          <div className="rdfd__grid">
            <InputDoc label="Docentes Hombres" placeholder="0" type="number" value={form.docentesHombres} onChange={set("docentesHombres")} />
            <InputDoc label="Docentes Mujeres" placeholder="0" type="number" value={form.docentesMujeres} onChange={set("docentesMujeres")} />
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
            files={evidencias}
            onChangeFiles={(e) => setEvidencias(Array.from(e.target.files || []))}
          />
          <FileDropzoneDoc
            id="doc-constancias-certificados"
            label="Constancias/Certificados"
            helpText="o arrastra y suelta documentos aqui (PDF, DOC, DOCX)"
            accept=".pdf,.doc,.docx"
            files={constancias}
            onChangeFiles={(e) => setConstancias(Array.from(e.target.files || []))}
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
            value={form.notas}
            onChange={set("notas")}
          />
        </div>
      </section>

      {error && <p style={{ color: "#f87171", textAlign: "center", fontSize: 13, margin: "8px 0" }}>{error}</p>}

      <section className="rdfd__section rdfd__section--button">
        <button type="button" className="rdfd__save-btn" onClick={handleGuardar} disabled={enviando}>
          {enviando ? "Guardando..." : "Guardar Reporte de Desarrollo Docente"}
        </button>
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
