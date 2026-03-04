import React from "react";
import { Link } from "react-router-dom";

const Homeads = () => {
    return (
        <div className="promo-section py-5">
            <div className="container">
                <h2 className="section-title text-center mb-5">Ofertas Especiales</h2>
                <div className="row g-4">
                    {/* Banner Principal */}
                    <div className="col-lg-6">
                        <div className="promo-card main-banner">
                            <div className="promo-content">
                                <span className="promo-label">Nuevo</span>
                                <h2>Colección Primavera</h2>
                                <p className="mb-4">Descubre nuestra nueva colección de labiales y bases mate</p>
                                <Link to="/shop" className="btn btn-light">Comprar ahora</Link>
                            </div>
                        </div>
                    </div>

                    {/* Banners Secundarios */}
                    <div className="col-lg-6">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="promo-card skincare-banner">
                                    <div className="promo-content">
                                        <span className="promo-label">Oferta</span>
                                        <h3>Skincare</h3>
                                        <p>Hasta 30% OFF</p>
                                        <Link to="/category/skincare" className="stretched-link"></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="promo-card makeup-banner">
                                    <div className="promo-content">
                                        <span className="promo-label">Trending</span>
                                        <h3>Bases Mate</h3>
                                        <p>Nueva Colección</p>
                                        <Link to="/category/bases" className="stretched-link"></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="promo-card wide-banner">
                                    <div className="promo-content">
                                        <span className="promo-label">Edición Limitada</span>
                                        <h3>Paleta de Sombras</h3>
                                        <p>Descubre los nuevos tonos metálicos</p>
                                        <Link to="/category/palettes" className="btn btn-light">Ver más</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homeads;