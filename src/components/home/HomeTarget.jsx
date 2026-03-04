import React from "react";
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as all from './../../assets/example/exportIMG';

const HomeTarget = () => {
    return (
        <div className="text-center ">
            <h2 className="mb-5" style={{ color: 'var(--success)' }}>NUESTRAS CATEGORIAS DE PRODUCTOS</h2>
            <div className="container">
                <div id="homeTargetCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">

                        {/* <!-- Carousel Item 1 --> */}

                        <div className="carousel-item active">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.sixteen} className="card-img" alt="image1" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">SKINCARE</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.two} className="card-img" alt="sombrasimg" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">SOMBRAS</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.three} className="card-img" alt="delineadorimg" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">DELINEADORES</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Carousel Item 2 --> */}

                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.four} className="card-img" alt="pestañinasimg" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">PESTAÑINAS</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.five} className="card-img" alt="Illustration of a notebook with a rainbow and children playing" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">BASES</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.six} className="card-img" alt="01" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">POLVOS</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Carousel Item 3 --> */}

                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.seven} className="card-img" alt="pestañinasimg" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">CORRECTORES</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.eight} className="card-img" alt="Illustration of a notebook with a rainbow and children playing" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">RUBORES</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.fourteen} className="card-img" alt="01" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">ILUMINADORES</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Carousel Item 4 --> */}

                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.nine} className="card-img" alt="pestañinasimg" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">BROCHAS</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.ten} className="card-img" alt="Illustration of a notebook with a rainbow and children playing" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">PESTAÑAS</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.eleven} className="card-img" alt="01" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">CEJAS</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Carousel Item 5 --> */}

                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.twelve} className="card-img" alt="pestañinasimg" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">LABIOS</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.thirteen} className="card-img" alt="Illustration of a notebook with a rainbow and children playing" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">PRIMER Y FIJADOR</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4 mb-4">
                                    <div className="card text-white">
                                        <img src={all.fifteen} className="card-img" alt="01" />
                                        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="card-title font-weight-bold">ACCESORIOS</h2>
                                            <button className="btn btn-outline-light">Comprar ahora</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#homeTargetCarousel" data-bs-slide="prev">
                        <span className="fas fa-chevron-left fa-2x" style={{ color: 'var(--ligth)' }} aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next " type="button" data-bs-target="#homeTargetCarousel" data-bs-slide="next">
                        <span className="fas fa-chevron-right fa-2x" style={{ color: 'var(--ligth)', marginLeft: '50px' }} aria-hidden="true"></span>
                        <span className="visually-hidden"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeTarget;