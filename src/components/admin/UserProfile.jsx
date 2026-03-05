import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        pais: '',
        codigo_postal: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            navigate('/admin');
            return;
        }

        fetchUserProfile(userId, token);
    }, [navigate]);

    const fetchUserProfile = async (userId, token) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:8000/api/auth/profile/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setUserData(response.data.usuario);
                setFormData(response.data.usuario);
            }
        } catch (error) {
            setError('Error al cargar el perfil');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');
        const userId = localStorage.getItem('userId');

        try {
            setLoading(true);
            setError('');
            setSuccess('');

            const response = await axios.put(
                `http://localhost:8000/api/auth/profile/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setUserData(formData);
                setSuccess('Perfil actualizado exitosamente');
                setIsEditing(false);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al actualizar perfil');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        navigate('/admin');
    };

    if (loading && !userData) {
        return (
            <div className="container vh-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card shadow">
                        {/* Header */}
                        <div className="card-header" style={{ backgroundColor: 'var(--primary)' }}>
                            <div className="d-flex justify-content-between align-items-center text-white">
                                <h4 className="mb-0">
                                    <i className="fas fa-user-circle me-2"></i>
                                    Mi Perfil
                                </h4>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-light btn-sm"
                                >
                                    <i className="fas fa-sign-out-alt me-2"></i>
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {error}
                                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    {success}
                                    <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                                </div>
                            )}

                            {isEditing ? (
                                // Formulario de edición
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Nombre Completo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                disabled
                                            />
                                            <small className="text-muted">El email no puede ser modificado</small>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Teléfono</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="telefono"
                                                value={formData.telefono || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Ciudad</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="ciudad"
                                                value={formData.ciudad || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Dirección</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="direccion"
                                                value={formData.direccion || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">País</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="pais"
                                                value={formData.pais || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Código Postal</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="codigo_postal"
                                                value={formData.codigo_postal || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button
                                            type="submit"
                                            className="btn"
                                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-save me-2"></i>
                                                    Guardar Cambios
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData(userData);
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                // Vista de lectura
                                <div>
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <label className="text-muted small">Nombre Completo</label>
                                            <h6>{userData?.nombre || 'N/A'}</h6>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="text-muted small">Email</label>
                                            <h6>{userData?.email || 'N/A'}</h6>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <label className="text-muted small">Teléfono</label>
                                            <h6>{userData?.telefono || 'No registrado'}</h6>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="text-muted small">Ciudad</label>
                                            <h6>{userData?.ciudad || 'No registrado'}</h6>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <label className="text-muted small">Dirección</label>
                                            <h6>{userData?.direccion || 'No registrado'}</h6>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="text-muted small">País</label>
                                            <h6>{userData?.pais || 'No registrado'}</h6>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <label className="text-muted small">Código Postal</label>
                                            <h6>{userData?.codigo_postal || 'No registrado'}</h6>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="btn"
                                        style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                                    >
                                        <i className="fas fa-edit me-2"></i>
                                        Editar Perfil
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
