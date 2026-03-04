import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import AdminAddFilter from './AdminAddFilter';
import AdminFilter from './AdminFilter';

const AdminDashboard = () => {
    const [productos, setProductos] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const BACKEND_URL = 'http://localhost:8000';

    useEffect(() => {
        obtenerProductos();
    }, []);

    const getImageUrl = (imagePath) => {
        return imagePath ? `${BACKEND_URL}${imagePath}` : '/images/default.png';
    };

    const obtenerProductos = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/products`);
            console.log('Datos recibidos:', response.data);
            setProductos(response.data);
            setFilteredProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            setLoading(false);
        }
    };

    const handleFilter = (filterCriteria) => {
        if (Object.keys(filterCriteria).length === 0) {
            setFilteredProducts(productos);
            return;
        }

        const filtered = productos.filter(producto => {
            const nameMatch = !filterCriteria.name || producto.name.toLowerCase().includes(filterCriteria.name);
            const categoryMatch = !filterCriteria.category || producto.category.toLowerCase().includes(filterCriteria.category);
            const minPriceMatch = !filterCriteria.minPrice || producto.price >= filterCriteria.minPrice;
            const maxPriceMatch = !filterCriteria.maxPrice || producto.price <= filterCriteria.maxPrice;
            return nameMatch && categoryMatch && minPriceMatch && maxPriceMatch;
        });

        setFilteredProducts(filtered);
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
                        <li className="active">
                            
                            <i className="bi bi-box"></i>
                            <span>Productos</span>
                            
                        </li>
                        <li className="active">
                            <i className="fa fa-archive"></i>
                            <span>Pedidos</span>
                        </li>
                        <li className="active">
                            <i className="fa fa-user-circle"></i>
                            <span>Administradores</span>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="dashboard-main">
                <div className="section-header">
                    <h2>Productos</h2>
                    <AdminAddFilter BACKEND_URL={BACKEND_URL} onSave={obtenerProductos} />
                </div>
                
                <AdminFilter onFilter={handleFilter} />
                
                <div className="products-section">
                    <div className="products-grid">
                        {filteredProducts.map(producto => (
                            <div 
                                key={producto.id} 
                                className="product-card"
                                onClick={() => {
                                    setSelectedProduct(producto);
                                    setShowModal(true);
                                }}
                            >
                                <img 
                                    src={getImageUrl(producto.image)} 
                                    alt={producto.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `${BACKEND_URL}/images/default.png`;
                                    }}
                                />
                                <div className="product-info">
                                    <h3>{producto.name}</h3>
                                    <p>{producto.description}</p>
                                    <p>Categoria: {producto.category}</p>
                                    <p>${producto.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showModal && selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedProduct(null);
                        }}
                    />
                )}
                
            </div>
        </div>
    );
};

export default AdminDashboard;
