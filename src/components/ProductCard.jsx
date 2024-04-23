import React from 'react';
import { addToCart } from './ShoppingCartPage';

const ProductCard = ({ id, name, price, imageUrl }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full h-64 object-cover object-center" src={imageUrl} alt={name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">
                    ${price}
                </p>
                <button
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => addToCart({ id, name, price, imageUrl })}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;