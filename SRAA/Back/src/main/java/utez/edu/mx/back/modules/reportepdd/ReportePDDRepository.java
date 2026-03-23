package utez.edu.mx.back.modules.reportepdd;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportePDDRepository extends JpaRepository<ReportePDD, Long> {
    List<ReportePDD> findByIdDocenteRegistra(Long idDocente);
    List<ReportePDD> findByEstadoRegistro(String estadoRegistro);
}
