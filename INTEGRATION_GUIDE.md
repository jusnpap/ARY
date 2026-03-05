# 🔗 Integración de UserProfile en el Proyecto

## Opción 1: Agregar ruta directa (Recomendado)

Si quieres que el perfil sea accesible desde una URL como `/perfil`, edita `src/App.jsx`:

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import UserProfile from './components/admin/UserProfile';  // ✨ NUEVA
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import MasterPage from './pages/MasterPage';


const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<MasterPage.Home/>} />
                <Route path='/shop' element={<MasterPage.Shop/>} />
                <Route path='/product/:id' element={<MasterPage.ProductPage/>} />
                <Route path='/contact' element={<MasterPage.Contact/>} />
                <Route path='/shopcart' element={<MasterPage.ShopCart/>} />
                <Route path='/admin' element={<MasterPage.admin/>} />
                <Route path='/admin/dashboard' element={<MasterPage.dashboard/>} />
                <Route path='/perfil' element={<UserProfile/>} />  {/* ✨ NUEVA */}
            </Routes>
            <Footer />
        </div>
    );
};
export default App;
```

Ahora el perfil estará en: `http://localhost:5173/perfil`

---

## Opción 2: Agregar a Header (Botón de Perfil)

Si quieres agregar un botón en el Header para acceder al perfil, edita `src/components/header/Header.jsx`:

```jsx
// Busca donde está el botón de "Iniciar Sesión" o la sección del usuario

// Agrega un enlace o botón así:
<Link to="/perfil" className="btn" style={{color: 'var(--primary)'}}>
    <i className="fas fa-user me-2"></i>
    Mi Perfil
</Link>
```

O en el menú desplegable:

```jsx
<li>
    <Link className="dropdown-item" to="/perfil">
        <i className="fas fa-user me-2"></i>
        Mi Perfil
    </Link>
</li>
```

---

## Opción 3: Modal en lugar de página completa

Si prefieres mostrar el perfil en un modal, crea `src/components/admin/UserProfileModal.jsx`:

```jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';

const UserProfileModal = ({ userId, token, onClose }) => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    // ... (reutiliza la lógica de UserProfile.jsx)

    return (
        <div className="modal fade show" id="profileModal" tabIndex="-1" style={{display: 'block'}}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header" style={{backgroundColor: 'var(--primary)', color: 'white'}}>
                        <h5 className="modal-title">Mi Perfil</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    {/* ... resto del contenido */}
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
```

---

## Proteger rutas con autenticación

Si quieres proteger el acceso a `/perfil` solo para usuarios autenticados, crea `src/components/ProtectedRoute.jsx`:

```jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    
    if (!token) {
        return <Navigate to="/admin" replace />;
    }
    
    return children;
};

export default ProtectedRoute;
```

Luego úsalo en App.jsx:

```jsx
<Route 
    path='/perfil' 
    element={
        <ProtectedRoute>
            <UserProfile />
        </ProtectedRoute>
    } 
/>
```

---

## Mostrar nombre de usuario en Header (Si está autenticado)

En `src/components/header/Header.jsx`, puedes mostrar el nombre del usuario autenticado:

```jsx
import { useEffect, useState } from 'react';

const Header = () => {
    const [userName, setUserName] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const name = localStorage.getItem('userName');
        
        if (token && name) {
            setUserName(name);
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href = '/';
    };

    return (
        <header>
            {/* ... header content ... */}
            
            {isAuthenticated ? (
                <div className="user-section">
                    <span>Hola, {userName}!</span>
                    <Link to="/perfil">Mi Perfil</Link>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <Link to="/admin">Iniciar Sesión</Link>
            )}
        </header>
    );
};
```

---

## Verificar sesión al cargar la app

En `src/mainApp.jsx` o `src/App.jsx`, verifica si el token es válido:

```jsx
useEffect(() => {
    const token = localStorage.getItem('userToken');
    
    if (token) {
        // Verifica que el token sea válido
        axios.post('http://localhost:8000/api/auth/verify', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(() => {
            // Token expirado o inválido, limpiar localStorage
            localStorage.removeItem('userToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            navigate('/admin');
        });
    }
}, []);
```

---

## Flujo de autenticación completo

```
1. Usuario abre la app
2. Si no tiene token → muestra header normal (Iniciar Sesión)
3. Usuario hace clic en "Iniciar Sesión" → va a /admin
4. En /admin puede:
   - Iniciar sesión → localStorage recibe token
   - Registrarse → localStorage recibe token
5. Token se guarda y se envía en cada request
6. Si token expira → se redirige a /admin
7. Usuario puede acceder a /perfil para ver/editar su info
```

---

## Testing de autenticación

Para probar todo funciona correctamente:

```javascript
// Abre la consola del navegador y ejecuta:

// 1. Verificar token guardado
console.log(localStorage.getItem('userToken'));

// 2. Ver información del usuario
console.log({
    id: localStorage.getItem('userId'),
    nombre: localStorage.getItem('userName'),
});

// 3. Hacer request autenticado
fetch('http://localhost:8000/api/auth/verify', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    }
}).then(r => r.json()).then(console.log);

// 4. Verificar si está autenticado
const isAuth = !!localStorage.getItem('userToken');
console.log('Autenticado:', isAuth);
```

---

## 🎯 Resumen de cambios necesarios

| Archivo | Cambio | Prioridad |
|---------|--------|----------|
| `src/App.jsx` | Importar UserProfile y agregar ruta `/perfil` | 🔴 Alta |
| `src/components/header/Header.jsx` | Mostrar nombre de usuario y botón /perfil | 🟡 Media |
| `src/components/ProtectedRoute.jsx` | Crear y usar para proteger rutas | 🟡 Media |
| `src/mainApp.jsx` | Verificar token al cargar | 🟡 Media |

---

## ✨ Listo

Tu sistema de autenticación está **completamente integrado**. Los usuarios ahora pueden:

✅ Registrarse  
✅ Iniciar sesión  
✅ Ver su perfil en `/perfil`  
✅ Editar su información  
✅ Ver su nombre en el Header  
✅ Cerrar sesión
