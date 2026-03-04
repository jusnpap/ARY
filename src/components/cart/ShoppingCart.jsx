import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [includeShipping, setIncludeShipping] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    document: '',
    phone: '',
    city: '',
    address: '',
    notes: ''
  });

  const BACKEND_URL = "http://localhost:8000";
  const SHIPPING_COST = 10000;
  const FREE_SHIPPING_THRESHOLD = 200000;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getImageUrl = (imagePath) => {
    return imagePath ? `${BACKEND_URL}${imagePath}` : `${BACKEND_URL}/images/default.png`;
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

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        customerInfo: shippingInfo,
        products: cart,
        subtotal,
        shipping: subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST,
        total
      };

      // Aquí iría la llamada al backend para procesar el pedido
      await axios.post(`${BACKEND_URL}/orders`, orderData);
      
      // Limpiar carrito y localStorage
      setCart([]);
      localStorage.removeItem('cart');
      
      // Redireccionar a página de éxito
      navigate('/order-success');
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = includeShipping && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_COST : 0;
  const total = subtotal + shippingCost;
  const progressPercentage = (subtotal / FREE_SHIPPING_THRESHOLD) * 100;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-center">Carrito</h2>
            <h2 className="text-center p-2" style={{ fontSize: "24px", fontWeight: "bold", color: "var(--primary)" }}>
              Tu Belleza No Tiene Precio!
            </h2>
            <div className="row">
              <div className="col-md-8">
                <div className="cart-items">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div key={item.id} className="cart-item d-flex justify-content-between align-items-center p-3 border-bottom">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="cart-item-img"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${BACKEND_URL}/images/default.png`;
                          }}
                        />
                        <div className="cart-item-details flex-grow-1 ms-3">
                          <h5>{item.name}</h5>
                          <p className="m-0">${item.price?.toLocaleString()}</p>
                        </div>
                        <div className="cart-item-quantity d-flex align-items-center">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, -1)}>
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, 1)}>
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-danger m-2"
                          onClick={() => removeFromCart(item.id)}>
                          X
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-4">
                      <p>Tu carrito está vacío</p>
                      <button
                        onClick={() => navigate('/shop')}
                        className="btn"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "white",
                        }}>
                        Ir a productos
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="cart-summary p-4 border rounded">
                  <h5>Totales del carrito</h5>
                  <p>Subtotal: ${subtotal.toLocaleString()}</p>

                  {subtotal > 0 && (
                    <>
                      <div className="progress mb-2">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${Math.min(progressPercentage, 100)}%`,
                            backgroundColor: "var(--primary)",
                          }}
                        ></div>
                      </div>
                      
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <div 
                        className="alert text-center" 
                        role="alert"
                        style={{ 
                          backgroundColor: 'rgba(255, 192, 203, 0.2)',
                          color: 'var(--primary)',
                          border: '1px solid var(--primary)'
                        }}
                      >
                        ¡Has desbloqueado el envío gratis! 🎉
                      </div>
                      ) : (
                        <>
                          <p>Envío GRATIS si completas: ${FREE_SHIPPING_THRESHOLD.toLocaleString()}</p>
                          <p>Te falta: ${remainingForFreeShipping.toLocaleString()} para tener envío gratis</p>
                          <p>Envío Nacional: ${SHIPPING_COST.toLocaleString()}</p>
                          <div className="form-check mb-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="includeShipping"
                              checked={includeShipping}
                              onChange={(e) => setIncludeShipping(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="includeShipping">
                              Incluir costo del envío
                            </label>
                          </div>
                        </>
                      )}

                      <h5>Total: ${total.toLocaleString()}</h5>
                      <div className="text-center">
                        <button
                          className="btn w-50 mt-3"
                          style={{
                            backgroundColor: "var(--primary)",
                            color: "white",
                          }}
                          onClick={handleNextStep}
                        >
                          Continuar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div className="shipping-info-container">
            <h3 className="mb-4">Información de Envío</h3>
            <form className="row g-3" onSubmit={(e) => {
              e.preventDefault();
              handleNextStep();
            }}>
              <div className="col-md-6">
                <label className="form-label">Nombre completo</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Número de documento</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={shippingInfo.document}
                  onChange={(e) => setShippingInfo({...shippingInfo, document: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input 
                  type="tel" 
                  className="form-control"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Ciudad</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Dirección de envío</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Notas adicionales (opcional)</label>
                <textarea 
                  className="form-control"
                  rows="3"
                  value={shippingInfo.notes}
                  onChange={(e) => setShippingInfo({...shippingInfo, notes: e.target.value})}
                ></textarea>
              </div>
              <div className="col-12 d-flex justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={handlePrevStep}
                >
                  Volver al carrito
                </button>
                <button 
                  type="submit" 
                  className="btn"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                  }}
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="shipping-info-container">
            <h3 className="mb-4 text-center">Resumen del Pedido</h3>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Información de Envío</h5>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p><strong>Nombre:</strong> {shippingInfo.name}</p>
                    <p><strong>Documento:</strong> {shippingInfo.document}</p>
                    <p><strong>Teléfono:</strong> {shippingInfo.phone}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Ciudad:</strong> {shippingInfo.city}</p>
                    <p><strong>Dirección:</strong> {shippingInfo.address}</p>
                    {shippingInfo.notes && (
                      <p><strong>Notas:</strong> {shippingInfo.notes}</p>
                    )}
                  </div>
                </div>

                <h5 className="card-title mb-4">Productos</h5>
                <div className="table-responsive mb-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toLocaleString()}</td>
                          <td>${(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Resumen de Costos</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Envío:</span>
                      <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? 
                        'GRATIS' : 
                        `$${SHIPPING_COST.toLocaleString()}`}</span>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between">
                      <strong>Total:</strong>
                      <strong>${total.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={handlePrevStep}
                  >
                    Volver
                  </button>
                  <button 
                    type="button" 
                    className="btn"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "white",
                    }}
                    onClick={handleSubmitOrder}
                  >
                    Confirmar Pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-3">
      <div className="container shopping-cart">
        <div className="checkout-steps mb-5">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-icon">
                <i className="bi bi-cart"></i>
              </div>
              <div className="step-label">Carrito</div>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-icon">
                <i className="bi bi-truck"></i>
              </div>
              <div className="step-label">Envío</div>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-icon">
                <i className="bi bi-check-circle"></i>
              </div>
              <div className="step-label">Confirmar</div>
            </div>
          </div>
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
};

export default ShoppingCart;