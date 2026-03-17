import { useMemo, useState } from "react";
import "./Calendario.css";

const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const EVENTOS_INICIALES = [
  { id: 1, titulo: "Workshop React",        fecha: "2026-02-10", hora: "11:00", tipo: "taller" },
  { id: 2, titulo: "Workshop Node",         fecha: "2026-02-12", hora: "11:00", tipo: "taller" },
  { id: 3, titulo: "Taller de Diseño",      fecha: "2026-02-15", hora: "10:00", tipo: "taller" },
  { id: 4, titulo: "Conferencia IoT",       fecha: "2026-02-18", hora: "14:00", tipo: "conferencia" },
  { id: 5, titulo: "Curso AWS",             fecha: "2026-02-20", hora: "09:00", tipo: "taller" },
  { id: 6, titulo: "Seminario IA",          fecha: "2026-02-25", hora: "15:30", tipo: "conferencia" },
  { id: 7, titulo: "Taller de BD",          fecha: "2026-03-05", hora: "10:00", tipo: "taller" },
  { id: 8, titulo: "Conferencia Seguridad", fecha: "2026-03-12", hora: "13:00", tipo: "conferencia" },
];

function getDiasDelMes(year, month) {
  const primerDia = new Date(year, month, 1).getDay();
  const totalDias = new Date(year, month + 1, 0).getDate();
  const celdas = [];
  for (let i = 0; i < primerDia; i++) celdas.push(null);
  for (let d = 1; d <= totalDias; d++) celdas.push(d);
  return celdas;
}

export default function Calendario() {
  const hoy = new Date();
  const [year, setYear] = useState(hoy.getFullYear());
  const [month, setMonth] = useState(hoy.getMonth());

  const celdas = useMemo(() => getDiasDelMes(year, month), [year, month]);

  const eventosPorDia = useMemo(() => {
    const map = {};
    EVENTOS_INICIALES.forEach((ev) => {
      const [y, m, d] = ev.fecha.split("-").map(Number);
      if (y === year && m - 1 === month) {
        if (!map[d]) map[d] = [];
        map[d].push(ev);
      }
    });
    return map;
  }, [year, month]);

  const irMesAnterior = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };

  const irMesSiguiente = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  return (
    <main className="cal">
      <div className="cal__encabezado">
        <h1 className="cal__titulo">Calendario de Actividades Académicas</h1>
        <p className="cal__descripcion">Visualiza todas las actividades programadas en el calendario</p>
      </div>

      <div className="cal__card">
        <div className="cal__nav">
          <span className="cal__mes-label">{MESES[month]} {year}</span>
          <div className="cal__nav-btns">
            <button className="cal__nav-btn" onClick={irMesAnterior} type="button" aria-label="Mes anterior">
              <i className="bi bi-chevron-left" />
            </button>
            <button className="cal__nav-btn" onClick={irMesSiguiente} type="button" aria-label="Mes siguiente">
              <i className="bi bi-chevron-right" />
            </button>
          </div>
        </div>

        <div className="cal__grid">
          {DIAS_SEMANA.map((dia) => (
            <div key={dia} className="cal__dia-header">{dia}</div>
          ))}

          {celdas.map((dia, i) => (
            <div key={i} className={`cal__celda${dia === null ? " cal__celda--vacia" : ""}`}>
              {dia !== null && (
                <>
                  <span className="cal__numero">{dia}</span>
                  <div className="cal__eventos">
                    {(eventosPorDia[dia] || []).map((ev) => (
                      <div
                        key={ev.id}
                        className={`cal__evento cal__evento--${ev.tipo}`}
                        title={ev.titulo}
                      >
                        {ev.hora} {ev.titulo}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="cal__leyenda">
          <div className="cal__leyenda-item">
            <span className="cal__leyenda-dot cal__leyenda-dot--taller" />
            Talleres y Cursos
          </div>
          <div className="cal__leyenda-item">
            <span className="cal__leyenda-dot cal__leyenda-dot--conferencia" />
            Conferencias y Seminarios
          </div>
        </div>
      </div>
    </main>
  );
}