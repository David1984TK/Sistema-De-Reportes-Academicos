package utez.edu.mx.back.modules.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.back.kernel.ApiResponse;
import utez.edu.mx.back.modules.auth.dtos.LoginRequestDTO;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequestDTO request) {
        return authService.login(request);
    }
}