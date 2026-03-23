package utez.edu.mx.back.modules.reportepdd;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.back.kernel.ApiResponse;
import utez.edu.mx.back.modules.reportepdd.dtos.ReportePDDRequestDTO;
import utez.edu.mx.back.modules.usuarios.UsuariosLogin;
import utez.edu.mx.back.modules.usuarios.UsuariosRepository;

import java.util.Map;

@RestController
@RequestMapping("/reportes-pdd")
public class ReportePDDController {

    private final ReportePDDService reporteService;
    private final UsuariosRepository usuariosRepository;

    public ReportePDDController(ReportePDDService reporteService,
                                UsuariosRepository usuariosRepository) {
        this.reporteService = reporteService;
        this.usuariosRepository = usuariosRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> listar() {
        return reporteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> buscar(@PathVariable Long id) {
        return reporteService.buscarPorId(id);
    }

    @GetMapping("/mis-reportes")
    public ResponseEntity<ApiResponse> misReportes(Authentication auth) {
        Long idDocente = obtenerIdDocente(auth);
        return reporteService.listarPorDocente(idDocente);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> crear(@Valid @RequestBody ReportePDDRequestDTO dto,
                                             Authentication auth) {
        Long idDocente = obtenerIdDocente(auth);
        return reporteService.crear(dto, idDocente);
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<ApiResponse> cambiarEstado(@PathVariable Long id,
                                                     @RequestBody Map<String, String> body) {
        return reporteService.cambiarEstado(id, body.get("estado"));
    }

    private Long obtenerIdDocente(Authentication auth) {
        String correo = auth.getName();
        UsuariosLogin user = usuariosRepository.findByCorreo(correo).orElse(null);
        return user != null ? user.getIdReferencia() : 0L;
    }
}
