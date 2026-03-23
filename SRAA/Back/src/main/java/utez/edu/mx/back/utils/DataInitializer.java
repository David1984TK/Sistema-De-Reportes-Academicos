package utez.edu.mx.back.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import utez.edu.mx.back.modules.admin.Administrador;
import utez.edu.mx.back.modules.admin.AdministradorRepository;
import utez.edu.mx.back.modules.docente.DocentePersonal;
import utez.edu.mx.back.modules.docente.DocenteRepository;
import utez.edu.mx.back.modules.usuarios.UsuariosLogin;
import utez.edu.mx.back.modules.usuarios.UsuariosRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final AdministradorRepository administradorRepository;
    private final DocenteRepository docenteRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuariosRepository usuariosRepository;
    private final JdbcTemplate jdbcTemplate;

    public DataInitializer(AdministradorRepository administradorRepository,
                           DocenteRepository docenteRepository,
                           PasswordEncoder passwordEncoder,
                           UsuariosRepository usuariosRepository,
                           JdbcTemplate jdbcTemplate) {
        this.administradorRepository = administradorRepository;
        this.docenteRepository = docenteRepository;
        this.passwordEncoder = passwordEncoder;
        this.usuariosRepository = usuariosRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        try {
            inicializarAreas();
            inicializarAdmin();
            inicializarDocentesPrueba();
            log.info("DataInitializer completado correctamente.");
        } catch (Exception e) {
            log.error("Error en DataInitializer: {}", e.getMessage(), e);
        }
    }

    private void inicializarAreas() {
        jdbcTemplate.execute("""
            CREATE TABLE IF NOT EXISTS AREA (
                id_area INT NOT NULL AUTO_INCREMENT,
                nombre  VARCHAR(80) NOT NULL,
                PRIMARY KEY (id_area),
                UNIQUE KEY uq_area_nombre (nombre)
            )
        """);

        insertAreaIfNotExists("DACEA");
        insertAreaIfNotExists("DAMI");
        insertAreaIfNotExists("DATEFI");
        insertAreaIfNotExists("DATID");
    }

    private void inicializarAdmin() {
        if (administradorRepository.existsByCorreo("admin@utez.edu.mx")) {
            log.info("Admin ya existe, se omite creacion.");
            return;
        }

        Administrador admin = new Administrador("Administrador General", "admin@utez.edu.mx");
        Administrador savedAdmin = administradorRepository.save(admin);

        UsuariosLogin userAdmin = new UsuariosLogin();
        userAdmin.setCorreo("admin@utez.edu.mx");
        userAdmin.setPassword(passwordEncoder.encode("Admin123!"));
        userAdmin.setRol(UsuariosLogin.Rol.ADMIN);
        userAdmin.setIdReferencia(savedAdmin.getIdAdmin());
        userAdmin.setActivo(true);
        usuariosRepository.save(userAdmin);

        log.info("Admin creado: admin@utez.edu.mx");
    }

    private void inicializarDocentesPrueba() {
        crearDocenteIfNotExists(
            "Carlos", "Mendoza", "Rios",
            "cmendoza@utez.edu.mx", "Docente Investigador", 1L
        );

        crearDocenteIfNotExists(
            "Laura", "Gutierrez", "Vega",
            "lgutierrez@utez.edu.mx", "Docente de Tiempo Completo", 2L
        );
    }

    private void crearDocenteIfNotExists(String nombre, String apellidoP, String apellidoM,
                                          String correo, String puesto, Long idArea) {
        if (docenteRepository.existsByCorreo(correo)) {
            log.info("Docente {} ya existe, se omite creacion.", correo);
            return;
        }

        DocentePersonal docente = new DocentePersonal();
        docente.setNombre(nombre);
        docente.setApellidoPaterno(apellidoP);
        docente.setApellidoMaterno(apellidoM);
        docente.setCorreo(correo);
        docente.setPuesto(puesto);
        docente.setIdArea(idArea);
        docente.setActivo(true);
        DocentePersonal saved = docenteRepository.save(docente);

        UsuariosLogin userDocente = new UsuariosLogin();
        userDocente.setCorreo(correo);
        userDocente.setPassword(passwordEncoder.encode("Docente123!"));
        userDocente.setRol(UsuariosLogin.Rol.DOCENTE);
        userDocente.setIdReferencia(saved.getIdDocente());
        userDocente.setActivo(true);
        usuariosRepository.save(userDocente);

        log.info("Docente creado: {}", correo);
    }

    private void insertAreaIfNotExists(String nombre) {
        Integer count = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM AREA WHERE nombre = ?", Integer.class, nombre
        );
        if (count == null || count == 0) {
            jdbcTemplate.update("INSERT INTO AREA (nombre) VALUES (?)", nombre);
            log.info("Area insertada: {}", nombre);
        }
    }
}
