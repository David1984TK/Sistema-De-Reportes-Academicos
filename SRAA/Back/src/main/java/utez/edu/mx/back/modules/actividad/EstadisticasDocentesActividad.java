package utez.edu.mx.back.modules.actividad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "ESTADISTICAS_DOCENTES_ACTIVIDAD")
public class EstadisticasDocentesActividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estadistica")
    private Long idEstadistica;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_actividad", nullable = false, unique = true)
    @JsonIgnore
    private Actividad actividad;

    @Column(name = "docentes_hombres") private Integer docentesHombres = 0;
    @Column(name = "docentes_mujeres") private Integer docentesMujeres = 0;
    @Column(name = "administrativos_hombres") private Integer administrativosHombres = 0;
    @Column(name = "administrativos_mujeres") private Integer administrativosMujeres = 0;

    public EstadisticasDocentesActividad() {}

    public Long getIdEstadistica() { return idEstadistica; }
    public void setIdEstadistica(Long id) { this.idEstadistica = id; }
    public Actividad getActividad() { return actividad; }
    public void setActividad(Actividad actividad) { this.actividad = actividad; }
    public Integer getDocentesHombres() { return docentesHombres; }
    public void setDocentesHombres(Integer v) { this.docentesHombres = v; }
    public Integer getDocentesMujeres() { return docentesMujeres; }
    public void setDocentesMujeres(Integer v) { this.docentesMujeres = v; }
    public Integer getAdministrativosHombres() { return administrativosHombres; }
    public void setAdministrativosHombres(Integer v) { this.administrativosHombres = v; }
    public Integer getAdministrativosMujeres() { return administrativosMujeres; }
    public void setAdministrativosMujeres(Integer v) { this.administrativosMujeres = v; }
}
