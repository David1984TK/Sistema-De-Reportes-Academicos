package utez.edu.mx.back.modules.reportepdd;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.back.kernel.ApiResponse;
import utez.edu.mx.back.modules.reportepdd.dtos.ReportePDDRequestDTO;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportePDDService {

    private final ReportePDDRepository reporteRepository;

    public ReportePDDService(ReportePDDRepository reporteRepository) {
        this.reporteRepository = reporteRepository;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> listarTodos() {
        List<ReportePDD> reportes = reporteRepository.findAll();
        return new ResponseEntity<>(
                new ApiResponse("Reportes PDD encontrados", reportes, HttpStatus.OK),
                HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> listarPorDocente(Long idDocente) {
        List<ReportePDD> reportes = reporteRepository.findByIdDocenteRegistra(idDocente);
        return new ResponseEntity<>(
                new ApiResponse("Reportes del docente", reportes, HttpStatus.OK),
                HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> buscarPorId(Long id) {
        return reporteRepository.findById(id)
                .map(r -> new ResponseEntity<>(
                        new ApiResponse("Reporte encontrado", r, HttpStatus.OK),
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(
                        new ApiResponse("Reporte no encontrado", true, HttpStatus.NOT_FOUND),
                        HttpStatus.NOT_FOUND));
    }

    @Transactional
    public ResponseEntity<ApiResponse> crear(ReportePDDRequestDTO dto, Long idDocente) {
        ReportePDD reporte = new ReportePDD();
        reporte.setNumeroActividad(dto.getNumeroActividad());
        reporte.setFolioPdd(dto.getFolioPdd());
        reporte.setNombreCurso(dto.getNombreCurso());
        reporte.setObjetivo(dto.getObjetivo());
        reporte.setFacilitador(dto.getFacilitador());
        reporte.setDatosContactoFacilitador(dto.getDatosContactoFacilitador());
        reporte.setFechaInicio(LocalDate.parse(dto.getFechaInicio()));
        reporte.setFechaFin(LocalDate.parse(dto.getFechaFin()));
        reporte.setHorasDuracion(dto.getHorasDuracion());
        reporte.setDocentesHombres(dto.getDocentesHombres());
        reporte.setDocentesMujeres(dto.getDocentesMujeres());
        reporte.setDivision(dto.getDivision());
        reporte.setCarrera(dto.getCarrera());
        reporte.setNotas(dto.getNotas());
        reporte.setEstadoRegistro("borrador");
        reporte.setIdDocenteRegistra(idDocente);
        reporte.setFechaElaboracion(LocalDate.now());

        // Participantes (docentes del curso)
        if (dto.getParticipantes() != null) {
            for (ReportePDDRequestDTO.ParticipanteDTO p : dto.getParticipantes()) {
                ParticipantePDD part = new ParticipantePDD();
                part.setIdDocente(p.getIdDocente());
                part.setNombreExterno(p.getNombreExterno());
                part.setTipo(p.getTipo() != null ? p.getTipo() : "capacitado");
                part.setReportePdd(reporte);
                reporte.getParticipantes().add(part);
            }
        }

        ReportePDD guardado = reporteRepository.save(reporte);
        return new ResponseEntity<>(
                new ApiResponse("Reporte PDD registrado", guardado.getIdReportePdd(), HttpStatus.CREATED),
                HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<ApiResponse> cambiarEstado(Long id, String nuevoEstado) {
        return reporteRepository.findById(id)
                .map(r -> {
                    r.setEstadoRegistro(nuevoEstado);
                    reporteRepository.save(r);
                    return new ResponseEntity<>(
                            new ApiResponse("Estado actualizado", null, HttpStatus.OK),
                            HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(
                        new ApiResponse("Reporte no encontrado", true, HttpStatus.NOT_FOUND),
                        HttpStatus.NOT_FOUND));
    }
}
