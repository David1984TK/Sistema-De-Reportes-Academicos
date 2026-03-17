# 📋 Guía de Configuración: SRAA Backend + Railway + Base de Datos

## 🔴 Problema Identificado
- Error 401 al intentar autenticar usuarios creados en la BD
- **Causa Raíz**: Las tablas no existen en la BD (ddl-auto=none deshabilitaba creación automática)

## ✅ Soluciones Implementadas

### 1. **Script SQL de Inicialización**
Se creó `/src/main/resources/schema.sql` con las tablas necesarias:
- `ADMINISTRADOR`
- `DOCENTE_PERSONAL`
- `USUARIOS_LOGIN`
- `SESION`

### 2. **Configuración de application.properties**
- Cambié `ddl-auto` a `${DDL_AUTO:update}` (update en local, none en Railway)
- Habilitada ejecución automática de `schema.sql` con `spring.sql.init.mode=always`

### 3. **Variables de Entorno Necesarias**

En **Railway**, configura estas variables en Settings → Variables:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://mysql.railway.internal:3306/SRAA_BD
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=TU_CONTRASEÑA_SEGURA
JWT_SECRET=tu-clave-jwt-minimo-32-caracteres-muy-segura!
DDL_AUTO=validate
```

---

## 🚀 Pasos para Deployar en Railway

### **Paso 1: Agregar MySQL en Railway**
1. En tu proyecto Railway, agrega un nuevo servicio
2. Selecciona **MySQL**
3. Espera a que se inicialice
4. Copia las credenciales que Railway proporciona

### **Paso 2: Configurar Variables en Railway**
1. Ve a tu servicio Backend
2. Settings → Variables
3. Agrega/actualiza:
   ```
   SPRING_DATASOURCE_URL=jdbc:mysql://mysql.railway.internal:3306/SRAA_BD
   SPRING_DATASOURCE_USERNAME=root
   SPRING_DATASOURCE_PASSWORD=[Tu contraseña de MySQL]
   JWT_SECRET=[Genera una clave segura, mínimo 32 caracteres]
   DDL_AUTO=validate
   PORT=8080
   ```

### **Paso 3: Deploy del Backend**
```bash
cd /Users/dav/Desktop/Sistema-De-Reportes-Academicos/SRAA/Back

# Construir la aplicación
./mvnw clean package -DskipTests

# Railway automáticamente deployará cuando hagas git push
git add .
git commit -m "fix: Configure BD with schema.sql and environment variables"
git push
```

### **Paso 4: Verificar Logs en Railway**
1. Ve a tu servicio Backend en Railway
2. Abre la pestaña **Deployments**
3. Haz clic en el deployment activo
4. Ve a **Logs** para verificar que el schema.sql se ejecutó

---

## 🔐 Generar JWT_SECRET Seguro

### En macOS/Linux:
```bash
openssl rand -base64 32
```

### En Python:
```python
import secrets
print(secrets.token_urlsafe(32))
```

**Guarda este valor en Railway como `JWT_SECRET`**

---

## 📝 Crear Usuarios en la BD

Los usuarios se crean automáticamente al iniciar el backend (DataInitializer.java):

- **Admin**: `admin@utez.edu.mx` / `123456`
- **Docente 1**: `docentev@utez.edu.mx` / `123456`
- **Docente 2**: `docentez@utez.edu.mx` / `123456`

Para crear usuarios adicionales, necesitarás un endpoint `/admin/usuarios/crear` (pendiente de implementar).

---

## 🔗 Frontend - Variables de Entorno

En tu carpeta **Front**, asegúrate de que `.env` tenga:

```env
VITE_API_URL=https://sistema-de-reportes-academicos-production-78ae.up.railway.app
```

---

## 🐛 Troubleshooting

### Error: "Credenciales incorrectas" (401)
**Solución**: Verifica que:
1. La tabla `USUARIOS_LOGIN` existe en la BD
2. El usuario está creado (revisa el log del backend)
3. La contraseña coincide con lo en la BD (hasheada con BCrypt)

### Error: "Connection refused"
**Solución**: 
1. Verifica que Railway MySQL está ejecutándose
2. Confirma las credenciales en SPRING_DATASOURCE_URL
3. Revisa que el backend tiene acceso a la red interna de Railway

### El schema.sql no se ejecuta
**Solución**:
1. Asegúrate que `DDL_AUTO=validate` en Railway (no `none`)
2. Verifica que `spring.sql.init.mode=always` en application.properties

---

## 📊 Validar Conexión a BD

### Desde Railway Console:
```bash
mysql -h mysql.railway.internal -u root -p
USE SRAA_BD;
SHOW TABLES;
SELECT * FROM USUARIOS_LOGIN;
```

---

## ✨ Siguientes Pasos

1. ✅ Configurar MySQL en Railway
2. ✅ Deployar Backend con schema.sql
3. 🔄 Implementar endpoints para operaciones CRUD de usuarios
4. 🔄 Crear endpoint para cambio de contraseña
5. 🔄 Integrar frontend con todos los endpoints del backend


