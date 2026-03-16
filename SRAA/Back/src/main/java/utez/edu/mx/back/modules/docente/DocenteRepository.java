package utez.edu.mx.back.modules.docente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DocenteRepository extends JpaRepository<DocentePersonal, Long> {
    Optional<DocentePersonal> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}