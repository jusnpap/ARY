import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import logo from '../../assets/logo/strawberrymakeup.png';

const Admin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        nombre: '',
        contraseña: '',
        rememberMe: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/admin/validate', credentials);
            
            if (response.data.valid) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin/dashboard');
            } else {
                setError('Credenciales inválidas');
            }
        } catch (error) {
            setError('Error al validar credenciales');
            console.error('Error:', error);
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

            {/* Login Form Section */}
            <div className="d-flex align-items-center justify-content-center" style={{ flex: '1' }}>
                <div className="card p-4" id="login-card">
                    <div className="text-center">
                        <div className="icon">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <h5 className="mt-3">Iniciar Sesión</h5>
                    </div>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Usuario" 
                                name="nombre"
                                value={credentials.nombre}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Contraseña" 
                                name="contraseña"
                                value={credentials.contraseña}
                                onChange={handleChange}
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
                                    checked={credentials.rememberMe}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Recordarme
                                </label>
                            </div>
                            <a href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>
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
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Admin;