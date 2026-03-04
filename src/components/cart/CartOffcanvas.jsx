import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const CartOffcanvas = ({ show, handleClose, cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const BACKEND_URL = "http://localhost:8000";
  const envioGratis = 200000;
  const faltaParaEnvioGratis = envioGratis - subtotal;

  const getImageUrl = (imagePath) => {
    return imagePath ? `${BACKEND_URL}${imagePath}` : `${BACKEND_URL}/images/default.png`;
  };

  const handleFinalizarCompra = () => {
    handleClose();
    navigate("/shopcart");
  };

  return (
    <div
      className={`offcanvas offcanvas-end ${show ? "show" : ""}`}
      tabIndex="-1"
      style={{ visibility: show ? "visible" : "hidden" }}>
      <div className="offcanvas-header">
        <h5 className="cart-header">Productos del carrito</h5>
        <button
          type="button"
          className="btn-close"
          onClick={handleClose}
          aria-label="Close"></button>
      </div>
      <div className="cart-header-underline"></div>

      <div className="offcanvas-body">
        {cart.length > 0 ? (
          <>
            {/* Indicador de envío gratis */}
            <p className="text-center">
              Envío <strong>GRATIS</strong> si completas:{" "}
              <strong>$200.000</strong>
              <br />
              Te falta:{" "}
              <strong>${faltaParaEnvioGratis.toLocaleString()}</strong> para
              tener envío gratis
            </p>
            <div className="progress mt-2 mb-4" style={{ height: "5px" }}>
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min((subtotal / envioGratis) * 100, 100)}%`,
                  backgroundColor: "var(--primary)",
                }}
                role="progressbar"
                aria-valuenow={Math.min((subtotal / envioGratis) * 100, 100)}
                aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>

            {/* Productos en el carrito */}
            {cart.map((item) => (
              <div key={item.id} className="card cart-card mb-3">
                <div className="row g-0">
                  <div className="col-4">
                    <div className="img-container p-2">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="img-fluid rounded-start"
                        style={{
                          objectFit: "contain",
                          height: "100px",
                          width: "100%",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${BACKEND_URL}/images/default.png`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="card-body py-2">
                      <div className="d-flex justify-content-between align-items-start">
                        <p className="mb-1" style={{ fontWeight: "600" }}>
                          {item.brand}
                        </p>
                        <button
                          className="btn btn-sm"
                          onClick={() => removeFromCart(item.id)}
                          style={{ color: "var(--dark)" }}>
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                      <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                        {item.name}
                      </p>
                      <p className="text-dark" style={{ fontWeight: "600" }}>
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="quantity-control">
                        <button
                          className="btn btn-sm"
                          onClick={() => updateQuantity(item.id, -1)}>
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm"
                          onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Subtotal y acciones */}
            <div className="position-sticky bottom-0 bg-white pt-3 border-top">
              <div className=" pt-3">
                <h4 className="text-center ">
                  Subtotal: ${subtotal.toLocaleString()}
                </h4>
                <button
                  className="btn btn-rounded w-100 my-2"
                  style={{ backgroundColor: "var(--primary)", color: "#fff" }}
                  onClick={handleFinalizarCompra}>
                  Finalizar compra
                </button>
                <button
                  className="btn btn-outline-secondary btn-rounded w-100 pt-2"
                  onClick={handleClose}>
                  Seguir comprando
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-1 text-muted"></i>
            <p className="mt-3">Tu carrito está vacío.</p>
            <button
              className="btn"
              style={{ backgroundColor: "var(--primary)", color: "#fff" }}
              onClick={handleClose}>
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartOffcanvas;
