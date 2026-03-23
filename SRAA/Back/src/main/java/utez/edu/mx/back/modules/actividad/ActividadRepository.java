package utez.edu.mx.back.modules.actividad;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, Long> {
    List<Actividad> findByIdDocente(Long idDocente);
    List<Actividad> findByIdArea(Long idArea);
    List<Actividad> findByEstadoRegistro(String estadoRegistro);
    Optional<Actividad> findByFolio(String folio);
    boolean existsByFolio(String folio);
}
