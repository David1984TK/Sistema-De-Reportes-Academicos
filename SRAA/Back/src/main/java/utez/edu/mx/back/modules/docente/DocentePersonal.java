package utez.edu.mx.back.modules.docente;

import jakarta.persistence.*;
import utez.edu.mx.back.kernel.BaseEntity;

@Entity
@Table(name = "docente_personal")
public class DocentePersonal extends BaseEntity {
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "correo", nullable = false, unique = true)
    private String correo;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "foto_perfil")
    private String fotoPerfil;
    @Column(name = "id_area", nullable = false)
    private Long idArea;
    @Column(name = "activo")
    private Boolean activo = true;
    public DocentePersonal() {}
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
    public String getFotoPerfil() {
        return fotoPerfil;
    }
    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }
    public Long getIdArea() {
        return idArea;
    }
    public void setIdArea(Long idArea) {
        this.idArea = idArea;
    }
    public Boolean getActivo() {
        return activo;
    }
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}