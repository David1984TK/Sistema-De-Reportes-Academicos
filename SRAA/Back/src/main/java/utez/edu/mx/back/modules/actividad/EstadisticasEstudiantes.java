package utez.edu.mx.back.modules.actividad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "ESTADISTICAS_ESTUDIANTES")
public class EstadisticasEstudiantes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estadistica")
    private Long idEstadistica;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_actividad", nullable = false, unique = true)
    @JsonIgnore
    private Actividad actividad;

    @Column(name = "total_estudiantes") private Integer totalEstudiantes = 0;
    @Column(name = "espectadores") private Integer espectadores = 0;
    @Column(name = "participantes") private Integer participantes = 0;
    @Column(name = "sexo_mujer") private Integer sexoMujer = 0;
    @Column(name = "sexo_hombre") private Integer sexoHombre = 0;
    @Column(name = "genero_femenino") private Integer generoFemenino = 0;
    @Column(name = "genero_masculino") private Integer generoMasculino = 0;
    @Column(name = "genero_no_binario") private Integer generoNoBinario = 0;
    @Column(name = "autoident_discapacidad") private Integer autoidentDiscapacidad = 0;
    @Column(name = "autoident_migrante") private Integer autoidentMigrante = 0;
    @Column(name = "autoident_indigena") private Integer autoidentIndigena = 0;
    @Column(name = "autoident_afroamericano") private Integer autoidentAfroamericano = 0;
    @Column(name = "autoident_lgbtiq") private Integer autoidentLgbtiq = 0;
    @Column(name = "autoident_no_aplica") private Integer autoidentNoAplica = 0;
    @Column(name = "edad_15_19") private Integer edad1519 = 0;
    @Column(name = "edad_20_29") private Integer edad2029 = 0;
    @Column(name = "edad_30_39") private Integer edad3039 = 0;

    public EstadisticasEstudiantes() {}

    public Long getIdEstadistica() { return idEstadistica; }
    public void setIdEstadistica(Long id) { this.idEstadistica = id; }
    public Actividad getActividad() { return actividad; }
    public void setActividad(Actividad actividad) { this.actividad = actividad; }
    public Integer getTotalEstudiantes() { return totalEstudiantes; }
    public void setTotalEstudiantes(Integer v) { this.totalEstudiantes = v; }
    public Integer getEspectadores() { return espectadores; }
    public void setEspectadores(Integer v) { this.espectadores = v; }
    public Integer getParticipantes() { return participantes; }
    public void setParticipantes(Integer v) { this.participantes = v; }
    public Integer getSexoMujer() { return sexoMujer; }
    public void setSexoMujer(Integer v) { this.sexoMujer = v; }
    public Integer getSexoHombre() { return sexoHombre; }
    public void setSexoHombre(Integer v) { this.sexoHombre = v; }
    public Integer getGeneroFemenino() { return generoFemenino; }
    public void setGeneroFemenino(Integer v) { this.generoFemenino = v; }
    public Integer getGeneroMasculino() { return generoMasculino; }
    public void setGeneroMasculino(Integer v) { this.generoMasculino = v; }
    public Integer getGeneroNoBinario() { return generoNoBinario; }
    public void setGeneroNoBinario(Integer v) { this.generoNoBinario = v; }
    public Integer getAutoidentDiscapacidad() { return autoidentDiscapacidad; }
    public void setAutoidentDiscapacidad(Integer v) { this.autoidentDiscapacidad = v; }
    public Integer getAutoidentMigrante() { return autoidentMigrante; }
    public void setAutoidentMigrante(Integer v) { this.autoidentMigrante = v; }
    public Integer getAutoidentIndigena() { return autoidentIndigena; }
    public void setAutoidentIndigena(Integer v) { this.autoidentIndigena = v; }
    public Integer getAutoidentAfroamericano() { return autoidentAfroamericano; }
    public void setAutoidentAfroamericano(Integer v) { this.autoidentAfroamericano = v; }
    public Integer getAutoidentLgbtiq() { return autoidentLgbtiq; }
    public void setAutoidentLgbtiq(Integer v) { this.autoidentLgbtiq = v; }
    public Integer getAutoidentNoAplica() { return autoidentNoAplica; }
    public void setAutoidentNoAplica(Integer v) { this.autoidentNoAplica = v; }
    public Integer getEdad1519() { return edad1519; }
    public void setEdad1519(Integer v) { this.edad1519 = v; }
    public Integer getEdad2029() { return edad2029; }
    public void setEdad2029(Integer v) { this.edad2029 = v; }
    public Integer getEdad3039() { return edad3039; }
    public void setEdad3039(Integer v) { this.edad3039 = v; }
}
