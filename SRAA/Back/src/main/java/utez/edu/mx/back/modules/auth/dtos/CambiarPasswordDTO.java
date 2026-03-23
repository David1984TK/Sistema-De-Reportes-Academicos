package utez.edu.mx.back.modules.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CambiarPasswordDTO {

    @NotBlank(message = "La contrasena actual es obligatoria")
    private String passwordActual;

    @NotBlank(message = "La nueva contrasena es obligatoria")
    @Size(min = 8, message = "La nueva contrasena debe tener al menos 8 caracteres")
    private String passwordNueva;

    @NotBlank(message = "La confirmacion es obligatoria")
    private String passwordConfirmar;

    public String getPasswordActual() { return passwordActual; }
    public void setPasswordActual(String v) { this.passwordActual = v; }
    public String getPasswordNueva() { return passwordNueva; }
    public void setPasswordNueva(String v) { this.passwordNueva = v; }
    public String getPasswordConfirmar() { return passwordConfirmar; }
    public void setPasswordConfirmar(String v) { this.passwordConfirmar = v; }
}
