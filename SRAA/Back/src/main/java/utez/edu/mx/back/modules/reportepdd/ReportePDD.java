package utez.edu.mx.back.modules.reportepdd;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "REPORTE_PDD")
public class ReportePDD {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reporte_pdd")
    private Long idReportePdd;

    @Column(name = "numero_actividad", nullable = false)
    private Integer numeroActividad;

    @Column(name = "folio_pdd", length = 30)
    private String folioPdd;

    @Column(name = "nombre_curso", nullable = false, length = 200)
    private String nombreCurso;

    @Column(name = "objetivo", nullable = false, columnDefinition = "TEXT")
    private String objetivo;

    @Column(name = "facilitador", nullable = false, length = 150)
    private String facilitador;

    @Column(name = "datos_contacto_facilitador", length = 255)
    private String datosContactoFacilitador;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Column(name = "horas_duracion")
    private Integer horasDuracion;

    @Column(name = "docentes_hombres") private Integer docentesHombres = 0;
    @Column(name = "docentes_mujeres") private Integer docentesMujeres = 0;

    @Column(name = "division", length = 100)
    private String division;

    @Column(name = "carrera", length = 100)
    private String carrera;

    @Column(name = "notas", columnDefinition = "TEXT")
    private String notas;

    @Column(name = "estado_registro", length = 20)
    private String estadoRegistro = "borrador";

    @Column(name = "id_docente_registra", nullable = false)
    private Long idDocenteRegistra;

    @Column(name = "fecha_elaboracion", nullable = false)
    private LocalDate fechaElaboracion;

    @OneToMany(mappedBy = "reportePdd", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParticipantePDD> participantes = new ArrayList<>();

    public ReportePDD() {}

    public Long getIdReportePdd() { return idReportePdd; }
    public void setIdReportePdd(Long id) { this.idReportePdd = id; }
    public Integer getNumeroActividad() { return numeroActividad; }
    public void setNumeroActividad(Integer v) { this.numeroActividad = v; }
    public String getFolioPdd() { return folioPdd; }
    public void setFolioPdd(String v) { this.folioPdd = v; }
    public String getNombreCurso() { return nombreCurso; }
    public void setNombreCurso(String v) { this.nombreCurso = v; }
    public String getObjetivo() { return objetivo; }
    public void setObjetivo(String v) { this.objetivo = v; }
    public String getFacilitador() { return facilitador; }
    public void setFacilitador(String v) { this.facilitador = v; }
    public String getDatosContactoFacilitador() { return datosContactoFacilitador; }
    public void setDatosContactoFacilitador(String v) { this.datosContactoFacilitador = v; }
    public LocalDate getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDate v) { this.fechaInicio = v; }
    public LocalDate getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDate v) { this.fechaFin = v; }
    public Integer getHorasDuracion() { return horasDuracion; }
    public void setHorasDuracion(Integer v) { this.horasDuracion = v; }
    public Integer getDocentesHombres() { return docentesHombres; }
    public void setDocentesHombres(Integer v) { this.docentesHombres = v; }
    public Integer getDocentesMujeres() { return docentesMujeres; }
    public void setDocentesMujeres(Integer v) { this.docentesMujeres = v; }
    public String getDivision() { return division; }
    public void setDivision(String v) { this.division = v; }
    public String getCarrera() { return carrera; }
    public void setCarrera(String v) { this.carrera = v; }
    public String getNotas() { return notas; }
    public void setNotas(String v) { this.notas = v; }
    public String getEstadoRegistro() { return estadoRegistro; }
    public void setEstadoRegistro(String v) { this.estadoRegistro = v; }
    public Long getIdDocenteRegistra() { return idDocenteRegistra; }
    public void setIdDocenteRegistra(Long v) { this.idDocenteRegistra = v; }
    public LocalDate getFechaElaboracion() { return fechaElaboracion; }
    public void setFechaElaboracion(LocalDate v) { this.fechaElaboracion = v; }
    public List<ParticipantePDD> getParticipantes() { return participantes; }
    public void setParticipantes(List<ParticipantePDD> v) { this.participantes = v; }
}
