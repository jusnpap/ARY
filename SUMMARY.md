# 🍓 Strawberry Makeup - Sistema de Autenticación

## ✨ ¿Qué se ha creado?

He implementado un **sistema profesional y seguro de autenticación y gestión de usuarios** para tu aplicación de e-commerce.

---

## 📦 Componentes Creados

### Backend (Node.js + Express)

**Archivo:** `backend/server.js`

**Características:**
- ✅ Servidor Express en puerto 8000
- ✅ Base de datos SQLite con tabla de usuarios
- ✅ Contraseñas encriptadas con bcryptjs
- ✅ JWT para sesiones seguras
- ✅ 6 endpoints de autenticación
- ✅ Validación de datos
- ✅ Manejo de errores completo

**Endpoints:**
```
POST   /api/auth/register          - Crear nueva cuenta
POST   /api/auth/login             - Iniciar sesión
GET    /api/auth/profile/:id       - Obtener perfil del usuario
PUT    /api/auth/profile/:id       - Actualizar perfil
POST   /api/auth/verify            - Verificar token
POST   /admin/validate             - Login admin (mantiene compatibilidad)
```

### Frontend (React)

**1. Componente Admin.jsx ACTUALIZADO**
- 🔄 Ahora tiene toggle entre Login y Registro
- 📝 Formularios con validación completa
- 🎨 Mismo estilo visual que tu proyecto
- 🔐 Integración con JWT
- 📱 Responsive design

**2. Componente UserProfile.jsx NUEVO**
- 👤 Ver perfil del usuario
- ✏️ Editar información personal
- 📝 Campos: nombre, email, teléfono, dirección, ciudad, país, código postal
- 🔐 Requiere autenticación
- 🎨 Diseño consistente con bootstrap 5

### Base de Datos

**Tabla: usuarios**
```
- id (integer, primary key)
- nombre (texto)
- email (texto, único)
- contraseña (encriptada)
- telefono (opcional)
- direccion (opcional)
- ciudad (opcional)
- pais (opcional)
- codigo_postal (opcional)
- es_admin (booleano)
- activo (booleano)
- fecha_registro (timestamp)
- ultimo_acceso (timestamp)
```

---

## 🚀 Guías Incluidas

### 1. SETUP_GUIDE.md
Paso a paso para:
- ✅ Instalar dependencias
- ✅ Inicializar la base de datos
- ✅ Iniciar frontend y backend
- ✅ Probar registro/login
- ✅ Credenciales de prueba
- ✅ Solución de problemas

### 2. INTEGRATION_GUIDE.md
Cómo integrar en tu proyecto:
- ✅ Agregar rutas
- ✅ Proteger rutas con autenticación
- ✅ Mostrar usuario en Header
- ✅ Crear modales
- ✅ Verificar sesiones

### 3. backend/README.md
Documentación técnica:
- ✅ Estructura de API
- ✅ Ejemplos de requests
- ✅ Seguridad
- ✅ Mejoras sugeridas

---

## 🔐 Seguridad Implementada

✅ **Contraseñas encriptadas** - bcryptjs con 10 salt rounds
✅ **JWT tokens** - Sesiones sin estado en el servidor
✅ **CORS habilitado** - Comunica frontend ↔ backend
✅ **Validación de datos** - Todos los inputs validados
✅ **Email único** - No permite duplicados
✅ **Tokens con expiración** - 7 días (30 si "Recordarme")

---

## 📊 Flujo de Funcionamiento

```
┌─────────────┐
│  Usuario    │
└──────┬──────┘
       │
       ├─► ¿Tienes cuenta? ─┐
       │                    │
       └─ NO ─► REGISTRO ───┤
       │                    │
       └─ SÍ ─► LOGIN  ──┬──┤
                         │  │
                         │  ├─► Servidor valida
                         │  │   contraseña
                         │  │
                         │  ├─► Genera JWT
                         │  │
                         │  ├─► Guarda en
                         │  │   localStorage
                         │  │
              ┌──────────┼──┴──────────┐
              │          │             │
          Usuario      Admin     ¿Admin?
          Regular      Login         │
              │          │           ├─ SÍ ─► /admin/dashboard
              │          │           │
              │          │           └─ NO ──► /
              │          │
         Acceso a    Acceso
        perfiles,    panel
        carrito,     admin
         compras
```

---

## 🧪 Credenciales de Prueba

Después de ejecutar `node init-db.js`:

| Tipo | Email | Contraseña | Ubicación |
|------|-------|-----------|-----------|
| Admin | admin@strawberrymakeup.com | admin123 | /admin/dashboard |
| Usuario Regular | juan@example.com | usuario123 | Home (/) |

---

## 📁 Estructura del Proyecto Actualizado

