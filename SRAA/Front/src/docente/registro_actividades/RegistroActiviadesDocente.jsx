import { useState } from "react";
import ReporteGeneralFormDoc from "./components/ReporteGeneralFormDoc";
import ReporteDocenteFormDoc from "./components/ReporteDocenteFormDoc";
import "./RegistroActiviadesDocente.css";

function CardTipoReporteDoc({ title, description, selected, onClick }) {
    return (
        <button type="button" onClick={onClick} className={`radoc__card ${selected ? "radoc__card--active" : ""}`}>
            <div className="radoc__icon-wrap">
                <i className="bi bi-file-earmark-text radoc__icon" />
            </div>
            <div>
                <p className="radoc__card-title">{title}</p>
                <p className="radoc__card-text">{description}</p>
            </div>
        </button>
    );
}

export default function RegistroActividadesDocente() {
    const [reportType, setReportType] = useState("");

    return (
        <div className="radoc">
            <h3 className="radoc__title">Registro de actividades</h3>
            <p className="radoc__subtitle">Genera reportes generales o de desarrollo docente</p>

            <div className="radoc__cards">
                <CardTipoReporteDoc
                    title="Reporte General"
                    description="Reporte completo de todas las actividades academicas"
                    selected={reportType === "general"}
                    onClick={() => setReportType("general")}
                />
                <CardTipoReporteDoc
                    title="Reporte de Desarrollo Docente"
                    description="Reporte de actividades y horas de desarrollo docente"
                    selected={reportType === "docente"}
                    onClick={() => setReportType("docente")}
                />
            </div>

            {reportType === "general" && <ReporteGeneralFormDoc />}
            {reportType === "docente" && <ReporteDocenteFormDoc />}
        </div>
    );
}