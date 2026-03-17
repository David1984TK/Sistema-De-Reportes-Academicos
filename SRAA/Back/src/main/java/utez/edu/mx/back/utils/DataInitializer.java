package utez.edu.mx.back.utils;

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
    public void run(String... args) throws Exception {

        // 0. Crear tabla AREA si no existe (no tiene entidad JPA)
        jdbcTemplate.execute("""
            CREATE TABLE IF NOT EXISTS AREA (
                id_area INT NOT NULL AUTO_INCREMENT,
                nombre  VARCHAR(80) NOT NULL,
                PRIMARY KEY (id_area),
                UNIQUE KEY uq_area_nombre (nombre)
            )
        """);

        // 1. Crear áreas si no existen
        insertAreaIfNotExists("DACEA");
        insertAreaIfNotExists("DAMI");
        insertAreaIfNotExists("DATEFI");
        insertAreaIfNotExists("DATID");

        // 2. Crear ADMIN si no existe
        if (!administradorRepository.existsByCorreo("admin@utez.edu.mx")) {
            Administrador admin = new Administrador("Administrador General", "admin@utez.edu.mx");
            Administrador savedAdmin = administradorRepository.save(admin);

            UsuariosLogin userAdmin = new UsuariosLogin();
            userAdmin.setCorreo("admin@utez.edu.mx");
            userAdmin.setPassword(passwordEncoder.encode("Admin123!"));
            userAdmin.setRol(UsuariosLogin.Rol.ADMIN);
            userAdmin.setIdReferencia(savedAdmin.getIdAdmin());
            userAdmin.setActivo(true);
            usuariosRepository.save(userAdmin);
        }

        // 3. Crear DOCENTE 1 si no existe
        if (!docenteRepository.existsByCorreo("docentev@utez.edu.mx")) {
            DocentePersonal docente1 = new DocentePersonal();
            docente1.setNombre("Docente");
            docente1.setApellidoPaterno("V1");
            docente1.setCorreo("docentev@utez.edu.mx");
            docente1.setIdArea(1L);
            docente1.setActivo(true);
            DocentePersonal savedDocente1 = docenteRepository.save(docente1);

            UsuariosLogin userDocente1 = new UsuariosLogin();
            userDocente1.setCorreo("docentev@utez.edu.mx");
            userDocente1.setPassword(passwordEncoder.encode("Docente123!"));
            userDocente1.setRol(UsuariosLogin.Rol.DOCENTE);
            userDocente1.setIdReferencia(savedDocente1.getIdDocente());
            userDocente1.setActivo(true);
            usuariosRepository.save(userDocente1);
        }

        // 4. Crear DOCENTE 2 si no existe
        if (!docenteRepository.existsByCorreo("docentez@utez.edu.mx")) {
            DocentePersonal docente2 = new DocentePersonal();
            docente2.setNombre("Docente");
            docente2.setApellidoPaterno("Z");
            docente2.setCorreo("docentez@utez.edu.mx");
            docente2.setIdArea(2L);
            docente2.setActivo(true);
            DocentePersonal savedDocente2 = docenteRepository.save(docente2);

            UsuariosLogin userDocente2 = new UsuariosLogin();
            userDocente2.setCorreo("docentez@utez.edu.mx");
            userDocente2.setPassword(passwordEncoder.encode("Docente123!"));
            userDocente2.setRol(UsuariosLogin.Rol.DOCENTE);
            userDocente2.setIdReferencia(savedDocente2.getIdDocente());
            userDocente2.setActivo(true);
            usuariosRepository.save(userDocente2);
        }
    }

    private void insertAreaIfNotExists(String nombre) {
        Integer count = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM AREA WHERE nombre = ?", Integer.class, nombre
        );
        if (count == null || count == 0) {
            jdbcTemplate.update("INSERT INTO AREA (nombre) VALUES (?)", nombre);
        }
    }
}