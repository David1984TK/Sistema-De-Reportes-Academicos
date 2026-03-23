import { useMemo, useRef, useState } from "react";
import { apiRequest } from "../../../api/httpClient";
import "./ReporteGeneralForm.css";

function InputBlock({ label, placeholder, type = "text", value, onChange, min = 0 }) {
  return (
    <div className="rgf__field">
      <label className="rgf__label">{label}</label>
      <input
        type={type}
        min={type === "number" ? min : undefined}
        placeholder={placeholder}
        className="rgf__input"
        value={value || ""}
        onChange={(e) => onChange(type === "number" ? (e.target.value === "" ? 0 : parseInt(e.target.value)) : e.target.value)}
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
      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg" multiple onChange={onChangeFiles} className="rgf__dropzone-input" />
      <i className="bi bi-upload rgf__dropzone-icon" />
      <p className="rgf__dropzone-title">Haz clic para cargar fotografias</p>
      <p className="rgf__dropzone-text">o arrastra y suelta las imagenes aqui</p>
      <p className="rgf__dropzone-help">Puedes seleccionar multiples imagenes (PNG, JPG, JPEG)</p>
      {selectedFiles.length > 0 && (
        <p className="rgf__dropzone-selected">
          {selectedFiles.length === 1 ? `Archivo seleccionado: ${selectedFiles[0].name}` : `${selectedFiles.length} archivos seleccionados`}
        </p>
      )}
    </button>
  );
}

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

