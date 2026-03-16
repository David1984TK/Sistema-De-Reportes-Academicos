package utez.edu.mx.back.modules.admin;

import jakarta.persistence.*;
import utez.edu.mx.back.kernel.BaseEntity;

@Entity
@Table(name = "administrador")
public class Administrador extends BaseEntity {
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "correo", nullable = false, unique = true)
    private String correo;
    @Column(name = "password", nullable = false)
    private String password;
    public Administrador() {}
    public Administrador(String nombre, String correo, String password) {
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}