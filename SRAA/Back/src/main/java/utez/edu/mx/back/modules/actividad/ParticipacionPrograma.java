package utez.edu.mx.back.modules.actividad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "PARTICIPACION_PROGRAMA")
public class ParticipacionPrograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_participacion")
    private Long idParticipacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_actividad", nullable = false)
    @JsonIgnore
    private Actividad actividad;

    @Column(name = "division", nullable = false, length = 10)
    private String division;

    @Column(name = "programa", nullable = false, length = 20)
    private String programa;

    @Column(name = "cantidad")
    private Integer cantidad = 0;

    public ParticipacionPrograma() {}

    public Long getIdParticipacion() { return idParticipacion; }
    public void setIdParticipacion(Long id) { this.idParticipacion = id; }
    public Actividad getActividad() { return actividad; }
    public void setActividad(Actividad actividad) { this.actividad = actividad; }
    public String getDivision() { return division; }
    public void setDivision(String division) { this.division = division; }
    public String getPrograma() { return programa; }
    public void setPrograma(String programa) { this.programa = programa; }
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}
