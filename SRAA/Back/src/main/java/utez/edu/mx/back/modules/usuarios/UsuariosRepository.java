package utez.edu.mx.back.modules.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UsuariosRepository extends JpaRepository<UsuariosLogin, Long> {
    Optional<UsuariosLogin> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
    @Modifying
    @Transactional
    @Query("UPDATE UsuariosLogin u SET u.loginAttempts = u.loginAttempts + 1 WHERE u.correo = :correo")
    void incrementLoginAttempts(@Param("correo") String correo);
    @Modifying
    @Transactional
    @Query("UPDATE UsuariosLogin u SET u.loginAttempts = 0, u.lockedUntil = NULL WHERE u.correo = :correo")
    void resetLoginAttempts(@Param("correo") String correo);
}