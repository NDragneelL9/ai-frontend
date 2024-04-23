import React from 'react';

const HeroBanner = () => {
    return (
        <div className="bg-blue-200 text-center p-12">
            <h2 className="text-3xl font-bold mb-2">Welcome to Online Shop</h2>
            <p className="mb-4">Find the best products for the best prices!</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Shop Now
            </button>
        </div>
    );
};

export default HeroBanner;
