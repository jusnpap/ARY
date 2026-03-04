const Contact = () => {
    return (
        <div className='py-5'>
            <div className="container bg-light py-4">
                <div className="row mb-5">
                    <div className="col-md-4 mb-4">
                        <div className="card text-center h-100">
                            <div className="card-body">
                                <i className="fas fa-map-marker-alt fa-3x mb-3" style={{color: 'var(--primary)'}}></i>
                                <h5 className="card-title">Ubicación</h5>
                                <p className="card-text">Chinchina, Caldas</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center h-100">
                            <div className="card-body">
                                <i className="fas fa-envelope fa-3x mb-3" style={{color: 'var(--primary)'}}></i>
                                <h5 className="card-title">Email</h5>
                                <p className="card-text">strawberrymakeupstore@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center h-100">
                            <div className="card-body">
                                <i className="fas fa-phone fa-3x mb-3" style={{color: 'var(--primary)'}}></i>
                                <h5 className="card-title">Teléfono</h5>
                                <p className="card-text">+57 3235275634</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4 mt-4">
                        <h2 className="mb-4">COMUNICATE CON NOSOTROS</h2>
                        <p className="mb-4">Hola. Siempre es un gusto saludarte, cuentanos con este formulario como podemos podemos ayudarte o si necesitas algo haznoslo saber, para nosotros es un gusto atenderte.</p>
                        <form>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="NOMBRE" required />
                                </div>
                                <div className="col mt-4">
                                    <input type="email" className="form-control" placeholder="CORREO ELECTRONICO" required />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="TELEFONO" required />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <textarea className="form-control" rows="4" placeholder="ENVIANOS UN MENSAJE...." required></textarea>
                            </div>
                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="acceptTerms"
                                    required
                                />
                                <label className="form-check-label" htmlFor="acceptTerms" style={{fontSize: '0.9rem'}}>
                                    Acepto los <a href="/terms" style={{color: 'var(--primary)'}}>términos y condiciones</a> y el <a href="/privacy" style={{color: 'var(--primary)'}}>tratamiento de datos personales</a>
                                </label>
                            </div>
                            <button type="submit" style={{background: 'var(--primary)', color: 'white'}} className="btn">ENVIAR</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-4 text-center">NUESTRAS REDES SOCIALES</h2>
                        <div className="card mb-3">
                            <div className="card text-center h-100">
                                <div className="card-body">
                                    <i className="fab fa-instagram fa-3x mb-3" style={{color: 'var(--primary)'}}></i>
                                    <h5 className="card-title">Instagram</h5>
                                    <p className="card-text">@strawberry_makeup05</p>
                                    <a href="https://www.instagram.com/strawberry_makeup05" target="_blank" rel="noopener noreferrer" 
                                       className="btn" style={{background: 'var(--primary)', color: 'white'}}>
                                        Síguenos
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card text-center h-100">
                                <div className="card-body">
                                    <i className="fab fa-tiktok fa-3x mb-3" style={{color: 'var(--primary)'}}></i>
                                    <h5 className="card-title">TikTok</h5>
                                    <p className="card-text">@strawberry_makeup05</p>
                                    <a href="https://www.tiktok.com/@strawberry_makeup05" target="_blank" rel="noopener noreferrer" 
                                       className="btn" style={{background: 'var(--primary)', color: 'white'}}>
                                        Síguenos
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-2">
                            <div className="card text-center h-100">
                                <div className="card-body">
                                    <i className="fab fa-facebook fa-3x mb-3" style={{color: 'var(--primary)'}}></i>
                                    <h5 className="card-title">Facebook</h5>
                                    <p className="card-text">Strawberry Makeup Store</p>
                                    <a href="https://www.facebook.com/strawberry_makeup05" target="_blank" rel="noopener noreferrer" 
                                       className="btn" style={{background: 'var(--primary)', color: 'white'}}>
                                        Síguenos
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;