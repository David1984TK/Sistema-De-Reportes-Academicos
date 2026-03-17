# 🎯 RESUMEN DE CAMBIOS REALIZADOS

## 🔧 Archivos Creados

### 1. `/src/main/resources/schema.sql`
**Propósito**: Definir la estructura de la base de datos
- Crea tabla `ADMINISTRADOR`
- Crea tabla `DOCENTE_PERSONAL`
- Crea tabla `USUARIOS_LOGIN` (crítico para autenticación)
- Crea tabla `SESION`

### 2. `.env.example`
**Propósito**: Documentar variables de entorno necesarias
- Variables para Railway MySQL
- Configuración JWT
- Parámetros de Hibernate

---

## ✏️ Archivos Modificados

### `application.properties`
```diff
- spring.jpa.hibernate.ddl-auto=none
+ spring.jpa.hibernate.ddl-auto=${DDL_AUTO:update}
+ spring.sql.init.mode=always
+ spring.sql.init.platform=mysql
```

**Impacto**: Ahora el backend crea/actualiza tablas automáticamente al iniciar

---

## 🚀 Cómo Proceder

### Opción A: Desarrollo Local (H2 o MySQL local)
```bash
cd /Users/dav/Desktop/Sistema-De-Reportes-Academicos/SRAA/Back

# Compilar
./mvnw clean package

# Ejecutar (con DDL_AUTO=update, creará tablas)
./mvnw spring-boot:run -Dspring-boot.run.arguments="--DDL_AUTO=update"
```

### Opción B: Deploy en Railway
1. Configura MySQL en Railway
2. Agrega variables de entorno en Railway:
   ```
   DDL_AUTO=validate
   SPRING_DATASOURCE_URL=jdbc:mysql://mysql.railway.internal:3306/SRAA_BD
   SPRING_DATASOURCE_USERNAME=root
   SPRING_DATASOURCE_PASSWORD=***
   JWT_SECRET=***
   ```
3. Haz git push

```bash
git add .
git commit -m "feat: Add database schema and environment configuration"
git push
```

---

## 🔐 Credenciales de Prueba (Se Crean Automáticamente)

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@utez.edu.mx | 123456 | Administrador |
| docentev@utez.edu.mx | 123456 | Docente |
| docentez@utez.edu.mx | 123456 | Docente |

---

## ✅ Validación

```bash
# 1. Verificar compilación
./mvnw clean compile

# 2. Ver si schema.sql se incluye en el JAR
jar -tf target/back-1.0.0.jar | grep schema.sql

# 3. Ejecutar tests (cuando los tengas)
./mvnw test
```

---

## 📝 Próximos Pasos

1. **Railway Setup**:
   - Agregar servicio MySQL
   - Configurar variables de entorno
   - Deployar backend

2. **Testing del Login**:
   - Usar Postman/Insomnia para probar `/auth/login`
   - Verificar que retorna token JWT
   - Probar con credenciales válidas e inválidas

3. **Frontend Integration**:
   - El `Login.jsx` ya está actualizado ✅
   - Solo falta que el backend esté en Railway

---

## 🔍 Diagnóstico de Errores 401

Si aún recibes **401** después de estos cambios:

1. **Verifica BD**:
   ```
   Railway → MySQL Console
   SELECT * FROM USUARIOS_LOGIN;
   ```

2. **Revisa logs del backend**:
   ```
   Railway → Backend → Deployments → Logs
   ```

3. **Prueba endpoint**:
   ```bash
   curl -X POST https://tu-railway-url/sraa-api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"correo":"admin@utez.edu.mx","password":"123456"}'
   ```


