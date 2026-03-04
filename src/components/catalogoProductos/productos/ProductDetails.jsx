import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartOffcanvas from '../../cart/CartOffcanvas';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  
  const BACKEND_URL = 'http://localhost:8000';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(price);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2>Producto no encontrado</h2>
          <button 
            className="btn mt-3" 
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            onClick={() => navigate('/shop')}
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <div className="product-image-container p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <img
                src={`${BACKEND_URL}${product.image}`}
                alt={product.name}
                className="img-fluid"
                style={{ 
                  width: '100%',
                  height: '500px',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${BACKEND_URL}/images/default.png`;
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/shop">Tienda</a></li>
                <li className="breadcrumb-item"><a href={`/shop?category=${product.category}`}>{product.category}</a></li>
                <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
              </ol>
            </nav>
            <h1 className="mb-4">{product.name}</h1>
            <p className="text-muted mb-2">Categoría: {product.category}</p>
            <h3 className="mb-4">$ {formatPrice(product.price)}</h3>
            <div className="mb-4">
              <h5>Descripción:</h5>
              <p>{product.description}</p>
            </div>
            <div className="product-actions">
              <button
                className="btn w-100 mb-3"
                style={{ backgroundColor: 'var(--primary)', color: 'white', height: '50px' }}
                onClick={() => {
                  addToCart(product);
                  handleShowCart();
                }}
              >
                Agregar al carrito
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                style={{ height: '50px' }}
                onClick={() => navigate('/shop')}
              >
                Seguir comprando
              </button>
            </div>
            <div className="mt-5 pt-4 border-top">
              <div className="text-center text-muted" style={{ fontSize: '0.9rem' }}>
                <p className="mb-2">
                  <strong>Tu pedido será entregado entre:</strong><br/>
                  1 a 4 días hábiles máximo.
                </p>
                <p className="mb-0">
                  Tenemos envío GRATIS a Colombia, por compras superiores o iguales a $200.000 pesos.*
                <br/>
          <small style={{ fontSize: '0.8rem' }}>Aplican T&C.</small>
        </p>
      </div>
    </div>
          </div>
        </div>
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
    </>
  );
};

export default ProductDetails;