import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">PartiCash</h1>
        <div>
          <a href="/home" className="px-4">Home</a>
          <a href="/profile" className="px-4">Profile</a>
          <a href="/cart" className="px-4">Cart</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;