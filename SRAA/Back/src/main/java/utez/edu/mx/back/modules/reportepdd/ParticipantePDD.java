package utez.edu.mx.back.modules.reportepdd;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "PARTICIPANTE_PDD")
public class ParticipantePDD {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_participante")
    private Long idParticipante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_reporte_pdd", nullable = false)
    @JsonIgnore
    private ReportePDD reportePdd;

    @Column(name = "id_docente")
    private Long idDocente;

    @Column(name = "nombre_externo", length = 150)
    private String nombreExterno;

    @Column(name = "tipo", nullable = false, length = 20)
    private String tipo;

    public ParticipantePDD() {}

    public Long getIdParticipante() { return idParticipante; }
    public void setIdParticipante(Long id) { this.idParticipante = id; }
    public ReportePDD getReportePdd() { return reportePdd; }
    public void setReportePdd(ReportePDD reportePdd) { this.reportePdd = reportePdd; }
    public Long getIdDocente() { return idDocente; }
    public void setIdDocente(Long idDocente) { this.idDocente = idDocente; }
    public String getNombreExterno() { return nombreExterno; }
    public void setNombreExterno(String nombreExterno) { this.nombreExterno = nombreExterno; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}
