package utez.edu.mx.back.utils;

import org.springframework.boot.CommandLineRunner;
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

    public DataInitializer(AdministradorRepository administradorRepository,
                           DocenteRepository docenteRepository,
                           PasswordEncoder passwordEncoder,
                           UsuariosRepository usuariosRepository) {
        this.administradorRepository = administradorRepository;
        this.docenteRepository = docenteRepository;
        this.passwordEncoder = passwordEncoder;
        this.usuariosRepository = usuariosRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Crear ADMIN si no existe
        if (!administradorRepository.existsByCorreo("admin@utez.edu.mx")) {
            Administrador admin = new Administrador(
                    "Administrador General",
                    "admin@utez.edu.mx",
                    passwordEncoder.encode("123456")
            );
            Administrador savedAdmin = administradorRepository.save(admin);

            UsuariosLogin userAdmin = new UsuariosLogin();
            userAdmin.setCorreo("admin@utez.edu.mx");
            userAdmin.setPassword(passwordEncoder.encode("123456"));
            userAdmin.setRol(UsuariosLogin.Rol.ADMIN);
            userAdmin.setIdReferencia(savedAdmin.getId());
            userAdmin.setActivo(true);
            usuariosRepository.save(userAdmin);
        }

        // Crear DOCENTE 1 si no existe
        if (!docenteRepository.existsByCorreo("docentev@utez.edu.mx")) {
            DocentePersonal docente1 = new DocentePersonal();
            docente1.setNombre("Docente v1");
            docente1.setCorreo("docentev@utez.edu.mx");
            docente1.setPassword(passwordEncoder.encode("123456"));
            docente1.setIdArea(1L);
            docente1.setActivo(true);
            DocentePersonal savedDocente1 = docenteRepository.save(docente1);

            UsuariosLogin userDocente1 = new UsuariosLogin();
            userDocente1.setCorreo("docentev@utez.edu.mx");
            userDocente1.setPassword(passwordEncoder.encode("123456"));
            userDocente1.setRol(UsuariosLogin.Rol.DOCENTE);
            userDocente1.setIdReferencia(savedDocente1.getId());
            userDocente1.setActivo(true);
            usuariosRepository.save(userDocente1);
        }

        // Crear DOCENTE 2 si no existe
        if (!docenteRepository.existsByCorreo("docentez@utez.edu.mx")) {
            DocentePersonal docente2 = new DocentePersonal();
            docente2.setNombre("Docente z");
            docente2.setCorreo("docentez@utez.edu.mx");
            docente2.setPassword(passwordEncoder.encode("123456"));
            docente2.setIdArea(2L);
            docente2.setActivo(true);
            DocentePersonal savedDocente2 = docenteRepository.save(docente2);

            UsuariosLogin userDocente2 = new UsuariosLogin();
            userDocente2.setCorreo("docentez@utez.edu.mx");
            userDocente2.setPassword(passwordEncoder.encode("123456"));
            userDocente2.setRol(UsuariosLogin.Rol.DOCENTE);
            userDocente2.setIdReferencia(savedDocente2.getId());
            userDocente2.setActivo(true);
            usuariosRepository.save(userDocente2);
        }
    }
}