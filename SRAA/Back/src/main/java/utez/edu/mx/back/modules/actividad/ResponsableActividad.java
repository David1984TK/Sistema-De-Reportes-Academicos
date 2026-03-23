package utez.edu.mx.back.modules.actividad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "RESPONSABLE_ACTIVIDAD")
public class ResponsableActividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_responsable")
    private Long idResponsable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_actividad", nullable = false)
    @JsonIgnore
    private Actividad actividad;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Column(name = "cargo", nullable = false, length = 100)
    private String cargo;

    @Column(name = "es_interno")
    private Boolean esInterno = true;

    public ResponsableActividad() {}

    public Long getIdResponsable() { return idResponsable; }
    public void setIdResponsable(Long idResponsable) { this.idResponsable = idResponsable; }
    public Actividad getActividad() { return actividad; }
    public void setActividad(Actividad actividad) { this.actividad = actividad; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }
    public Boolean getEsInterno() { return esInterno; }
    public void setEsInterno(Boolean esInterno) { this.esInterno = esInterno; }
}
