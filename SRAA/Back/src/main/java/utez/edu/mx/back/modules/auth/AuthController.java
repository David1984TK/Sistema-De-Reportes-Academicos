package utez.edu.mx.back.modules.auth;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.back.kernel.ApiResponse;
import utez.edu.mx.back.modules.auth.dtos.CambiarPasswordDTO;
import utez.edu.mx.back.modules.auth.dtos.LoginRequestDTO;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequestDTO request) {
        return authService.login(request);
    }
    @PutMapping("/cambiar-password")
    public ResponseEntity<ApiResponse> cambiarPassword(@Valid @RequestBody CambiarPasswordDTO dto,
                                                        Authentication auth) {
        String correo = auth.getName();
        return authService.cambiarPassword(correo, dto);
    }
}