package utez.edu.mx.back.utils;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import utez.edu.mx.back.modules.admin.Administrador;
import utez.edu.mx.back.modules.admin.AdministradorRepository;
import utez.edu.mx.back.modules.docente.DocentePersonal;
import utez.edu.mx.back.modules.docente.DocenteRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    private final AdministradorRepository administradorRepository;
    private final DocenteRepository docenteRepository;
    private final PasswordEncoder passwordEncoder;
    public DataInitializer(AdministradorRepository administradorRepository,
                           DocenteRepository docenteRepository,
                           PasswordEncoder passwordEncoder) {
        this.administradorRepository = administradorRepository;
        this.docenteRepository = docenteRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public void run(String... args) throws Exception {
        System.out.println("==========================================");
        System.out.println("INICIALIZANDO DATOS DE PRUEBA...");
        System.out.println("==========================================");
        // Crear ADMIN si no existe
        if (!administradorRepository.existsByCorreo("admin@utez.edu.mx")) {
            Administrador admin = new Administrador(
                    "Administrador General",
                    "admin@utez.edu.mx",
                    passwordEncoder.encode("123456")
            );
            administradorRepository.save(admin);
            System.out.println("✅ ADMIN creado: admin@utez.edu.mx / 123456");
        }
        // Crear DOCENTES si no existen
        if (!docenteRepository.existsByCorreo("cramirez@utez.edu.mx")) {
            DocentePersonal docente1 = new DocentePersonal();
            docente1.setNombre("Carlos Ramírez");
            docente1.setCorreo("cramirez@utez.edu.mx");
            docente1.setPassword(passwordEncoder.encode("123456"));
            docente1.setIdArea(1L);
            docente1.setActivo(true);
            docenteRepository.save(docente1);
            System.out.println("DOCENTE creado: cramirez@utez.edu.mx / 123456");
        }
        if (!docenteRepository.existsByCorreo("lgonzalez@utez.edu.mx")) {
            DocentePersonal docente2 = new DocentePersonal();
            docente2.setNombre("Laura González");
            docente2.setCorreo("lgonzalez@utez.edu.mx");
            docente2.setPassword(passwordEncoder.encode("123456"));
            docente2.setIdArea(2L);
            docente2.setActivo(true);
            docenteRepository.save(docente2);
            System.out.println("DOCENTE creado: lgonzalez@utez.edu.mx / 123456");
        }
        System.out.println("==========================================");
        System.out.println("DATOS INICIALIZADOS CORRECTAMENTE");
        System.out.println("==========================================");
        System.out.println("ADMIN: admin@utez.edu.mx / 123456");
        System.out.println("DOCENTE 1: cramirez@utez.edu.mx / 123456");
        System.out.println("DOCENTE 2: lgonzalez@utez.edu.mx / 123456");
        System.out.println("==========================================");
    }
}