package utez.edu.mx.back.modules.actividad;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ACTIVIDAD")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_actividad")
    private Long idActividad;

    @Column(name = "folio", nullable = false, length = 30, unique = true)
    private String folio;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Column(name = "objetivo", nullable = false, columnDefinition = "TEXT")
    private String objetivo;

    @Column(name = "id_area", nullable = false)
    private Long idArea;

    @Column(name = "tipo", nullable = false, length = 30)
    private String tipo;

    @Column(name = "tipo_otro", length = 100)
    private String tipoOtro;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Column(name = "hora_inicio")
    private LocalTime horaInicio;

    @Column(name = "hora_fin")
    private LocalTime horaFin;

    @Column(name = "lugar", nullable = false, length = 150)
    private String lugar;

    @Column(name = "municipio", nullable = false, length = 100)
    private String municipio;

    @Column(name = "estado", nullable = false, length = 100)
    private String estado;

    @Column(name = "invitados_especiales", columnDefinition = "TEXT")
    private String invitadosEspeciales;

    @Column(name = "institucion_organizadora", length = 150)
    private String institucionOrganizadora;

    @Column(name = "medio_correo")
    private Boolean medioCorreo = false;

    @Column(name = "medio_redes")
    private Boolean medioRedes = false;

    @Column(name = "medio_carteles")
    private Boolean medioCarteles = false;

    @Column(name = "medio_otro", length = 100)
    private String medioOtro;

    @Column(name = "resena", nullable = false, columnDefinition = "TEXT")
    private String resena;

    @Column(name = "impacto", columnDefinition = "TEXT")
    private String impacto;

    @Column(name = "antecedentes", columnDefinition = "TEXT")
    private String antecedentes;

    @Column(name = "nombre_elabora", nullable = false, length = 150)
    private String nombreElabora;

    @Column(name = "fecha_elaboracion", nullable = false)
    private LocalDate fechaElaboracion;

    @Column(name = "estado_registro", length = 20)
    private String estadoRegistro = "borrador";

    @Column(name = "id_docente", nullable = false)
    private Long idDocente;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResponsableActividad> responsables = new ArrayList<>();

    @OneToOne(mappedBy = "actividad", cascade = CascadeType.ALL, orphanRemoval = true)
    private EstadisticasEstudiantes estadisticasEstudiantes;

    @OneToOne(mappedBy = "actividad", cascade = CascadeType.ALL, orphanRemoval = true)
    private EstadisticasDocentesActividad estadisticasDocentes;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParticipacionPrograma> participaciones = new ArrayList<>();

    public Actividad() {}

    // Getters y setters
    public Long getIdActividad() { return idActividad; }
    public void setIdActividad(Long idActividad) { this.idActividad = idActividad; }
    public String getFolio() { return folio; }
    public void setFolio(String folio) { this.folio = folio; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getObjetivo() { return objetivo; }
    public void setObjetivo(String objetivo) { this.objetivo = objetivo; }
    public Long getIdArea() { return idArea; }
    public void setIdArea(Long idArea) { this.idArea = idArea; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getTipoOtro() { return tipoOtro; }
    public void setTipoOtro(String tipoOtro) { this.tipoOtro = tipoOtro; }
    public LocalDate getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }
    public LocalDate getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDate fechaFin) { this.fechaFin = fechaFin; }
    public LocalTime getHoraInicio() { return horaInicio; }
    public void setHoraInicio(LocalTime horaInicio) { this.horaInicio = horaInicio; }
    public LocalTime getHoraFin() { return horaFin; }
    public void setHoraFin(LocalTime horaFin) { this.horaFin = horaFin; }
    public String getLugar() { return lugar; }
    public void setLugar(String lugar) { this.lugar = lugar; }
    public String getMunicipio() { return municipio; }
    public void setMunicipio(String municipio) { this.municipio = municipio; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getInvitadosEspeciales() { return invitadosEspeciales; }
    public void setInvitadosEspeciales(String invitadosEspeciales) { this.invitadosEspeciales = invitadosEspeciales; }
    public String getInstitucionOrganizadora() { return institucionOrganizadora; }
    public void setInstitucionOrganizadora(String institucionOrganizadora) { this.institucionOrganizadora = institucionOrganizadora; }
    public Boolean getMedioCorreo() { return medioCorreo; }
    public void setMedioCorreo(Boolean medioCorreo) { this.medioCorreo = medioCorreo; }
    public Boolean getMedioRedes() { return medioRedes; }
    public void setMedioRedes(Boolean medioRedes) { this.medioRedes = medioRedes; }
    public Boolean getMedioCarteles() { return medioCarteles; }
    public void setMedioCarteles(Boolean medioCarteles) { this.medioCarteles = medioCarteles; }
    public String getMedioOtro() { return medioOtro; }
    public void setMedioOtro(String medioOtro) { this.medioOtro = medioOtro; }
    public String getResena() { return resena; }
    public void setResena(String resena) { this.resena = resena; }
    public String getImpacto() { return impacto; }
    public void setImpacto(String impacto) { this.impacto = impacto; }
    public String getAntecedentes() { return antecedentes; }
    public void setAntecedentes(String antecedentes) { this.antecedentes = antecedentes; }
    public String getNombreElabora() { return nombreElabora; }
    public void setNombreElabora(String nombreElabora) { this.nombreElabora = nombreElabora; }
    public LocalDate getFechaElaboracion() { return fechaElaboracion; }
    public void setFechaElaboracion(LocalDate fechaElaboracion) { this.fechaElaboracion = fechaElaboracion; }
    public String getEstadoRegistro() { return estadoRegistro; }
    public void setEstadoRegistro(String estadoRegistro) { this.estadoRegistro = estadoRegistro; }
    public Long getIdDocente() { return idDocente; }
    public void setIdDocente(Long idDocente) { this.idDocente = idDocente; }
    public List<ResponsableActividad> getResponsables() { return responsables; }
    public void setResponsables(List<ResponsableActividad> responsables) { this.responsables = responsables; }
    public EstadisticasEstudiantes getEstadisticasEstudiantes() { return estadisticasEstudiantes; }
    public void setEstadisticasEstudiantes(EstadisticasEstudiantes estadisticasEstudiantes) { this.estadisticasEstudiantes = estadisticasEstudiantes; }
    public EstadisticasDocentesActividad getEstadisticasDocentes() { return estadisticasDocentes; }
    public void setEstadisticasDocentes(EstadisticasDocentesActividad estadisticasDocentes) { this.estadisticasDocentes = estadisticasDocentes; }
    public List<ParticipacionPrograma> getParticipaciones() { return participaciones; }
    public void setParticipaciones(List<ParticipacionPrograma> participaciones) { this.participaciones = participaciones; }
}
