package utez.edu.mx.back.modules.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.back.kernel.ApiResponse;
import utez.edu.mx.back.modules.admin.AdministradorRepository;
import utez.edu.mx.back.modules.auth.dtos.LoginRequestDTO;
import utez.edu.mx.back.modules.auth.dtos.LoginResponseDTO;
import utez.edu.mx.back.modules.docente.DocenteRepository;
import utez.edu.mx.back.modules.usuarios.UsuariosLogin;
import utez.edu.mx.back.modules.usuarios.UsuariosRepository;
import utez.edu.mx.back.security.JwtUtils;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UsuariosRepository usuariosRepository;
    private final AdministradorRepository administradorRepository;
    private final DocenteRepository docenteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    private static final int MAX_ATTEMPTS = 3;
    private static final int LOCK_MINUTES = 15;

    public AuthService(UsuariosRepository usuariosRepository,
                       AdministradorRepository administradorRepository,
                       DocenteRepository docenteRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils) {
        this.usuariosRepository = usuariosRepository;
        this.administradorRepository = administradorRepository;
        this.docenteRepository = docenteRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Transactional
    public ResponseEntity<ApiResponse> login(LoginRequestDTO request) {
        String correo = request.getCorreo();
        String password = request.getPassword();

        // Validar correo institucional
        if (!correo.endsWith("@utez.edu.mx")) {
            return new ResponseEntity<>(
                    new ApiResponse("Debe ser correo institucional (@utez.edu.mx)", true, HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST
            );
        }

        // Buscar usuario
        Optional<UsuariosLogin> optionalUser = usuariosRepository.findByCorreo(correo);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>(
                    new ApiResponse("Credenciales incorrectas", true, HttpStatus.UNAUTHORIZED),
                    HttpStatus.UNAUTHORIZED
            );
        }

        UsuariosLogin user = optionalUser.get();

        // Verificar si está bloqueado
        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(LocalDateTime.now())) {
            return new ResponseEntity<>(
                    new ApiResponse("Cuenta bloqueada por múltiples intentos fallidos", true, HttpStatus.UNAUTHORIZED),
                    HttpStatus.UNAUTHORIZED
            );
        }

        // Verificar si está activo
        if (!user.getActivo()) {
            return new ResponseEntity<>(
                    new ApiResponse("Cuenta desactivada", true, HttpStatus.UNAUTHORIZED),
                    HttpStatus.UNAUTHORIZED
            );
        }

        // Validar contraseña
        if (!passwordEncoder.matches(password, user.getPassword())) {
            // Incrementar intentos fallidos
            usuariosRepository.incrementLoginAttempts(correo);
            // Verificar si debe bloquearse
            user = usuariosRepository.findByCorreo(correo).get();
            if (user.getLoginAttempts() >= MAX_ATTEMPTS) {
                user.setLockedUntil(LocalDateTime.now().plusMinutes(LOCK_MINUTES));
                usuariosRepository.save(user);
                return new ResponseEntity<>(
                        new ApiResponse("Cuenta bloqueada por " + LOCK_MINUTES + " minutos", true, HttpStatus.UNAUTHORIZED),
                        HttpStatus.UNAUTHORIZED
                );
            }
            return new ResponseEntity<>(
                    new ApiResponse("Credenciales incorrectas", true, HttpStatus.UNAUTHORIZED),
                    HttpStatus.UNAUTHORIZED
            );
        }

        // Login exitoso - resetear intentos
        usuariosRepository.resetLoginAttempts(correo);

        // Obtener nombre real desde la BD
        String nombre = obtenerNombrePorReferencia(user);

        // Normalizar rol para el frontend
        String rolFront = user.getRol() == UsuariosLogin.Rol.ADMIN ? "administrador" : "docente";

        String token = jwtUtils.generateToken(
                user.getCorreo(),
                user.getRol().toString(),
                user.getIdUsuario()
        );

        LoginResponseDTO response = new LoginResponseDTO(
                token,
                rolFront,
                user.getIdUsuario(),
                nombre,
                user.getCorreo()
        );

        return new ResponseEntity<>(
                new ApiResponse("Login exitoso", response, HttpStatus.OK),
                HttpStatus.OK
        );
    }

    private String obtenerNombrePorReferencia(UsuariosLogin user) {
        if (user.getRol() == UsuariosLogin.Rol.ADMIN) {
            return administradorRepository.findById(user.getIdReferencia())
                    .map(a -> a.getNombre())
                    .orElse("Administrador");
        } else {
            return docenteRepository.findById(user.getIdReferencia())
                    .map(d -> d.getNombreCompleto())
                    .orElse("Docente");
        }
    }
}