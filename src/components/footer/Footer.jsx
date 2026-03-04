import React from 'react';

const Footer = () => {
    return (
        
        <footer className="bg-dark text-white text-center py-5">
            <div className="container">
                <p className="mb-5">&copy; 2024 Strawberry-Makeup. Todos los derechos reservados.</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="text-white mx-3">
                        <i className="bi bi-facebook"></i> Facebook
                    </a>
                    <a href="#" className="text-white mx-3">
                        <i className="bi bi-tiktok"></i> TikTok
                    </a>
                    <a href="#" className="text-white mx-3">
                        <i className="bi bi-instagram"></i> Instagram
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
