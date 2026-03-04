import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import logo from '../../assets/logo/strawberrymakeup.png';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  
  const BACKEND_URL = "http://localhost:8000";

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cartData.reduce((total, item) => total + (item.quantity || 0), 0);
      setCartItemCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/categories`);
      console.log("Categorías cargadas:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <header className="py-1 border-bottom" style={{ backgroundColor: 'var(--success)' }}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <button
            className="navbar-toggler order-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand mx-auto order-2 order-lg-1" to="/">
            <img src={logo} alt="Logo" style={{ height: '80px' }} />
          </Link>

          <div className="d-flex order-3 d-lg-none">
            <Link className="nav-link me-2" to="/search">
              <i className="bi bi-search fs-5"></i>
            </Link>
            <Link className="nav-link me-1" to="/admin">
              <i className="bi bi-person-fill fs-4"></i>
            </Link>
            <Link className="nav-link position-relative" to="/shopcart">
              <i className="bi bi-cart-fill fs-5"></i>
              {cartItemCount > 0 && (
                <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="collapse navbar-collapse order-4 order-lg-2" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/shop">Tienda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/contact">Contacto</Link>
              </li>
              <li className="nav-item dropdown">
                <Link 
                  className="nav-link fw-bold dropdown-toggle" 
                  to="#" 
                  id="navbarDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Categorías
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <li key={index}>
                        <button 
                          className="dropdown-item" 
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li><span className="dropdown-item">No hay categorías disponibles</span></li>
                  )}
                </ul>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav d-none d-lg-flex order-lg-3">
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                <i className="bi bi-search fs-5"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                <i className="bi bi-person-fill fs-5"></i>
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/shopcart">
                <i className="bi bi-cart-fill fs-5"></i>
                {cartItemCount > 0 && (
                  <span className="position-absolute top-80 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;