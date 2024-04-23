import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
  } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCartPage';
import UserProfile from './components/UserProfilePage';
import './App.css'

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '19.99',
    imageUrl: 'src/assets/product_1.png',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '29.99',
    imageUrl: 'src/assets/product_2.png',
  },
  {
    id: 3,
    name: 'Product 3',
    price: '39.99',
    imageUrl: 'src/assets/product_3.jpg',
  },
];

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<ProductGrid products={products} />} />
          <Route path="/cart" element={<ShoppingCart/>} />
          <Route path="/profile" element={<UserProfile/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;