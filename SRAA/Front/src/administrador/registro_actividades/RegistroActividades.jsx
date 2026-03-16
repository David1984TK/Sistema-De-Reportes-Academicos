import { useState } from "react";
import ReporteGeneralForm from "./components/ReporteGeneralForm";
import ReporteDocenteForm from "./components/ReporteDocenteForm";

function GroupTitle({ children }) {
    return (
        <h3
            style={{
                margin: "10px 0 0",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "24px",
                color: "#374269",
            }}
        >
            {children}
        </h3>
    );
}

function ReportTypeCard({ title, description, selected, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                width: "100%",
                border: selected ? "2px solid #3b82f6" : "1px solid #d8dee8",
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textAlign: "left",
                cursor: "pointer",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: selected ? "#3b82f6" : "#f1f5f9",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                }}
            >
                <i
                    className="bi bi-file-earmark-text"
                    style={{ color: selected ? "#fff" : "#64748b", fontSize: "18px" }}
                />
            </div>
            <div>
                <p
                    style={{
                        margin: 0,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        color: "#374269",
                        fontSize: "17px",
                    }}
                >
                    {title}
                </p>
                <p
                    style={{
                        margin: "3px 0 0",
                        fontFamily: "'Inter', sans-serif",
                        color: "#52607a",
                        fontSize: "13px",
                    }}
                >
                    {description}
                </p>
            </div>
        </button>
    );
}

export default function RegistroActividades() {
    const [reportType, setReportType] = useState("");

    return (
        <div style={{ padding: "28px 28px 42px" }}>
            <GroupTitle>Registro de actividades</GroupTitle>
            <p
                style={{
                    margin: "6px 0 18px",
                    fontFamily: "'Inter', sans-serif",
                    color: "#52607a",
                    fontSize: "13px",
                }}
            >
                Genera reportes generales o de desarrollo docente
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "14px",
                    marginBottom: "22px",
                }}
            >
                <ReportTypeCard
                    title="Reporte General"
                    description="Reporte completo de todas las actividades academicas"
                    selected={reportType === "general"}
                    onClick={() => setReportType("general")}
                />
                <ReportTypeCard
                    title="Reporte de Desarrollo Docente"
                    description="Reporte de actividades y horas de desarrollo docente"
                    selected={reportType === "docente"}
                    onClick={() => setReportType("docente")}
                />
            </div>

            {reportType === "general" && <ReporteGeneralForm />}
            {reportType === "docente" && <ReporteDocenteForm />}
        </div>
    );
}