import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CartOffcanvas from "../../cart/CartOffcanvas";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:8000";

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(price);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category && products.length > 0) {
      const filtered = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/products`);
      const activeProducts = response.data.filter(product => product.active !== false);
      setProducts(activeProducts);
      setFilteredProducts(activeProducts);
    } catch (error) {
      setError("Error al cargar los productos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    return imagePath ? `${BACKEND_URL}${imagePath}` : `${BACKEND_URL}/images/default.png`;
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        {error}
      </div>
    );
  }

  const params = new URLSearchParams(location.search);
  const currentCategory = params.get('category');

  return (
    <div className="container py-4">
      {currentCategory ? (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Productos en categoría: {currentCategory}</h2>
          <button 
            className="btn"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            onClick={() => {
              window.history.pushState({}, '', '/shop');
              setFilteredProducts(products);
            }}
          >
            Ver todas las categorías
          </button>
        </div>
      ) : (
        <h2 className="text-center mb-5">Nuestros Productos</h2>
      )}

      <div className="row g-4 justify-content-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <div 
                className="card h-100 shadow-sm" 
                style={{ maxWidth: '280px', margin: '0 auto', cursor: 'pointer' }}
                onClick={() => navigate(`/product/${product.id}`)}
              > 
                <div style={{ height: '230px', overflow: 'hidden' }}>
                  <img
                    src={getImageUrl(product.image)}
                    className="card-img-top"
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${BACKEND_URL}/images/default.png`;
                    }}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      padding: '5px'
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column p-2">
                  <h6 className="card-title text-truncate mb-1" style={{ fontSize: '0.9rem' }}>{product.name}</h6>
                  <p className="card-text small mb-1" style={{ fontSize: '0.8rem' }}>{product.category}</p>
                  <p className="h6 text-primary mb-2">${formatPrice(product.price)}</p>
                  <button 
                    className="btn btn-sm w-100" 
                    style={{ 
                      backgroundColor: 'var(--primary)', 
                      color: 'white',
                      fontSize: '0.8rem',
                      padding: '0.25rem 0'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                      handleShowCart();
                    }}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No hay productos disponibles{currentCategory ? ' en esta categoría' : ''}</p>
          </div>
        )}
      </div>

      {showCart && (
        <div 
          className="offcanvas-backdrop fade show" 
          onClick={handleCloseCart}
        ></div>
      )}

      <CartOffcanvas
        show={showCart}
        handleClose={handleCloseCart}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Productos;