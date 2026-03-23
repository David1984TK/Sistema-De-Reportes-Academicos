package utez.edu.mx.back.modules.actividad;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.back.kernel.ApiResponse;
import utez.edu.mx.back.modules.actividad.dtos.ActividadRequestDTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActividadService {

    private final ActividadRepository actividadRepository;

    public ActividadService(ActividadRepository actividadRepository) {
        this.actividadRepository = actividadRepository;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> listarTodas() {
        List<Actividad> actividades = actividadRepository.findAll();
        return new ResponseEntity<>(
                new ApiResponse("Actividades encontradas", actividades, HttpStatus.OK),
                HttpStatus.OK
        );
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> listarPorDocente(Long idDocente) {
        List<Actividad> actividades = actividadRepository.findByIdDocente(idDocente);
        return new ResponseEntity<>(
                new ApiResponse("Actividades del docente", actividades, HttpStatus.OK),
                HttpStatus.OK
        );
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> buscarPorId(Long id) {
        return actividadRepository.findById(id)
                .map(act -> new ResponseEntity<>(
                        new ApiResponse("Actividad encontrada", act, HttpStatus.OK),
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(
                        new ApiResponse("Actividad no encontrada", true, HttpStatus.NOT_FOUND),
                        HttpStatus.NOT_FOUND));
    }

    @Transactional
    public ResponseEntity<ApiResponse> crear(ActividadRequestDTO dto, Long idDocente) {
        if (actividadRepository.existsByFolio(dto.getFolio())) {
            return new ResponseEntity<>(
                    new ApiResponse("Ya existe una actividad con ese folio", true, HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }

        Actividad actividad = mapearDesdeDTO(dto);
        actividad.setIdDocente(idDocente);
        actividad.setEstadoRegistro("borrador");

        // Responsables
        if (dto.getResponsables() != null) {
            for (ActividadRequestDTO.ResponsableDTO r : dto.getResponsables()) {
                ResponsableActividad resp = new ResponsableActividad();
                resp.setNombre(r.getNombre());
                resp.setCargo(r.getCargo());
                resp.setEsInterno(r.getEsInterno());
                resp.setActividad(actividad);
                actividad.getResponsables().add(resp);
            }
        }

        // Estadisticas estudiantes
        if (dto.getEstadisticasEstudiantes() != null) {
            EstadisticasEstudiantes est = new EstadisticasEstudiantes();
            copiarEstadisticasEstudiantes(dto.getEstadisticasEstudiantes(), est);
            est.setActividad(actividad);
            actividad.setEstadisticasEstudiantes(est);
        }

        // Estadisticas docentes
        if (dto.getEstadisticasDocentes() != null) {
            EstadisticasDocentesActividad estDoc = new EstadisticasDocentesActividad();
            estDoc.setDocentesHombres(dto.getEstadisticasDocentes().getDocentesHombres());
            estDoc.setDocentesMujeres(dto.getEstadisticasDocentes().getDocentesMujeres());
            estDoc.setAdministrativosHombres(dto.getEstadisticasDocentes().getAdministrativosHombres());
            estDoc.setAdministrativosMujeres(dto.getEstadisticasDocentes().getAdministrativosMujeres());
            estDoc.setActividad(actividad);
            actividad.setEstadisticasDocentes(estDoc);
        }

        // Participaciones por programa
        if (dto.getParticipaciones() != null) {
            for (ActividadRequestDTO.ParticipacionDTO p : dto.getParticipaciones()) {
                if (p.getCantidad() != null && p.getCantidad() > 0) {
                    ParticipacionPrograma part = new ParticipacionPrograma();
                    part.setDivision(p.getDivision());
                    part.setPrograma(p.getPrograma());
                    part.setCantidad(p.getCantidad());
                    part.setActividad(actividad);
                    actividad.getParticipaciones().add(part);
                }
            }
        }

        Actividad guardada = actividadRepository.save(actividad);
        return new ResponseEntity<>(
                new ApiResponse("Actividad registrada", guardada.getIdActividad(), HttpStatus.CREATED),
                HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<ApiResponse> cambiarEstado(Long id, String nuevoEstado) {
        return actividadRepository.findById(id)
                .map(act -> {
                    act.setEstadoRegistro(nuevoEstado);
                    actividadRepository.save(act);
                    return new ResponseEntity<>(
                            new ApiResponse("Estado actualizado a " + nuevoEstado, null, HttpStatus.OK),
                            HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(
                        new ApiResponse("Actividad no encontrada", true, HttpStatus.NOT_FOUND),
                        HttpStatus.NOT_FOUND));
    }

    private Actividad mapearDesdeDTO(ActividadRequestDTO dto) {
        Actividad a = new Actividad();
        a.setFolio(dto.getFolio());
        a.setNombre(dto.getNombre());
        a.setObjetivo(dto.getObjetivo());
        a.setIdArea(dto.getIdArea());
        a.setTipo(dto.getTipo());
        a.setTipoOtro(dto.getTipoOtro());
        a.setFechaInicio(LocalDate.parse(dto.getFechaInicio()));
        a.setFechaFin(LocalDate.parse(dto.getFechaFin()));
        if (dto.getHoraInicio() != null && !dto.getHoraInicio().isEmpty())
            a.setHoraInicio(LocalTime.parse(dto.getHoraInicio()));
        if (dto.getHoraFin() != null && !dto.getHoraFin().isEmpty())
            a.setHoraFin(LocalTime.parse(dto.getHoraFin()));
        a.setLugar(dto.getLugar());
        a.setMunicipio(dto.getMunicipio() != null ? dto.getMunicipio() : "Emiliano Zapata");
        a.setEstado(dto.getEstado() != null ? dto.getEstado() : "Morelos");
        a.setInvitadosEspeciales(dto.getInvitadosEspeciales());
        a.setInstitucionOrganizadora(dto.getInstitucionOrganizadora());
        a.setMedioCorreo(dto.getMedioCorreo());
        a.setMedioRedes(dto.getMedioRedes());
        a.setMedioCarteles(dto.getMedioCarteles());
        a.setMedioOtro(dto.getMedioOtro());
        a.setResena(dto.getResena());
        a.setImpacto(dto.getImpacto());
        a.setAntecedentes(dto.getAntecedentes());
        a.setNombreElabora(dto.getNombreElabora());
        a.setFechaElaboracion(LocalDate.parse(dto.getFechaElaboracion()));
        return a;
    }

    private void copiarEstadisticasEstudiantes(ActividadRequestDTO.EstadisticasEstudiantesDTO src, EstadisticasEstudiantes dest) {
        dest.setTotalEstudiantes(src.getTotalEstudiantes());
        dest.setEspectadores(src.getEspectadores());
        dest.setParticipantes(src.getParticipantes());
        dest.setSexoMujer(src.getSexoMujer());
        dest.setSexoHombre(src.getSexoHombre());
        dest.setGeneroFemenino(src.getGeneroFemenino());
        dest.setGeneroMasculino(src.getGeneroMasculino());
        dest.setGeneroNoBinario(src.getGeneroNoBinario());
        dest.setAutoidentDiscapacidad(src.getAutoidentDiscapacidad());
        dest.setAutoidentMigrante(src.getAutoidentMigrante());
        dest.setAutoidentIndigena(src.getAutoidentIndigena());
        dest.setAutoidentAfroamericano(src.getAutoidentAfroamericano());
        dest.setAutoidentLgbtiq(src.getAutoidentLgbtiq());
        dest.setAutoidentNoAplica(src.getAutoidentNoAplica());
        dest.setEdad1519(src.getEdad1519());
        dest.setEdad2029(src.getEdad2029());
        dest.setEdad3039(src.getEdad3039());
    }
}
