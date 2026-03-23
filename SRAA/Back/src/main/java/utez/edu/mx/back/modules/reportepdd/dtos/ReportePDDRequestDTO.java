package utez.edu.mx.back.modules.reportepdd.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class ReportePDDRequestDTO {

    @NotNull(message = "El numero de actividad es obligatorio")
    private Integer numeroActividad;
    private String folioPdd;
    @NotBlank(message = "El nombre del curso es obligatorio")
    private String nombreCurso;
    @NotBlank(message = "El objetivo es obligatorio")
    private String objetivo;
    @NotBlank(message = "El facilitador es obligatorio")
    private String facilitador;
    private String datosContactoFacilitador;
    @NotBlank(message = "La fecha de inicio es obligatoria")
    private String fechaInicio;
    @NotBlank(message = "La fecha de fin es obligatoria")
    private String fechaFin;
    private Integer horasDuracion;
    private Integer docentesHombres = 0;
    private Integer docentesMujeres = 0;
    private String notas;
    private String division;
    private String carrera;

    private List<ParticipanteDTO> participantes;

    public static class ParticipanteDTO {
        private Long idDocente;
        private String nombreExterno;
        private String tipo = "capacitado";
        public Long getIdDocente() { return idDocente; }
        public void setIdDocente(Long v) { this.idDocente = v; }
        public String getNombreExterno() { return nombreExterno; }
        public void setNombreExterno(String v) { this.nombreExterno = v; }
        public String getTipo() { return tipo; }
        public void setTipo(String v) { this.tipo = v; }
    }

    // Getters y setters
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
    public String getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(String v) { this.fechaInicio = v; }
    public String getFechaFin() { return fechaFin; }
    public void setFechaFin(String v) { this.fechaFin = v; }
    public Integer getHorasDuracion() { return horasDuracion; }
    public void setHorasDuracion(Integer v) { this.horasDuracion = v; }
    public Integer getDocentesHombres() { return docentesHombres; }
    public void setDocentesHombres(Integer v) { this.docentesHombres = v; }
    public Integer getDocentesMujeres() { return docentesMujeres; }
    public void setDocentesMujeres(Integer v) { this.docentesMujeres = v; }
    public String getNotas() { return notas; }
    public void setNotas(String v) { this.notas = v; }
    public String getDivision() { return division; }
    public void setDivision(String v) { this.division = v; }
    public String getCarrera() { return carrera; }
    public void setCarrera(String v) { this.carrera = v; }
    public List<ParticipanteDTO> getParticipantes() { return participantes; }
    public void setParticipantes(List<ParticipanteDTO> v) { this.participantes = v; }
}
