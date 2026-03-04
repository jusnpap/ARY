import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import MasterPage from './pages/MasterPage';


const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<MasterPage.Home/>} />
                <Route path='/shop' element={<MasterPage.Shop/>} />
                <Route path='/product/:id' element={<MasterPage.ProductPage/>} />
                <Route path='/contact' element={<MasterPage.Contact/>} />
                <Route path='/shopcart' element={<MasterPage.ShopCart/>} />
                <Route path='/admin' element={<MasterPage.admin/>} />
                <Route path='/admin/dashboard' element={<MasterPage.dashboard/>} />
            </Routes>
            <Footer />
        </div>
    );
};
export default App;