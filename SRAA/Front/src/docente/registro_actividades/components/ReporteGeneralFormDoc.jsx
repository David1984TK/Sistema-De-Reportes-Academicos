import { useMemo, useRef, useState } from "react";
import { apiRequest } from "../../../api/httpClient";
import "./ReporteGeneralFormDoc.css";

function InputDoc({ label, placeholder, type = "text", value, onChange, min = 0 }) {
  return (
    <div className="rgfd__field">
      <label className="rgfd__label">{label}</label>
      <input
        type={type}
        min={type === "number" ? min : undefined}
        placeholder={placeholder}
        className="rgfd__input"
        value={value || ""}
        onChange={(e) => onChange(type === "number" ? (e.target.value === "" ? 0 : parseInt(e.target.value)) : e.target.value)}
      />
    </div>
  );
}

export default function ReporteGeneralFormDoc() {
  const evidenceInputRef = useRef(null);
  const [selectedEvidenceFiles, setSelectedEvidenceFiles] = useState([]);
  const [guardado, setGuardado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const INITIAL_FORM = {
    folio: "", fechaInicio: "", nombre: "", objetivo: "", division: "", carrera: "",
    responsableNombre: "", responsableCargo: "",
    totalEstudiantes: 0, espectadores: 0, participantes: 0,
    sexoMujer: 0, sexoHombre: 0,
    generoFemenino: 0, generoMasculino: 0, generoNoBinario: 0,
    autoidentDiscapacidad: 0, autoidentMigrante: 0, autoidentIndigena: 0,
    autoidentAfroamericano: 0, autoidentLgbtiq: 0, autoidentNoAplica: 0,
    edad1519: 0, edad2029: 0, edad3039: 0,
    institucion: "", docentesMujeres: 0, docentesHombres: 0,
    adminMujeres: 0, adminHombres: 0,
    lugar: "", invitados: "",
    nombreElabora: "", descripcion: "",
  };

  const [form, setForm] = useState({ ...INITIAL_FORM });
  const [programas, setProgramas] = useState({});

  const set = (campo) => (valor) => setForm((prev) => ({ ...prev, [campo]: valor }));
  const setProg = (key) => (valor) => setProgramas((prev) => ({ ...prev, [key]: valor }));

  const programaEducativo = useMemo(() => [
    { group: "DACEA", fields: ["CO", "ME", "EFEP", "GCH", "LCO", "LINM", "LGCH"] },
    { group: "DAMI", fields: ["AUT", "MT", "NT", "PP", "IMC", "IMT", "INT", "IIN"] },
    { group: "DATEFI", fields: ["GB", "LGB", "LTF"] },
    { group: "DATID", fields: ["DA", "DI", "DS", "IRD", "LDDyPA", "IDTyM", "IDyGs", "IRIyC"] },
  ], []);

  const divisionMap = { "DACEA": 1, "DAMI": 2, "DATEFI": 3, "DATID": 4 };

  const handleGuardar = async () => {
    if (!form.folio || !form.nombre || !form.fechaInicio) {
      setError("Completa los campos obligatorios: folio, evento y fecha");
      return;
    }
    setEnviando(true);
    setError("");

    const participaciones = [];
    programaEducativo.forEach((group) => {
      group.fields.forEach((field) => {
        const cantidad = programas[`${group.group}_${field}`] || 0;
        if (cantidad > 0) {
          participaciones.push({ division: group.group, programa: field, cantidad });
        }
      });
    });

    const idArea = divisionMap[form.division] || 1;

    const payload = {
      folio: form.folio,
      nombre: form.nombre,
      objetivo: form.objetivo || "Sin objetivo especificado",
      idArea,
      tipo: "Otra",
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaInicio,
      lugar: form.lugar || "UTEZ",
      municipio: "Emiliano Zapata",
      estado: "Morelos",
      invitadosEspeciales: form.invitados,
      institucionOrganizadora: form.institucion,
      resena: form.descripcion || "Sin descripcion",
      nombreElabora: form.nombreElabora || "Sin especificar",
      fechaElaboracion: new Date().toISOString().split("T")[0],
      responsables: form.responsableNombre ? [{ nombre: form.responsableNombre, cargo: form.responsableCargo || "Responsable", esInterno: true }] : [],
      estadisticasEstudiantes: {
        totalEstudiantes: form.totalEstudiantes,
        espectadores: form.espectadores,
        participantes: form.participantes,
        sexoMujer: form.sexoMujer,
        sexoHombre: form.sexoHombre,
        generoFemenino: form.generoFemenino,
        generoMasculino: form.generoMasculino,
        generoNoBinario: form.generoNoBinario,
        autoidentDiscapacidad: form.autoidentDiscapacidad,
        autoidentMigrante: form.autoidentMigrante,
        autoidentIndigena: form.autoidentIndigena,
        autoidentAfroamericano: form.autoidentAfroamericano,
        autoidentLgbtiq: form.autoidentLgbtiq,
        autoidentNoAplica: form.autoidentNoAplica,
        edad1519: form.edad1519,
        edad2029: form.edad2029,
        edad3039: form.edad3039,
      },
      estadisticasDocentes: {
        docentesHombres: form.docentesHombres,
        docentesMujeres: form.docentesMujeres,
        administrativosHombres: form.adminHombres,
        administrativosMujeres: form.adminMujeres,
      },
      participaciones,
    };

    try {
      await apiRequest("/actividades", { method: "POST", body: payload });
      setGuardado(true);
      setForm({ ...INITIAL_FORM });
      setProgramas({});
    } catch (err) {
      setError(err.message || "Error al guardar el reporte");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="rgfd">
      <section className="rgfd__section">
        <h4 className="rgfd__title">1. INFORMACION GENERAL</h4>
        <div className="rgfd__stack">
          <div className="rgfd__grid">
            <InputDoc label="Folio" placeholder="Numero de folio" value={form.folio} onChange={set("folio")} />
            <InputDoc label="Fecha de inicio" type="date" value={form.fechaInicio} onChange={set("fechaInicio")} />
          </div>
          <InputDoc label="Evento" placeholder="TITULO DE LA ACTIVIDAD" value={form.nombre} onChange={set("nombre")} />
          <div className="rgfd__field">
            <label className="rgfd__label">Objetivo</label>
            <textarea rows={4} placeholder="Descripcion del objetivo de la actividad" className="rgfd__textarea" value={form.objetivo} onChange={(e) => set("objetivo")(e.target.value)} />
          </div>
          <div className="rgfd__grid">
            <InputDoc label="Division" placeholder="Division academica" value={form.division} onChange={set("division")} />
            <InputDoc label="Carrera" placeholder="Carrera o programa" value={form.carrera} onChange={set("carrera")} />
          </div>
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">2. FOTOGRAFIAS DE EVIDENCIA</h4>
        <div className="rgfd__stack">
          <button type="button" onClick={() => evidenceInputRef.current?.click()} className="rgfd__dropzone">
            <input
              ref={evidenceInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              multiple
              onChange={(e) => setSelectedEvidenceFiles(Array.from(e.target.files || []))}
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
          <div className="rgfd__grid">
            <InputDoc label="Nombre del responsable" placeholder="Persona a cargo" value={form.responsableNombre} onChange={set("responsableNombre")} />
            <InputDoc label="Cargo" placeholder="Cargo del responsable" value={form.responsableCargo} onChange={set("responsableCargo")} />
          </div>
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">4. INFORMACION DE ESTUDIANTES</h4>
        <div className="rgfd__stack">
          <p className="rgfd__subtitle">Participacion</p>
          <div className="rgfd__grid-3">
            <InputDoc label="Total de estudiantes" placeholder="0" type="number" value={form.totalEstudiantes} onChange={set("totalEstudiantes")} />
            <InputDoc label="Estudiantes espectadores" placeholder="0" type="number" value={form.espectadores} onChange={set("espectadores")} />
            <InputDoc label="Estudiantes participantes" placeholder="0" type="number" value={form.participantes} onChange={set("participantes")} />
          </div>

          <p className="rgfd__subtitle rgfd__subtitle--spaced">Sexo</p>
          <div className="rgfd__grid">
            <InputDoc label="Mujer" placeholder="0" type="number" value={form.sexoMujer} onChange={set("sexoMujer")} />
            <InputDoc label="Hombre" placeholder="0" type="number" value={form.sexoHombre} onChange={set("sexoHombre")} />
          </div>

          <p className="rgfd__subtitle rgfd__subtitle--spaced">Genero</p>
          <div className="rgfd__grid-3">
            <InputDoc label="Femenino" placeholder="0" type="number" value={form.generoFemenino} onChange={set("generoFemenino")} />
            <InputDoc label="Masculino" placeholder="0" type="number" value={form.generoMasculino} onChange={set("generoMasculino")} />
            <InputDoc label="No binario" placeholder="0" type="number" value={form.generoNoBinario} onChange={set("generoNoBinario")} />
          </div>

          <p className="rgfd__subtitle rgfd__subtitle--spaced">Autoidentificacion</p>
          <div className="rgfd__grid-3">
            <InputDoc label="Discapacidad" placeholder="0" type="number" value={form.autoidentDiscapacidad} onChange={set("autoidentDiscapacidad")} />
            <InputDoc label="Migrante" placeholder="0" type="number" value={form.autoidentMigrante} onChange={set("autoidentMigrante")} />
            <InputDoc label="Indigena" placeholder="0" type="number" value={form.autoidentIndigena} onChange={set("autoidentIndigena")} />
            <InputDoc label="Afroamericano" placeholder="0" type="number" value={form.autoidentAfroamericano} onChange={set("autoidentAfroamericano")} />
            <InputDoc label="LGBTIQ+" placeholder="0" type="number" value={form.autoidentLgbtiq} onChange={set("autoidentLgbtiq")} />
            <InputDoc label="No aplica" placeholder="0" type="number" value={form.autoidentNoAplica} onChange={set("autoidentNoAplica")} />
          </div>

          <p className="rgfd__subtitle rgfd__subtitle--spaced">Rango de edad</p>
          <div className="rgfd__grid-3">
            <InputDoc label="15 a 19 anos" placeholder="0" type="number" value={form.edad1519} onChange={set("edad1519")} />
            <InputDoc label="20 a 29 anos" placeholder="0" type="number" value={form.edad2029} onChange={set("edad2029")} />
            <InputDoc label="30 a 39 anos" placeholder="0" type="number" value={form.edad3039} onChange={set("edad3039")} />
          </div>
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">5. INFORMACION DOCENTES/ADMINISTRATIVOS</h4>
        <div className="rgfd__stack">
          <InputDoc label="Institucion que organiza la actividad" placeholder="Nombre de la institucion" value={form.institucion} onChange={set("institucion")} />
          <div className="rgfd__grid">
            <InputDoc label="Total docentes participantes (M)" placeholder="0" type="number" value={form.docentesMujeres} onChange={set("docentesMujeres")} />
            <InputDoc label="Total docentes participantes (H)" placeholder="0" type="number" value={form.docentesHombres} onChange={set("docentesHombres")} />
            <InputDoc label="Administrativos participantes (M)" placeholder="0" type="number" value={form.adminMujeres} onChange={set("adminMujeres")} />
            <InputDoc label="Administrativos participantes (H)" placeholder="0" type="number" value={form.adminHombres} onChange={set("adminHombres")} />
          </div>
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
                  <InputDoc key={field} label={field} placeholder="0" type="number" value={programas[`${program.group}_${field}`] || 0} onChange={setProg(`${program.group}_${field}`)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">7. UBICACION Y CONTEXTO</h4>
        <div className="rgfd__stack">
          <InputDoc label="Lugar donde se desarrollo la actividad" placeholder="Lugar, municipio y estado" value={form.lugar} onChange={set("lugar")} />
          <div className="rgfd__field">
            <label className="rgfd__label">Invitados especiales</label>
            <textarea rows={3} placeholder="Nombre de instituciones o personas invitadas" className="rgfd__textarea rgfd__textarea--sm" value={form.invitados} onChange={(e) => set("invitados")(e.target.value)} />
          </div>
        </div>
      </section>

      <section className="rgfd__section">
        <h4 className="rgfd__title">8. DESCRIPCION</h4>
        <div className="rgfd__stack">
          <InputDoc label="Nombre de quien elabora el formato" placeholder="Persona que completa el documento" value={form.nombreElabora} onChange={set("nombreElabora")} />
          <div className="rgfd__field">
            <label className="rgfd__label">Descripcion de la actividad</label>
            <textarea rows={4} placeholder="Detalle de lo realizado" className="rgfd__textarea rgfd__textarea--md" value={form.descripcion} onChange={(e) => set("descripcion")(e.target.value)} />
          </div>
        </div>
      </section>

      {error && <p style={{ color: "#f87171", textAlign: "center", fontSize: 13, margin: "8px 0" }}>{error}</p>}

      <section className="rgfd__section rgfd__section--button">
        <button type="button" className="rgfd__save-btn" onClick={handleGuardar} disabled={enviando}>
          {enviando ? "Guardando..." : "Guardar Reporte General"}
        </button>
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
