package utez.edu.mx.back.modules.sesion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SesionRepository extends JpaRepository<Sesion, Long> {
    Optional<Sesion> findByToken(String token);
    void deleteByToken(String token);
}