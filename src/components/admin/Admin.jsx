import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import logo from '../../assets/logo/strawberrymakeup.png';

const Admin = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [loginData, setLoginData] = useState({
        email: '',
        contraseña: '',
        rememberMe: false
    });

    const [registerData, setRegisterData] = useState({
        nombre: '',
        email: '',
        contraseña: '',
        confirmarContraseña: '',
        telefono: '',
        ciudad: ''
    });

    const handleLoginChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Intentar login como usuario regular primero
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                email: loginData.email,
                contraseña: loginData.contraseña,
                rememberMe: loginData.rememberMe
            });
            
            if (response.data.success) {
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userName', response.data.usuario.nombre);
                localStorage.setItem('userId', response.data.usuario.id);
                
                // Si es admin, redirigir al dashboard
                if (response.data.usuario.esAdmin) {
                    localStorage.setItem('adminToken', response.data.token);
                    navigate('/admin/dashboard');
                } else {
                    // Si es usuario regular, redirigir al home
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al iniciar sesión');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validación
        if (registerData.contraseña !== registerData.confirmarContraseña) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (registerData.contraseña.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                nombre: registerData.nombre,
                email: registerData.email,
                contraseña: registerData.contraseña,
                telefono: registerData.telefono,
                ciudad: registerData.ciudad
            });

            if (response.data.success) {
                setSuccess('¡Cuenta registrada exitosamente! Redirigiendo...');
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userName', response.data.usuario.nombre);
                localStorage.setItem('userId', response.data.usuario.id);
                
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al registrar usuario');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container d-flex align-items-center justify-content-between vh-100">
            {/* Logo Section */}
            <div className="d-none d-md-flex align-items-center justify-content-center" style={{ flex: '1' }}>
                <img 
                    src={logo} 
                    alt="Logo" 
                    style={{ 
                        maxWidth: '80%',
                        height: 'auto'
                    }} 
                />
            </div>

            {/* Form Section */}
            <div className="d-flex align-items-center justify-content-center" style={{ flex: '1' }}>
                <div className="card p-4" id="login-card" style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="text-center">
                        <div className="icon">
                            <i className={`fas ${isLogin ? 'fa-user-circle' : 'fa-user-plus'}`}></i>
                        </div>
                        <h5 className="mt-3">
                            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        </h5>
                        <p className="text-muted small">
                            {isLogin 
                                ? '¿No tienes cuenta? ' 
                                : '¿Ya tienes cuenta? '
                            }
                            <button 
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                    setSuccess('');
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    padding: 0,
                                    fontSize: 'inherit'
                                }}
                            >
                                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
                            </button>
                        </p>
                    </div>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success" role="alert">
                            {success}
                        </div>
                    )}

                    {isLogin ? (
                        // LOGIN FORM
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-group mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Correo Electrónico" 
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Contraseña" 
                                    name="contraseña"
                                    value={loginData.contraseña}
                                    onChange={handleLoginChange}
                                    required 
                                />
                            </div>
                            <div className="form-group d-flex justify-content-between align-items-center mb-3">
                                <div className="form-check">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id="rememberMe"
                                        name="rememberMe"
                                        checked={loginData.rememberMe}
                                        onChange={handleLoginChange}
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Recordarme
                                    </label>
                                </div>
                                <a href="#" style={{color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem'}}>
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <button 
                                type="submit" 
                                className="btn w-100"
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    color: 'white'
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Iniciando...
                                    </>
                                ) : (
                                    'Ingresar'
                                )}
                            </button>
                        </form>
                    ) : (
                        // REGISTER FORM
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="form-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre Completo" 
                                    name="nombre"
                                    value={registerData.nombre}
                                    onChange={handleRegisterChange}
                                    required 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Correo Electrónico" 
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Contraseña" 
                                    name="contraseña"
                                    value={registerData.contraseña}
                                    onChange={handleRegisterChange}
                                    required 
                                />
                                <small className="text-muted">Mínimo 6 caracteres</small>
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Confirmar Contraseña" 
                                    name="confirmarContraseña"
                                    value={registerData.confirmarContraseña}
                                    onChange={handleRegisterChange}
                                    required 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                    type="tel" 
                                    className="form-control" 
                                    placeholder="Teléfono (Opcional)" 
                                    name="telefono"
                                    value={registerData.telefono}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Ciudad (Opcional)" 
                                    name="ciudad"
                                    value={registerData.ciudad}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="form-check mb-3">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="terms"
                                    required 
                                />
                                <label className="form-check-label" htmlFor="terms" style={{fontSize: '0.85rem'}}>
                                    Acepto los <a href="#" style={{color: 'var(--primary)'}}>términos y condiciones</a>
                                </label>
                            </div>
                            <button 
                                type="submit" 
                                className="btn w-100"
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    color: 'white'
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Registrando...
                                    </>
                                ) : (
                                    'Crear Cuenta'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
};

export default Admin;