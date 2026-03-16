package utez.edu.mx.back.modules.sesion;

import jakarta.persistence.*;
import utez.edu.mx.back.kernel.BaseEntity;
import java.time.LocalDateTime;

@Entity
@Table(name = "sesion")
public class Sesion extends BaseEntity {
    @Column(name = "token", nullable = false, unique = true)
    private String token;
    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;
    @Column(name = "fecha_expiracion", nullable = false)
    private LocalDateTime fechaExpiracion;
    @Column(name = "activa")
    private Boolean activa = true;
    @Column(name = "id_docente")
    private Long idDocente;
    @Column(name = "id_admin")
    private Long idAdmin;
    public Sesion() {}
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }
    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    public LocalDateTime getFechaExpiracion() {
        return fechaExpiracion;
    }
    public void setFechaExpiracion(LocalDateTime fechaExpiracion) {
        this.fechaExpiracion = fechaExpiracion;
    }
    public Boolean getActiva() {
        return activa;
    }
    public void setActiva(Boolean activa) {
        this.activa = activa;
    }
    public Long getIdDocente() {
        return idDocente;
    }
    public void setIdDocente(Long idDocente) {
        this.idDocente = idDocente;
    }
    public Long getIdAdmin() {
        return idAdmin;
    }
    public void setIdAdmin(Long idAdmin) {
        this.idAdmin = idAdmin;
    }
}