-- ============================================================
--  SGAA — Sistema de Gestión de Actividades Académicas
--  schema.sql — Solo referencia. NO se ejecuta automaticamente.
--  spring.sql.init.mode=never en application.properties.
--  El schema lo gestiona Hibernate (ddl-auto=update).
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- CATÁLOGOS
CREATE TABLE IF NOT EXISTS AREA (
    id_area INT         NOT NULL AUTO_INCREMENT,
    nombre  VARCHAR(80) NOT NULL,
    PRIMARY KEY (id_area),
    UNIQUE KEY uq_area_nombre (nombre)
);

-- USUARIOS
CREATE TABLE IF NOT EXISTS ADMINISTRADOR (
    id_admin    INT          NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(100) NOT NULL,
    correo      VARCHAR(100) NOT NULL,
    foto_perfil VARCHAR(255)          DEFAULT NULL,
    PRIMARY KEY (id_admin),
    UNIQUE KEY uq_admin_correo (correo)
);

CREATE TABLE IF NOT EXISTS DOCENTE_PERSONAL (
    id_docente       INT          NOT NULL AUTO_INCREMENT,
    nombre           VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(80)  NOT NULL,
    apellido_materno VARCHAR(80)           DEFAULT NULL,
    correo           VARCHAR(100) NOT NULL,
    telefono         VARCHAR(20)           DEFAULT NULL,
    foto_perfil      VARCHAR(255)          DEFAULT NULL,
    id_area          INT          NOT NULL,
    puesto           VARCHAR(100)          DEFAULT NULL,
    fecha_ingreso    DATE                  DEFAULT NULL,
    activo           BOOLEAN               DEFAULT TRUE,
    PRIMARY KEY (id_docente),
    UNIQUE KEY uq_docente_correo (correo),
    CONSTRAINT fk_docente_area FOREIGN KEY (id_area) REFERENCES AREA (id_area)
);

CREATE TABLE IF NOT EXISTS USUARIOS_LOGIN (
    id_usuario     INT          NOT NULL AUTO_INCREMENT,
    correo         VARCHAR(100) NOT NULL,
    password       VARCHAR(255) NOT NULL,
    rol            ENUM('ADMIN','DOCENTE') NOT NULL,
    id_referencia  INT          NOT NULL,
    login_attempts INT                   DEFAULT 0,
    locked_until   DATETIME              DEFAULT NULL,
    activo         BOOLEAN               DEFAULT TRUE,
    created_at     TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario),
    UNIQUE KEY uq_login_correo (correo)
);

-- ACTIVIDADES
CREATE TABLE IF NOT EXISTS ACTIVIDAD (
    id_actividad             INT          NOT NULL AUTO_INCREMENT,
    folio                    VARCHAR(30)  NOT NULL,
    nombre                   VARCHAR(150) NOT NULL,
    objetivo                 TEXT         NOT NULL,
    id_area                  INT          NOT NULL,
    tipo                     ENUM('Comunidad','Cultura','Deporte','Salud','Campana','Capacitacion','Viaje Academico','Otra') NOT NULL,
    tipo_otro                VARCHAR(100)          DEFAULT NULL,
    fecha_inicio             DATE         NOT NULL,
    fecha_fin                DATE         NOT NULL,
    hora_inicio              TIME                  DEFAULT NULL,
    hora_fin                 TIME                  DEFAULT NULL,
    lugar                    VARCHAR(150) NOT NULL,
    municipio                VARCHAR(100) NOT NULL,
    estado                   VARCHAR(100) NOT NULL,
    invitados_especiales     TEXT                  DEFAULT NULL,
    institucion_organizadora VARCHAR(150)          DEFAULT NULL,
    medio_correo             BOOLEAN               DEFAULT FALSE,
    medio_redes              BOOLEAN               DEFAULT FALSE,
    medio_carteles           BOOLEAN               DEFAULT FALSE,
    medio_otro               VARCHAR(100)          DEFAULT NULL,
    resena                   TEXT         NOT NULL,
    impacto                  TEXT                  DEFAULT NULL,
    antecedentes             TEXT                  DEFAULT NULL,
    nombre_elabora           VARCHAR(150) NOT NULL,
    fecha_elaboracion        DATE         NOT NULL,
    estado_registro          ENUM('borrador','enviado','aprobado','rechazado') DEFAULT 'borrador',
    id_docente               INT          NOT NULL,
    PRIMARY KEY (id_actividad),
    UNIQUE KEY uq_actividad_folio (folio),
    CONSTRAINT fk_actividad_area    FOREIGN KEY (id_area)    REFERENCES AREA (id_area),
    CONSTRAINT fk_actividad_docente FOREIGN KEY (id_docente) REFERENCES DOCENTE_PERSONAL (id_docente)
);

