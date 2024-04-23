import React from 'react';
import {cartItems} from '../signals/signals';
import { LOCAL_STORAGE_KEY } from '../signals/signals';

export const addToCart = (item) => {
  const itemPresent = cartItems.value.find(it => it.id === item.id);
  if (!!itemPresent) {
    const filteredItems = cartItems.value.filter(it => it.id !== itemPresent.id);
    cartItems.value = [
      ...filteredItems,
      {...itemPresent, quantity: itemPresent.quantity + 1}
    ]
  } else {
    cartItems.value = [
      ...cartItems.value,
      {...item, quantity: 1}
    ];
  }
};

const clearCart = () => {
  cartItems.value = [];
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

function ShoppingCart() {
  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Cart Items</h3>
        <ul>
          {cartItems.value.map((item, index) => (
            <li key={index} className="py-2 px-2 my-2 border-2 border-blue-400 max-w-64">
              <img className="w-64 h-32 object-cover object-center" src={item.imageUrl} alt={item.name} />
              {item.name} - ${item.price} - quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log('payment process...')}>
            Checkout
        </button>
        <button
            className="mt-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => clearCart()}>
            Clear cart
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;