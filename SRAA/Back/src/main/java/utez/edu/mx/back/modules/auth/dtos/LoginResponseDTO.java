package utez.edu.mx.back.modules.auth.dtos;

public class LoginResponseDTO {
    private String token;
    private String rol;
    private Long id;
    private String nombre;
    private String correo;

    public LoginResponseDTO() {}

    public LoginResponseDTO(String token, String rol, Long id, String nombre, String correo) {
        this.token = token;
        this.rol = rol;
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getRol() {
        return rol;
    }
    public void setRol(String rol) {
        this.rol = rol;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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
}