CREATE TABLE IF NOT EXISTS RESPONSABLE_ACTIVIDAD (
    id_responsable INT          NOT NULL AUTO_INCREMENT,
    id_actividad   INT          NOT NULL,
    nombre         VARCHAR(150) NOT NULL,
    cargo          VARCHAR(100) NOT NULL,
    es_interno     BOOLEAN               DEFAULT TRUE,
    PRIMARY KEY (id_responsable),
    CONSTRAINT fk_responsable_actividad FOREIGN KEY (id_actividad) REFERENCES ACTIVIDAD (id_actividad)
);

-- ESTADÍSTICAS
CREATE TABLE IF NOT EXISTS ESTADISTICAS_ESTUDIANTES (
    id_estadistica          INT NOT NULL AUTO_INCREMENT,
    id_actividad            INT NOT NULL,
    total_estudiantes       INT          DEFAULT 0,
    espectadores            INT          DEFAULT 0,
    participantes           INT          DEFAULT 0,
    sexo_mujer              INT          DEFAULT 0,
    sexo_hombre             INT          DEFAULT 0,
    genero_femenino         INT          DEFAULT 0,
    genero_masculino        INT          DEFAULT 0,
    genero_no_binario       INT          DEFAULT 0,
    autoident_discapacidad  INT          DEFAULT 0,
    autoident_migrante      INT          DEFAULT 0,
    autoident_indigena      INT          DEFAULT 0,
    autoident_afroamericano INT          DEFAULT 0,
    autoident_lgbtiq        INT          DEFAULT 0,
    autoident_no_aplica     INT          DEFAULT 0,
    edad_15_19              INT          DEFAULT 0,
    edad_20_29              INT          DEFAULT 0,
    edad_30_39              INT          DEFAULT 0,
    PRIMARY KEY (id_estadistica),
    UNIQUE KEY uq_estadistica_actividad (id_actividad),
    CONSTRAINT fk_estud_actividad FOREIGN KEY (id_actividad) REFERENCES ACTIVIDAD (id_actividad)
);

CREATE TABLE IF NOT EXISTS ESTADISTICAS_DOCENTES_ACTIVIDAD (
    id_estadistica          INT NOT NULL AUTO_INCREMENT,
    id_actividad            INT NOT NULL,
    docentes_hombres        INT          DEFAULT 0,
    docentes_mujeres        INT          DEFAULT 0,
    administrativos_hombres INT          DEFAULT 0,
    administrativos_mujeres INT          DEFAULT 0,
    PRIMARY KEY (id_estadistica),
    UNIQUE KEY uq_estadistica_doc_actividad (id_actividad),
    CONSTRAINT fk_estdoc_actividad FOREIGN KEY (id_actividad) REFERENCES ACTIVIDAD (id_actividad)
);

CREATE TABLE IF NOT EXISTS PARTICIPACION_PROGRAMA (
    id_participacion INT         NOT NULL AUTO_INCREMENT,
    id_actividad     INT         NOT NULL,
    division         VARCHAR(10) NOT NULL,
    programa         VARCHAR(20) NOT NULL,
    cantidad         INT                  DEFAULT 0,
    PRIMARY KEY (id_participacion),
    CONSTRAINT fk_participacion_actividad FOREIGN KEY (id_actividad) REFERENCES ACTIVIDAD (id_actividad)
);

