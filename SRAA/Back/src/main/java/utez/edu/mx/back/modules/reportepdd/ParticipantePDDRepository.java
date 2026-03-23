package utez.edu.mx.back.modules.reportepdd;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantePDDRepository extends JpaRepository<ParticipantePDD, Long> {
}
