import React from 'react';
import { LOCAL_STORAGE_KEY } from '../signals/signals';

const ShoppingCartPage = ({ cartItems }) => {

  const clearCart = () => {
    cartItems.value = [];
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };


  console.info(cartItems.value);

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.value.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);

  return (
    <div className="container mx-auto mt-8  min-h-[75vh]">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {(cartItems.value && cartItems.value.length > 0) ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cartItems.value.map(item => (
              <div key={item.id} className="bg-white p-4 rounded shadow-md">
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover object-center" />
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
              </div>
            )
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none">Checkout</button>
          </div>
          <button onClick={() => clearCart()}>Clear cart</button>
        </>
      ) : (
        <div className="mt-4">
          <h3 className="text-2xl font-semibold">Your cart is empty</h3>
        </div>
      )}
    </div>
  );
}

export default ShoppingCartPage;
