# 🍓 Guía de Instalación - Sistema de Autenticación y Base de Datos

## 📋 Lo que se ha creado

Te he creado un **sistema completo de autenticación** con:

✅ **Backend con Express.js** - Servidor en Node.js  
✅ **Base de Datos SQLite** - Almacena usuarios de forma segura  
✅ **Contraseñas Encriptadas** - Con bcryptjs  
✅ **Login + Registro** - Componentes React unificados  
✅ **Perfil de Usuario** - Para ver y editar datos  
✅ **JWT Tokens** - Sesiones seguras  

---

## 🚀 Pasos de Instalación

### Paso 1: Instalar dependencias del Backend

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
cd backend
npm install
```

Esto instalará todos los paquetes necesarios (Express, SQLite, bcryptjs, JWT, etc.)

### Paso 2: Inicializar la Base de Datos

Todavía en la carpeta `backend/`, ejecuta:

```bash
node init-db.js
```

**Esto creará:**
- La base de datos SQLite (`strawberry.db`)
- Las tablas de usuarios
- Dos usuarios de ejemplo:
  - **Admin**: email: `admin@strawberrymakeup.com` | contraseña: `admin123`
  - **Usuario regular**: email: `juan@example.com` | contraseña: `usuario123`

Deberías ver algo como:
```
✅ Tabla usuarios creada/verificada
✅ Tabla usuarios_roles creada/verificada
✅ Usuario admin creado:
   Email: admin@strawberrymakeup.com
   Contraseña: admin123
✅ Usuario ejemplo creado:
   Email: juan@example.com
   Contraseña: usuario123

📊 Usuarios en la base de datos:
┌─────┬──────────────┬───────────────────────────────┬──────────┐
│ id  │ nombre       │ email                         │ es_admin │
├─────┼──────────────┼───────────────────────────────┼──────────┤
│ 1   │ admin        │ admin@strawberrymakeup.com    │ 1        │
│ 2   │ Juan Pérez   │ juan@example.com              │ 0        │
└─────┴──────────────┴───────────────────────────────┴──────────┘

✨ Base de datos lista para usar
```

### Paso 3: Iniciar el Backend

En la ventana de terminal (en la carpeta `backend/`), ejecuta:

```bash
npm start
```

O para modo desarrollo con auto-reload:

```bash
npm run dev
```

Verás:
```
Servidor ejecutándose en http://localhost:8000
```

**🟢 Mantén esta terminal abierta mientras desarrollas**

### Paso 4: Iniciar el Frontend (otra terminal)

En una terminal nueva (en la raíz del proyecto), ejecuta:

```bash
npm run dev
```

El frontend estará en `http://localhost:5173`

---

## 🧪 Pruebas Rápidas

### Probar Registro

1. Ve a `http://localhost:5173/admin`
2. Haz clic en "Regístrate aquí"
3. Llena el formulario:
   - Nombre: `Tu Nombre`
   - Email: `tuemail@example.com`
   - Contraseña: `password123`
   - Confirmar: `password123`
4. Haz clic en "Crear Cuenta"
5. ¡Deberías ser redirigido al home!

### Probar Login

1. Ve a `http://localhost:5173/admin`
2. Usa credenciales de ejemplo:
   - Email: `juan@example.com`
   - Contraseña: `usuario123`
3. ¡Deberías iniciar sesión!

### Probar Login Admin

1. Ve a `http://localhost:5173/admin`
2. Usa credenciales admin:
   - Email: `admin@strawberrymakeup.com`
   - Contraseña: `admin123`
3. Deberías ser redirigido a `/admin/dashboard`

---

## 👤 Componente de Perfil de Usuario

Se creó un nuevo componente `UserProfile.jsx` para que los usuarios puedan:
- Ver su información
- Editar nombre, teléfono, dirección, ciudad, país
- Cerrar sesión

Para usarlo, puedes agregarlo a tus rutas:

