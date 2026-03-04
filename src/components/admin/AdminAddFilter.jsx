import React, { useState } from 'react';
import axios from 'axios';

const AdminAddFilter = ({ BACKEND_URL, onSave }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 8 * 1024 * 1024) { // 8MB en bytes
            setErrorMessage('El archivo es demasiado grande. El tamaño máximo permitido es 8MB.');
            setNewProduct({ ...newProduct, image: null });
        } else {
            setErrorMessage('');
            setNewProduct({ ...newProduct, image: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newProduct.image) {
            setErrorMessage('Por favor, selecciona una imagen.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('description', newProduct.description);
            formData.append('price', newProduct.price);
            formData.append('category', newProduct.category);
            formData.append('image', newProduct.image);

            await axios.post(`${BACKEND_URL}/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowAddModal(false);
            onSave(); // Llama a la función onSave para actualizar la lista de productos
            setNewProduct({ name: '', description: '', price: '', category: '', image: null });
        } catch (error) {
            console.error('Error al añadir producto:', error);
        }
    };

    return (
        <>
            <button 
                className="btn me-2" style={{backgroundColor: 'var(--primary)', color: 'white'}}
                onClick={() => setShowAddModal(true)}
            >
                <i className="bi bi-plus-circle"></i> Añadir
            </button>

            {showAddModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Añadir Nuevo Producto</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Nombre:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Descripción:</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Precio:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="price"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">Categoría:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="category"
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Imagen:</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Guardar Producto
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminAddFilter;