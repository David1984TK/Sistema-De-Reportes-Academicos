package utez.edu.mx.back.modules.actividad.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class ActividadRequestDTO {

    @NotBlank(message = "El folio es obligatorio")
    private String folio;
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    @NotBlank(message = "El objetivo es obligatorio")
    private String objetivo;
    @NotNull(message = "El area es obligatoria")
    private Long idArea;
    @NotBlank(message = "El tipo es obligatorio")
    private String tipo;
    private String tipoOtro;
    @NotBlank(message = "La fecha de inicio es obligatoria")
    private String fechaInicio;
    @NotBlank(message = "La fecha de fin es obligatoria")
    private String fechaFin;
    private String horaInicio;
    private String horaFin;
    @NotBlank(message = "El lugar es obligatorio")
    private String lugar;
    private String municipio;
    private String estado;
    private String invitadosEspeciales;
    private String institucionOrganizadora;
    private Boolean medioCorreo;
    private Boolean medioRedes;
    private Boolean medioCarteles;
    private String medioOtro;
    @NotBlank(message = "La resena es obligatoria")
    private String resena;
    private String impacto;
    private String antecedentes;
    @NotBlank(message = "El nombre de quien elabora es obligatorio")
    private String nombreElabora;
    @NotBlank(message = "La fecha de elaboracion es obligatoria")
    private String fechaElaboracion;

    // Datos anidados
    private List<ResponsableDTO> responsables;
    private EstadisticasEstudiantesDTO estadisticasEstudiantes;
    private EstadisticasDocentesDTO estadisticasDocentes;
    private List<ParticipacionDTO> participaciones;

    // --- Clases internas para datos anidados ---
    public static class ResponsableDTO {
        private String nombre;
        private String cargo;
        private Boolean esInterno = true;
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getCargo() { return cargo; }
        public void setCargo(String cargo) { this.cargo = cargo; }
        public Boolean getEsInterno() { return esInterno; }
        public void setEsInterno(Boolean esInterno) { this.esInterno = esInterno; }
    }

    public static class EstadisticasEstudiantesDTO {
        private Integer totalEstudiantes = 0;
        private Integer espectadores = 0;
        private Integer participantes = 0;
        private Integer sexoMujer = 0;
        private Integer sexoHombre = 0;
        private Integer generoFemenino = 0;
        private Integer generoMasculino = 0;
        private Integer generoNoBinario = 0;
        private Integer autoidentDiscapacidad = 0;
        private Integer autoidentMigrante = 0;
        private Integer autoidentIndigena = 0;
        private Integer autoidentAfroamericano = 0;
        private Integer autoidentLgbtiq = 0;
        private Integer autoidentNoAplica = 0;
        private Integer edad1519 = 0;
        private Integer edad2029 = 0;
        private Integer edad3039 = 0;
        // getters y setters
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

    public static class EstadisticasDocentesDTO {
        private Integer docentesHombres = 0;
        private Integer docentesMujeres = 0;
        private Integer administrativosHombres = 0;
        private Integer administrativosMujeres = 0;
        public Integer getDocentesHombres() { return docentesHombres; }
        public void setDocentesHombres(Integer v) { this.docentesHombres = v; }
        public Integer getDocentesMujeres() { return docentesMujeres; }
        public void setDocentesMujeres(Integer v) { this.docentesMujeres = v; }
        public Integer getAdministrativosHombres() { return administrativosHombres; }
        public void setAdministrativosHombres(Integer v) { this.administrativosHombres = v; }
        public Integer getAdministrativosMujeres() { return administrativosMujeres; }
        public void setAdministrativosMujeres(Integer v) { this.administrativosMujeres = v; }
    }

    public static class ParticipacionDTO {
        private String division;
        private String programa;
        private Integer cantidad = 0;
        public String getDivision() { return division; }
        public void setDivision(String division) { this.division = division; }
        public String getPrograma() { return programa; }
        public void setPrograma(String programa) { this.programa = programa; }
        public Integer getCantidad() { return cantidad; }
        public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    }

    // --- Getters y setters principales ---
    public String getFolio() { return folio; }
    public void setFolio(String folio) { this.folio = folio; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getObjetivo() { return objetivo; }
    public void setObjetivo(String objetivo) { this.objetivo = objetivo; }
    public Long getIdArea() { return idArea; }
    public void setIdArea(Long idArea) { this.idArea = idArea; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getTipoOtro() { return tipoOtro; }
    public void setTipoOtro(String tipoOtro) { this.tipoOtro = tipoOtro; }
    public String getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(String fechaInicio) { this.fechaInicio = fechaInicio; }
    public String getFechaFin() { return fechaFin; }
    public void setFechaFin(String fechaFin) { this.fechaFin = fechaFin; }
    public String getHoraInicio() { return horaInicio; }
    public void setHoraInicio(String horaInicio) { this.horaInicio = horaInicio; }
    public String getHoraFin() { return horaFin; }
    public void setHoraFin(String horaFin) { this.horaFin = horaFin; }
    public String getLugar() { return lugar; }
    public void setLugar(String lugar) { this.lugar = lugar; }
    public String getMunicipio() { return municipio; }
    public void setMunicipio(String municipio) { this.municipio = municipio; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getInvitadosEspeciales() { return invitadosEspeciales; }
    public void setInvitadosEspeciales(String v) { this.invitadosEspeciales = v; }
    public String getInstitucionOrganizadora() { return institucionOrganizadora; }
    public void setInstitucionOrganizadora(String v) { this.institucionOrganizadora = v; }
    public Boolean getMedioCorreo() { return medioCorreo; }
    public void setMedioCorreo(Boolean v) { this.medioCorreo = v; }
    public Boolean getMedioRedes() { return medioRedes; }
    public void setMedioRedes(Boolean v) { this.medioRedes = v; }
    public Boolean getMedioCarteles() { return medioCarteles; }
    public void setMedioCarteles(Boolean v) { this.medioCarteles = v; }
    public String getMedioOtro() { return medioOtro; }
    public void setMedioOtro(String v) { this.medioOtro = v; }
    public String getResena() { return resena; }
    public void setResena(String resena) { this.resena = resena; }
    public String getImpacto() { return impacto; }
    public void setImpacto(String v) { this.impacto = v; }
    public String getAntecedentes() { return antecedentes; }
    public void setAntecedentes(String v) { this.antecedentes = v; }
    public String getNombreElabora() { return nombreElabora; }
    public void setNombreElabora(String v) { this.nombreElabora = v; }
    public String getFechaElaboracion() { return fechaElaboracion; }
    public void setFechaElaboracion(String v) { this.fechaElaboracion = v; }
    public List<ResponsableDTO> getResponsables() { return responsables; }
    public void setResponsables(List<ResponsableDTO> v) { this.responsables = v; }
    public EstadisticasEstudiantesDTO getEstadisticasEstudiantes() { return estadisticasEstudiantes; }
    public void setEstadisticasEstudiantes(EstadisticasEstudiantesDTO v) { this.estadisticasEstudiantes = v; }
    public EstadisticasDocentesDTO getEstadisticasDocentes() { return estadisticasDocentes; }
    public void setEstadisticasDocentes(EstadisticasDocentesDTO v) { this.estadisticasDocentes = v; }
    public List<ParticipacionDTO> getParticipaciones() { return participaciones; }
    public void setParticipaciones(List<ParticipacionDTO> v) { this.participaciones = v; }
}
