package utez.edu.mx.back.modules.actividad;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.back.kernel.ApiResponse;
import utez.edu.mx.back.modules.actividad.dtos.ActividadRequestDTO;
import utez.edu.mx.back.modules.usuarios.UsuariosLogin;
import utez.edu.mx.back.modules.usuarios.UsuariosRepository;

import java.util.Map;

@RestController
@RequestMapping("/actividades")
public class ActividadController {

    private final ActividadService actividadService;
    private final UsuariosRepository usuariosRepository;

    public ActividadController(ActividadService actividadService,
                               UsuariosRepository usuariosRepository) {
        this.actividadService = actividadService;
        this.usuariosRepository = usuariosRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> listar() {
        return actividadService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> buscar(@PathVariable Long id) {
        return actividadService.buscarPorId(id);
    }

    @GetMapping("/mis-actividades")
    public ResponseEntity<ApiResponse> misActividades(Authentication auth) {
        Long idDocente = obtenerIdDocente(auth);
        return actividadService.listarPorDocente(idDocente);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> crear(@Valid @RequestBody ActividadRequestDTO dto,
                                             Authentication auth) {
        Long idDocente = obtenerIdDocente(auth);
        return actividadService.crear(dto, idDocente);
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<ApiResponse> cambiarEstado(@PathVariable Long id,
                                                     @RequestBody Map<String, String> body) {
        String nuevoEstado = body.get("estado");
        return actividadService.cambiarEstado(id, nuevoEstado);
    }

    private Long obtenerIdDocente(Authentication auth) {
        String correo = auth.getName();
        UsuariosLogin user = usuariosRepository.findByCorreo(correo).orElse(null);
        return user != null ? user.getIdReferencia() : 0L;
    }
}