```jsx
import UserProfile from './components/admin/UserProfile';

// En tu router:
<Route path="/perfil" element={<UserProfile />} />
```

---

## 🗂️ Estructura de Archivos Creados

```
backend/
├── package.json         # Dependencias (Express, SQLite, bcrypt, JWT)
├── server.js           # Servidor Express con todos los endpoints
├── init-db.js          # Script para inicializar BD y usuarios
├── .env.example        # Variables de configuración (ejemplo)
├── .gitignore          # Ignora archivos sensibles en Git
├── README.md           # Documentación técnica
└── strawberry.db       # Base de datos (se crea automáticamente)

src/components/admin/
├── Admin.jsx           # ✨ ACTUALIZADO: Login + Registro unificados
└── UserProfile.jsx     # ✨ NUEVO: Perfil y edición de usuario
```

---

## 🔐 Credenciales de Prueba

| Tipo | Email | Contraseña |
|------|-------|-----------|
| Admin | admin@strawberrymakeup.com | admin123 |
| Usuario | juan@example.com | usuario123 |

**⚠️ Cambia estas contraseñas en producción**

---

## 📱 Endpoints Disponibles

### Registro
```
POST /api/auth/register
{
    "nombre": "Tu Nombre",
    "email": "email@example.com",
    "contraseña": "password123",
    "telefono": "+593 999999999",
    "ciudad": "Tulcán"
}
```

### Login
```
POST /api/auth/login
{
    "email": "email@example.com",
    "contraseña": "password123",
    "rememberMe": true
}
```

### Obtener Perfil
```
GET /api/auth/profile/{id}
Headers: Authorization: Bearer {token}
```

### Actualizar Perfil
```
PUT /api/auth/profile/{id}
Headers: Authorization: Bearer {token}
{
    "nombre": "Nuevo Nombre",
    "telefono": "+593 999999999",
    "ciudad": "Quito"
}
```

---

## 🐛 Solución de Problemas

### "Puerto 8000 ya está en uso"
El backend ya está corriendo. Verifica si hay otra terminal con `npm start`

### "Error al conectar al backend"
Asegúrate de que:
1. El backend está corriendo (`npm start` o `npm run dev`)
2. Está en `http://localhost:8000`
3. CORS está habilitado en `server.js`

### "Base de datos no encontrada"
Ejecuta `node init-db.js` en la carpeta `backend/`

### "Credenciales inválidas"
Asegúrate de usar el email correcto:
- Admin: `admin@strawberrymakeup.com`
- Usuario: `juan@example.com`

---

## 🎨 Estilos y Diseño

El componente de Login/Registro mantiene el **mismo estilo** que tenías:
- Colors: Usa las variables CSS del tema (`var(--primary)`)
- Bootstrap 5: Mismo framework que ya usas
- Responsive: Mobile-first, igual que tu proyecto
- Iconos: Font Awesome (ya instalado)

---

## ⚙️ Próximos Pasos (Opcionales)

Si quieres mejorar aún más el sistema:

1. **Recuperar contraseña**: Enviar email con enlace de reset
2. **Confirmación de email**: Verificar que es un email real
3. **Foto de perfil**: Subir imágenes
4. **Órdenes de compra**: Vincular con carrito de compras
5. **Historial**: Ver compras previas
6. **Notificaciones**: Alertas de nuevas órdenes

---

## 📞 Resuma de comandos

```bash
# Terminal 1: Backend
cd backend
npm install        # Una vez, al inicio
node init-db.js   # Una vez, para crear BD
npm start         # Cada vez que desarrolles

# Terminal 2: Frontend
npm run dev       # Cada vez que desarrolles
```

---

## ✨ ¡Listo!

Ahora tu aplicación tiene un sistema de autenticación **profesional, seguro y escalable**.

Los usuarios pueden:
- ✅ Registrarse
- ✅ Iniciar sesión
- ✅ Ver y editar su perfil
- ✅ Los datos se guardan en una base de datos real

Disfruta desarrollando 🍓
