import React, { useState } from 'react';

const AdminFilter = ({ onFilter }) => {
    const [filterCriteria, setFilterCriteria] = useState({
        name: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convertir los precios a números y limpiar los criterios vacíos
        const cleanedCriteria = {
            name: filterCriteria.name.toLowerCase().trim(),
            category: filterCriteria.category.toLowerCase().trim(),
            minPrice: filterCriteria.minPrice ? Number(filterCriteria.minPrice) : null,
            maxPrice: filterCriteria.maxPrice ? Number(filterCriteria.maxPrice) : null
        };
        onFilter(cleanedCriteria);
    };

    const handleReset = () => {
        setFilterCriteria({
            name: '',
            category: '',
            minPrice: '',
            maxPrice: ''
        });
        onFilter({}); // Resetear los filtros
    };

    return (
        <div className="filter-container p-3 bg-light rounded ">
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del producto"
                        name="name"
                        value={filterCriteria.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Categoría"
                        name="category"
                        value={filterCriteria.category}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Precio mínimo"
                        name="minPrice"
                        value={filterCriteria.minPrice}
                        onChange={handleInputChange}
                        min="0"
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Precio máximo"
                        name="maxPrice"
                        value={filterCriteria.maxPrice}
                        onChange={handleInputChange}
                        min="0"
                    />
                </div>
                <div className="col-md-2 d-flex gap-2">
                    <button type="submit" className="btn " style={{backgroundColor: 'var(--primary)', color: 'white'}}>
                        Filtrar
                    </button>
                    <button 
                        type="button" 
                        className="btn " style={{backgroundColor: 'var(--ligth)', color: 'white'}}
                        onClick={handleReset}
                    >
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminFilter;