import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminAddFilter from './AdminAddFilter';
import AdminFilter from './AdminFilter';
import AdminOrders from './AdminOrders';
import Administradores from './Administradores';
import '../../App.css';

const AdminDashboard = () => {
    const [productos, setProductos] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeSection, setActiveSection] = useState('productos');
    const [selectedAction, setSelectedAction] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const BACKEND_URL = 'http://localhost:8000';

    useEffect(() => {
        obtenerProductos();
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown')) {
            setSelectedAction(null);
        }
    };

    const obtenerProductos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/products`);
            setProductos(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (filterCriteria) => {
        if (Object.keys(filterCriteria).length === 0) {
            setFilteredProducts(productos);
            return;
        }

        const filtered = productos.filter(producto => {
            const nameMatch = !filterCriteria.name || producto.name.toLowerCase().includes(filterCriteria.name.toLowerCase());
            const categoryMatch = !filterCriteria.category || producto.category.toLowerCase().includes(filterCriteria.category.toLowerCase());
            const minPriceMatch = !filterCriteria.minPrice || producto.price >= filterCriteria.minPrice;
            const maxPriceMatch = !filterCriteria.maxPrice || producto.price <= filterCriteria.maxPrice;
            return nameMatch && categoryMatch && minPriceMatch && maxPriceMatch;
        });

        setFilteredProducts(filtered);
    };

    const handleProductAction = async (action, product) => {
        try {
            switch(action) {
                case 'edit':
                    setEditMode(true);
                    setSelectedProduct(product);
                    setShowModal(true);
                    break;
                case 'delete':
                    if(window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                        // Extraer el nombre del archivo de la ruta de la imagen
                        const imagePath = product.image;
                        await axios.delete(`${BACKEND_URL}/products/${product.id}`, {
                            data: { imagePath } // Enviamos la ruta de la imagen al backend
                        });
                        obtenerProductos();
                    }
                    break;
                case 'toggle':
                    await axios.put(`${BACKEND_URL}/products/${product.id}`, {
                        ...product,
                        active: !product.active
                    });
                    obtenerProductos();
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const ProductModal = ({ product, onClose }) => {
        const [formData, setFormData] = useState({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
        });
        const [newImage, setNewImage] = useState(null);
        const [previewUrl, setPreviewUrl] = useState(`${BACKEND_URL}${product.image}`);

        const handleChange = (e) => {
            const { name, value, type, files } = e.target;
            if (type === 'file') {
                const file = files[0];
                setNewImage(file);
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('category', formData.category);
            if (newImage) {
                formDataToSend.append('image', newImage);
            }

            try {
                await axios.put(`${BACKEND_URL}/products/${product.id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                obtenerProductos();
                onClose();
            } catch (error) {
                console.error('Error al actualizar producto:', error);
            }
        };

        return (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Producto</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Imagen actual</label>
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="img-fluid mb-2"
                                                style={{
                                                    width: '100%',
                                                    height: '300px',
                                                    objectFit: 'contain',
                                                    backgroundColor: '#f8f9fa'
                                                }}
                                            />
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="image"
                                                onChange={handleChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Descripción</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows="3"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Precio</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Categoría</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Guardar cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h3>Panel de Admin</h3>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className={activeSection === 'productos' ? 'active' : ''} onClick={() => setActiveSection('productos')}>
                            <i className="bi bi-box"></i>
                            <span>Productos</span>
                        </li>
                        <li className={activeSection === 'pedidos' ? 'active' : ''} onClick={() => setActiveSection('pedidos')}>
                            <i className="fa fa-archive"></i>
                            <span>Pedidos</span>
                        </li>
                        <li className={activeSection === 'administradores' ? 'active' : ''} onClick={() => setActiveSection('administradores')}>
                            <i className="fa fa-user-circle"></i>
                            <span>Administradores</span>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="dashboard-main">
                <div className="section-header">
                    <h2>{activeSection === 'productos' ? 'Productos' : activeSection === 'pedidos' ? 'Pedidos' : 'Administradores'}</h2>
                    {activeSection === 'productos' && <AdminAddFilter BACKEND_URL={BACKEND_URL} onSave={obtenerProductos} />}
                </div>

                {activeSection === 'productos' && (
                    <>
                        <AdminFilter onFilter={handleFilter} />
                        <div className="products-section">
                            <div className="products-grid">
                                {filteredProducts.map(producto => (
                                    <div key={producto.id} className="product-card">
                                        <div className="product-image-container" style={{ height: '300px', position: 'relative' }}>
                                            <img 
                                                src={`${BACKEND_URL}${producto.image}`}
                                                alt={producto.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain'
                                                }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `${BACKEND_URL}/images/default.png`;
                                                }}
                                            />
                                            <div className="product-actions" style={{ 
                                                position: 'absolute', 
                                                top: '10px', 
                                                right: '10px',
                                                zIndex: '1050'
                                            }}>
                                                <div className="dropdown">
                                                    <button 
                                                        className="btn btn-light btn-sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedAction(selectedAction === producto.id ? null : producto.id);
                                                        }}
                                                    >
                                                        <i className="bi bi-three-dots-vertical"></i>
                                                    </button>
                                                    {selectedAction === producto.id && (
                                                        <div className="dropdown-menu show" style={{
                                                            position: 'absolute',
                                                            right: 0,
                                                            top: '100%',
                                                            zIndex: '1051'
                                                        }}>
                                                            <button 
                                                                className="dropdown-item"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleProductAction('edit', producto);
                                                                }}
                                                            >
                                                                <i className="bi bi-pencil me-2"></i>
                                                                Editar
                                                            </button>
                                                            <button 
                                                                className="dropdown-item"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleProductAction('delete', producto);
                                                                }}
                                                            >
                                                                <i className="bi bi-trash me-2"></i>
                                                                Eliminar
                                                            </button>
                                                            <button 
                                                                className="dropdown-item"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleProductAction('toggle', producto);
                                                                }}
                                                            >
                                                                <i className={`bi bi-${producto.active ? 'pause' : 'play'} me-2`}></i>
                                                                {producto.active ? 'Pausar' : 'Activar'}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <h3>{producto.name}</h3>
                                            <p>{producto.description}</p>
                                            <p>Categoría: {producto.category}</p>
                                            <p className="price">${producto.price.toLocaleString()}</p>
                                            {!producto.active && (
                                                <span className="badge bg-warning">Pausado</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeSection === 'pedidos' && <AdminOrders />}
                {activeSection === 'administradores' && <Administradores />}
                
                {showModal && selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedProduct(null);
                            setEditMode(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;