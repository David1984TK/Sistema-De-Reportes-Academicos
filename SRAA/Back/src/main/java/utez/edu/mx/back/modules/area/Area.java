package utez.edu.mx.back.modules.area;

import jakarta.persistence.*;

@Entity
@Table(name = "AREA")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_area")
    private Long idArea;

    @Column(name = "nombre", nullable = false, length = 80, unique = true)
    private String nombre;

    public Area() {}

    public Long getIdArea() { return idArea; }
    public void setIdArea(Long idArea) { this.idArea = idArea; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}