-- REPORTE PDD
CREATE TABLE IF NOT EXISTS REPORTE_PDD (
    id_reporte_pdd             INT          NOT NULL AUTO_INCREMENT,
    numero_actividad           INT          NOT NULL,
    folio_pdd                  VARCHAR(30)           DEFAULT NULL,
    nombre_curso               VARCHAR(200) NOT NULL,
    objetivo                   TEXT         NOT NULL,
    facilitador                VARCHAR(150) NOT NULL,
    datos_contacto_facilitador VARCHAR(255)          DEFAULT NULL,
    fecha_inicio               DATE         NOT NULL,
    fecha_fin                  DATE         NOT NULL,
    horas_duracion             INT                   DEFAULT NULL,
    docentes_hombres           INT                   DEFAULT 0,
    docentes_mujeres           INT                   DEFAULT 0,
    notas                      TEXT                  DEFAULT NULL,
    estado_registro            ENUM('borrador','enviado','aprobado','rechazado') DEFAULT 'borrador',
    id_docente_registra        INT          NOT NULL,
    fecha_elaboracion          DATE         NOT NULL,
    PRIMARY KEY (id_reporte_pdd),
    CONSTRAINT fk_pdd_docente FOREIGN KEY (id_docente_registra) REFERENCES DOCENTE_PERSONAL (id_docente)
);

CREATE TABLE IF NOT EXISTS PARTICIPANTE_PDD (
    id_participante INT          NOT NULL AUTO_INCREMENT,
    id_reporte_pdd  INT          NOT NULL,
    id_docente      INT                   DEFAULT NULL,
    nombre_externo  VARCHAR(150)          DEFAULT NULL,
    tipo            ENUM('capacitado','certificado') NOT NULL,
    PRIMARY KEY (id_participante),
    CONSTRAINT fk_participante_pdd     FOREIGN KEY (id_reporte_pdd) REFERENCES REPORTE_PDD (id_reporte_pdd),
    CONSTRAINT fk_participante_docente FOREIGN KEY (id_docente)     REFERENCES DOCENTE_PERSONAL (id_docente)
);

-- ARCHIVOS Y AUDITORÍA
CREATE TABLE IF NOT EXISTS ARCHIVO (
    id_archivo         INT           NOT NULL AUTO_INCREMENT,
    nombre_original    VARCHAR(150)  NOT NULL,
    nombre_storage     VARCHAR(255)  NOT NULL,
    tipo               ENUM('evidencia_foto','certificado','constancia','reporte_pdf','reporte_excel') NOT NULL,
    mime_type          VARCHAR(50)   NOT NULL,
    tamano_kb          DECIMAL(10,2) NOT NULL,
    ruta               VARCHAR(255)  NOT NULL,
    id_actividad       INT                    DEFAULT NULL,
    id_reporte_pdd     INT                    DEFAULT NULL,
    subido_por_docente INT                    DEFAULT NULL,
    subido_por_admin   INT                    DEFAULT NULL,
    fecha_subida       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_archivo),
    CONSTRAINT fk_archivo_actividad   FOREIGN KEY (id_actividad)       REFERENCES ACTIVIDAD (id_actividad),
    CONSTRAINT fk_archivo_pdd         FOREIGN KEY (id_reporte_pdd)     REFERENCES REPORTE_PDD (id_reporte_pdd),
    CONSTRAINT fk_archivo_docente     FOREIGN KEY (subido_por_docente) REFERENCES DOCENTE_PERSONAL (id_docente),
    CONSTRAINT fk_archivo_admin       FOREIGN KEY (subido_por_admin)   REFERENCES ADMINISTRADOR (id_admin)
);

CREATE TABLE IF NOT EXISTS AUDITORIA (
    id_auditoria INT          NOT NULL AUTO_INCREMENT,
    accion       VARCHAR(150) NOT NULL,
    fecha        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    detalle      TEXT                  DEFAULT NULL,
    id_docente   INT                   DEFAULT NULL,
    id_admin     INT                   DEFAULT NULL,
    PRIMARY KEY (id_auditoria),
    CONSTRAINT fk_auditoria_docente FOREIGN KEY (id_docente) REFERENCES DOCENTE_PERSONAL (id_docente),
    CONSTRAINT fk_auditoria_admin   FOREIGN KEY (id_admin)   REFERENCES ADMINISTRADOR (id_admin)
);

SET FOREIGN_KEY_CHECKS = 1;