export default function ReporteGeneralForm() {
  const evidenceInputRef = useRef(null);
  const [selectedEvidenceFiles, setSelectedEvidenceFiles] = useState([]);
  const [guardado, setGuardado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
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
    <div className="rgf">
      <section className="rgf__section">
        <SectionTitle>1. INFORMACION GENERAL</SectionTitle>
        <div className="rgf__stack">
          <div className="rgf__grid-2">
            <InputBlock label="Folio" placeholder="Numero de folio" value={form.folio} onChange={set("folio")} />
            <InputBlock label="Fecha de inicio" type="date" value={form.fechaInicio} onChange={set("fechaInicio")} />
          </div>
          <InputBlock label="Evento" placeholder="TITULO DE LA ACTIVIDAD" value={form.nombre} onChange={set("nombre")} />
          <div className="rgf__field">
            <label className="rgf__label">Objetivo</label>
            <textarea rows={4} placeholder="Descripcion del objetivo" className="rgf__textarea" value={form.objetivo} onChange={(e) => set("objetivo")(e.target.value)} />
          </div>
          <div className="rgf__grid-2">
            <InputBlock label="Division" placeholder="Division academica" value={form.division} onChange={set("division")} />
            <InputBlock label="Carrera" placeholder="Carrera o programa" value={form.carrera} onChange={set("carrera")} />
          </div>
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>2. FOTOGRAFIAS DE EVIDENCIA</SectionTitle>
        <div className="rgf__stack">
          <EvidenceDropzone fileInputRef={evidenceInputRef} onPickFiles={() => evidenceInputRef.current?.click()} onChangeFiles={(e) => setSelectedEvidenceFiles(Array.from(e.target.files || []))} selectedFiles={selectedEvidenceFiles} />
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>3. RESPONSABLES</SectionTitle>
        <div className="rgf__stack">
          <div className="rgf__grid-2">
            <InputBlock label="Nombre del responsable" placeholder="Persona a cargo" value={form.responsableNombre} onChange={set("responsableNombre")} />
            <InputBlock label="Cargo" placeholder="Cargo del responsable" value={form.responsableCargo} onChange={set("responsableCargo")} />
          </div>
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>4. INFORMACION DE ESTUDIANTES</SectionTitle>
        <div className="rgf__stack">
          <p className="rgf__subtitle">Participacion</p>
          <div className="rgf__grid-3">
            <InputBlock label="Total de estudiantes" placeholder="0" type="number" value={form.totalEstudiantes} onChange={set("totalEstudiantes")} />
            <InputBlock label="Estudiantes espectadores" placeholder="0" type="number" value={form.espectadores} onChange={set("espectadores")} />
            <InputBlock label="Estudiantes participantes" placeholder="0" type="number" value={form.participantes} onChange={set("participantes")} />
          </div>
          <p className="rgf__subtitle rgf__subtitle--spaced">Sexo</p>
          <div className="rgf__grid-2">
            <InputBlock label="Mujer" placeholder="0" type="number" value={form.sexoMujer} onChange={set("sexoMujer")} />
            <InputBlock label="Hombre" placeholder="0" type="number" value={form.sexoHombre} onChange={set("sexoHombre")} />
          </div>
          <p className="rgf__subtitle rgf__subtitle--spaced">Genero</p>
          <div className="rgf__grid-3">
            <InputBlock label="Femenino" placeholder="0" type="number" value={form.generoFemenino} onChange={set("generoFemenino")} />
            <InputBlock label="Masculino" placeholder="0" type="number" value={form.generoMasculino} onChange={set("generoMasculino")} />
            <InputBlock label="No binario" placeholder="0" type="number" value={form.generoNoBinario} onChange={set("generoNoBinario")} />
          </div>
          <p className="rgf__subtitle rgf__subtitle--spaced">Autoidentificacion</p>
          <div className="rgf__grid-3">
            <InputBlock label="Discapacidad" placeholder="0" type="number" value={form.autoidentDiscapacidad} onChange={set("autoidentDiscapacidad")} />
            <InputBlock label="Migrante" placeholder="0" type="number" value={form.autoidentMigrante} onChange={set("autoidentMigrante")} />
            <InputBlock label="Indigena" placeholder="0" type="number" value={form.autoidentIndigena} onChange={set("autoidentIndigena")} />
            <InputBlock label="Afroamericano" placeholder="0" type="number" value={form.autoidentAfroamericano} onChange={set("autoidentAfroamericano")} />
            <InputBlock label="LGBTIQ+" placeholder="0" type="number" value={form.autoidentLgbtiq} onChange={set("autoidentLgbtiq")} />
            <InputBlock label="No aplica" placeholder="0" type="number" value={form.autoidentNoAplica} onChange={set("autoidentNoAplica")} />
          </div>
          <p className="rgf__subtitle rgf__subtitle--spaced">Rango de edad</p>
          <div className="rgf__grid-3">
            <InputBlock label="15 a 19 anos" placeholder="0" type="number" value={form.edad1519} onChange={set("edad1519")} />
            <InputBlock label="20 a 29 anos" placeholder="0" type="number" value={form.edad2029} onChange={set("edad2029")} />
            <InputBlock label="30 a 39 anos" placeholder="0" type="number" value={form.edad3039} onChange={set("edad3039")} />
          </div>
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>5. INFORMACION DOCENTES/ADMINISTRATIVOS</SectionTitle>
        <div className="rgf__stack">
          <InputBlock label="Institucion que organiza la actividad" placeholder="Nombre de la institucion" value={form.institucion} onChange={set("institucion")} />
          <div className="rgf__grid-2">
            <InputBlock label="Total docentes participantes (M)" placeholder="0" type="number" value={form.docentesMujeres} onChange={set("docentesMujeres")} />
            <InputBlock label="Total docentes participantes (H)" placeholder="0" type="number" value={form.docentesHombres} onChange={set("docentesHombres")} />
            <InputBlock label="Administrativos participantes (M)" placeholder="0" type="number" value={form.adminMujeres} onChange={set("adminMujeres")} />
            <InputBlock label="Administrativos participantes (H)" placeholder="0" type="number" value={form.adminHombres} onChange={set("adminHombres")} />
          </div>
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
                  <InputBlock key={field} label={field} placeholder="0" type="number" value={programas[`${program.group}_${field}`] || 0} onChange={setProg(`${program.group}_${field}`)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>7. UBICACION Y CONTEXTO</SectionTitle>
        <div className="rgf__stack">
          <InputBlock label="Lugar donde se desarrollo la actividad" placeholder="Lugar, municipio y estado" value={form.lugar} onChange={set("lugar")} />
          <div className="rgf__field">
            <label className="rgf__label">Invitados especiales</label>
            <textarea rows={3} placeholder="Nombre de instituciones o personas invitadas" className="rgf__textarea rgf__textarea--sm" value={form.invitados} onChange={(e) => set("invitados")(e.target.value)} />
          </div>
        </div>
      </section>

      <section className="rgf__section">
        <SectionTitle>8. DESCRIPCION</SectionTitle>
        <div className="rgf__stack">
          <InputBlock label="Nombre de quien elabora el formato" placeholder="Persona que completa el documento" value={form.nombreElabora} onChange={set("nombreElabora")} />
          <div className="rgf__field">
            <label className="rgf__label">Descripcion de la actividad</label>
            <textarea rows={4} placeholder="Detalle de lo realizado" className="rgf__textarea rgf__textarea--md" value={form.descripcion} onChange={(e) => set("descripcion")(e.target.value)} />
          </div>
        </div>
      </section>

      {error && <p style={{ color: "#f87171", textAlign: "center", fontSize: 13, margin: "8px 0" }}>{error}</p>}

      <section className="rgf__section rgf__section--button">
        <button type="button" className="rgf__save-btn" onClick={handleGuardar} disabled={enviando}>
          {enviando ? "Guardando..." : "Guardar Reporte General"}
        </button>
      </section>

      {guardado && (
        <div className="rgf__modal-overlay" onClick={() => setGuardado(false)}>
          <div className="rgf__modal" onClick={(e) => e.stopPropagation()}>
            <div className="rgf__modal-icon"><i className="bi bi-check-circle-fill" /></div>
            <h3 className="rgf__modal-title">Reporte guardado</h3>
            <p className="rgf__modal-text">El reporte general se ha guardado correctamente.</p>
            <button type="button" className="rgf__modal-btn" onClick={() => setGuardado(false)}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
}
