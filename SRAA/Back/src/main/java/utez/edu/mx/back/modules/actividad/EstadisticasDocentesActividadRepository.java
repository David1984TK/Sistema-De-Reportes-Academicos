package utez.edu.mx.back.modules.actividad;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadisticasDocentesActividadRepository extends JpaRepository<EstadisticasDocentesActividad, Long> {
}