```
strawberry-makeup/
├── backend/                    # ✨ NUEVO
│   ├── package.json
│   ├── server.js              # Servidor Express
│   ├── init-db.js             # Script para crear BD
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   └── strawberry.db          # Base de datos (se crea)
│
├── src/
│   ├── App.jsx                # (Sin cambios necesarios)
│   ├── mainApp.jsx            # (Sin cambios necesarios)
│   │
│   └── components/
│       └── admin/
│           ├── Admin.jsx              # ✨ ACTUALIZADO: Login + Registro
│           ├── UserProfile.jsx        # ✨ NUEVO: Perfil de usuario
│           ├── AdminDashboard.jsx
│           └── ... (otros archivos sin cambios)
│
├── SETUP_GUIDE.md             # ✨ NUEVO: Instrucciones instalación
├── INTEGRATION_GUIDE.md       # ✨ NUEVO: Cómo integrar
├── package.json
└── ... (resto del proyecto)
```

---

## 🎯 Pasos Inmediatos

### 1️⃣ Instalar Backend (5 minutos)
```bash
cd backend
npm install
node init-db.js
npm start
```

### 2️⃣ Iniciar Frontend (1 minuto)
```bash
# En otra terminal
npm run dev
```

### 3️⃣ Probar (2 minutos)
- Ve a `http://localhost:5173/admin`
- Prueba registro con: email nuevo, contraseña 123456
- Prueba login con: `juan@example.com` / `usuario123`

### 4️⃣ Integrar (10 minutos)
- Lee `INTEGRATION_GUIDE.md`
- Agrega ruta `/perfil` en `App.jsx`
- Agrega botón de perfil en Header

---

## 💡 Características Destacadas

| Característica | Descripción | Estado |
|---|---|---|
| **Registro de usuarios** | Formulario con validación | ✅ Implementado |
| **Login de usuarios** | Con email y contraseña | ✅ Implementado |
| **Perfil de usuario** | Ver y editar datos | ✅ Implementado |
| **Base de datos** | SQLite con usuarios | ✅ Implementado |
| **Autenticación** | JWT tokens seguros | ✅ Implementado |
| **Contraseñas** | Encriptadas con bcrypt | ✅ Implementado |
| **Responsive design** | Mobile-friendly | ✅ Implementado |
| **Estilo consistente** | Usa Bootstrap 5 | ✅ Implementado |
| **Recuperar contraseña** | Por email | 📋 Sugerido |
| **Foto de perfil** | Upload de imagen | 📋 Sugerido |
| **Órdenes de compra** | Historial de compras | 📋 Sugerido |

---

## 🔄 Próximas Mejoras (Opcionales)

1. **Recuperación de contraseña**
   - Enviar email con enlace de reset
   - Cambiar contraseña con token temporal

2. **Confirmación de email**
   - Verificar que el email sea válido
   - Activar cuenta por email

3. **Foto de perfil**
   - Subir imagen de perfil
   - Almacenar en servidor

4. **Integración con carrito**
   - Vincular órdenes a usuario
   - Ver historial de compras

5. **Sistema de roles**
   - Permisos específicos por rol
   - Admin, vendedor, cliente

6. **Notificaciones**
   - Email de bienvenida
   - Notificaciones de pedidos

---

## 🐛 Solución Rápida de Problemas

| Problema | Solución |
|----------|----------|
| "Port 8000 already in use" | Cierra otra instancia del backend |
| "Cannot GET /api/auth/register" | Asegúrate de que el backend está en `/backend` |
| "CORS error" | Verifica que el backend está en `localhost:8000` |
| "Database not found" | Ejecuta `node init-db.js` |
| "Invalid credentials" | Usa `juan@example.com` / `usuario123` |

---

## 📚 Archivos de Referencia

- **Documentación backend**: `backend/README.md`
- **Guía de instalación**: `SETUP_GUIDE.md`
- **Guía de integración**: `INTEGRATION_GUIDE.md`
- **Código del servidor**: `backend/server.js`
- **Componente Login/Registro**: `src/components/admin/Admin.jsx`
- **Componente Perfil**: `src/components/admin/UserProfile.jsx`

---

## ✅ Checklist Final

- [ ] He leído `SETUP_GUIDE.md`
- [ ] He instalado dependencias: `cd backend && npm install`
- [ ] He inicializado la BD: `node init-db.js`
- [ ] He iniciado el backend: `npm start`
- [ ] He iniciado el frontend: `npm run dev`
- [ ] He probado registro y login
- [ ] He leído `INTEGRATION_GUIDE.md`
- [ ] He integrado UserProfile en mis rutas

---

## 🎉 ¡Listo!

Tu aplicación ahora tiene:
- ✅ Sistema de autenticación profesional
- ✅ Base de datos de usuarios
- ✅ Perfiles personalizables
- ✅ Sesiones seguras con JWT
- ✅ Validación completa
- ✅ Código escalable y limpio

**¿Preguntas?** Consulta cualquiera de los archivos de guía incluidos.

Happy coding! 🚀
