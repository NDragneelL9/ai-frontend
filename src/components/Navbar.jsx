import React from 'react';
import { FaShoppingBag, FaUser } from "react-icons/fa";

const NavBar = ({cartItems}) => {

  const carItemsAmount = cartItems.value ? 
    cartItems.value.reduce((total, item) => total + item.quantity, 0) 
    : 0;

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div>
          <a href="/" className="flex items-center">
            <img src="src/assets/Logo.jpg" alt="Logo" className="h-16 mr-2" />
            <span className="text-xl font-bold">PartiCash</span>
          </a>
        </div>

        {/* Right-aligned content */}
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="mr-3">
            <input type="text" placeholder="Search" className="px-2 py-1 rounded-md border text-black border-gray-600 focus:outline-none" />
            <button className="bg-white text-gray-900 px-3 py-1 rounded-md ml-2 hover:bg-gray-100 focus:outline-none">Search</button>
          </div>

          {/* Shopping section */}
          <div className="flex space-x-2">
            <a href="/profile" className="hover:text-gray-300"><FaUser  size={25}/></a>
            <a href="/cart" className="hover:text-gray-300">
              <FaShoppingBag size={25}/>
              {cartItems.value && cartItems.value.length > 0 && (
              <span className="bg-red-500 text-white text-xs absolute rounded-full transform translate-x-1/2 -translate-y-1/2 px-2 py-1">
                {carItemsAmount}
              </span>
            )}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;