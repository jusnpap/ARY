import React from 'react';

const Hometext = () => {
    return (
        <div className="container my-5 py-3">
            <div className="row text-center align-items-start">
                <div className="col-md-4 mb-5">
                    <div className="mx-auto content-box" style={{ maxWidth: '80%' }}>
                        <i className="fas fa-truck fa-2x mb-3" style={{color: 'var(--primary)'}}></i>
                        <h2 style={{color: 'var(--success)', marginBottom: '1rem' }}>ENVÍOS 100% SEGUROS</h2>
                        <p style={{ 
                            maxWidth: '80%', 
                            margin: '0 auto', 
                            marginBottom: '1.5rem',
                            lineHeight: '1.6'
                        }}>
                            Realizamos envíos a todo el país de manera segura y confiable. 
                            Ofrecemos diferentes métodos de pago incluyendo contraentrega para 
                            tu mayor comodidad y tranquilidad.
                        </p>
                        <div style={{ 
                            width: '50px', 
                            height: '3px', 
                            backgroundColor: 'var(--primary)', 
                            margin: '0 auto' 
                        }}></div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                    <div className="mx-auto content-box" style={{ maxWidth: '97%' }}>
                        <i className="fas fa-star fa-2x mb-3" style={{color: 'var(--primary)'}}></i>
                        <h2 style={{color: 'var(--success)', marginBottom: '1rem' }}>PRODUCTOS PREMIUM</h2>
                        <p style={{ 
                            maxWidth: '80%', 
                            margin: '0 auto',
                            marginBottom: '1.5rem',
                            lineHeight: '1.6',
                        }}>
                            Trabajamos con las mejores marcas del mercado para garantizar 
                            productos de alta calidad. Cada artículo es cuidadosamente 
                            seleccionado para brindarte la mejor experiencia en belleza.
                        </p>
                        <div style={{ 
                            width: '50px', 
                            height: '3px', 
                            backgroundColor: 'var(--primary)', 
                            margin: '0 auto' 
                        }}></div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                    <div className="mx-auto content-box" style={{ maxWidth: '90%' }}>
                        <i className="fas fa-tags fa-2x mb-3" style={{color: 'var(--primary)'}}></i>
                        <h2 style={{color: 'var(--success)', marginBottom: '1rem' }}>VENTA MAYORISTA Y MINORISTA</h2>
                        <p style={{ 
                            maxWidth: '80%', 
                            margin: '0 auto',
                            marginBottom: '1.5rem',
                            lineHeight: '1.6'
                        }}>
                            Precios especiales para compras al por mayor. Descubre nuestros 
                            paquetes y promociones exclusivas para distribuidores y 
                            profesionales de la belleza.
                        </p>
                        <div style={{ 
                            width: '50px', 
                            height: '3px', 
                            backgroundColor: 'var(--primary)', 
                            margin: '0 auto' 
                        }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hometext;