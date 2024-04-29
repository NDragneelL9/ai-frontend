import React from 'react';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import ShoppingCartPage from './components/ShoppingCartPage';
import ProductsSection from './components/ProductsSections';
import { cartItems } from './signals/signals';
import PaymentPage from './components/PaymentPage';
import UserProfilePage from './components/UserProfilePage';
import { Order } from './components/Order';
import './App.css';


const App = () => (
  <BrowserRouter>
    <div>
      <NavBar cartItems={cartItems}/>
      <Routes>
        <Route index path="/" element={<ProductsSection cartItems={cartItems}/>} />
        <Route path="/profile" element={<UserProfilePage/>} />
        <Route path="/cart" element={<ShoppingCartPage cartItems={cartItems}/>} />
        <Route path="/payments/:orderId" element={<PaymentPage/>} />
        <Route path="/order/:orderId" element={<Order/>} />
      </Routes>
      <Footer/>
    </div>
  </BrowserRouter>
);

export default App;