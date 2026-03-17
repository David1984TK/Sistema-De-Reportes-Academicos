package utez.edu.mx.back.modules.usuarios;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "USUARIOS_LOGIN")
public class UsuariosLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;
    @Column(name = "correo", nullable = false, unique = true)
    private String correo;
    @Column(name = "password", nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(name = "rol", nullable = false)
    private Rol rol;
    @Column(name = "id_referencia", nullable = false)
    private Long idReferencia;
    @Column(name = "login_attempts")
    private Integer loginAttempts = 0;
    @Column(name = "locked_until")
    private LocalDateTime lockedUntil;
    @Column(name = "activo")
    private Boolean activo = true;
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    public enum Rol {
        ADMIN, DOCENTE
    }
    public UsuariosLogin() {}
    public Long getIdUsuario() {
        return idUsuario;
    }
    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
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
    public Rol getRol() {
        return rol;
    }
    public void setRol(Rol rol) {
        this.rol = rol;
    }
    public Long getIdReferencia() {
        return idReferencia;
    }
    public void setIdReferencia(Long idReferencia) {
        this.idReferencia = idReferencia;
    }
    public Integer getLoginAttempts() {
        return loginAttempts;
    }
    public void setLoginAttempts(Integer loginAttempts) {
        this.loginAttempts = loginAttempts;
    }
    public LocalDateTime getLockedUntil() {
        return lockedUntil;
    }
    public void setLockedUntil(LocalDateTime lockedUntil) {
        this.lockedUntil = lockedUntil;
    }
    public Boolean getActivo() {
        return activo;
    }
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}