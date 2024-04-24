import React from 'react';
import { totalPrice, LOCAL_STORAGE_KEY } from '../signals/signals';
import { useNavigate } from "react-router-dom";
import { ORDERS_CREATE_URL } from '../helpers/constants';

const ShoppingCartPage = ({ cartItems }) => {
  const navigate = useNavigate();

  const clearCart = () => {
    cartItems.value = [];
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const startPayment = async () => {
    try {
      const response = await fetch(ORDERS_CREATE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              totalAmount: totalPrice,
              orderItems: cartItems.value,
              orderDate: new Date().toISOString(),
          })
        });
        if(response.ok) {
          order.value = await response.json();
          navigate("/payment");
        }
    } catch (error) {
      console.error(error.message)
    } finally {
      // Navigate to payment page for demo purposes
      navigate("/payment");
    }
  };

  return (
    <div className="container mx-auto mt-8  min-h-[75vh]">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {(cartItems.value && cartItems.value.length > 0) ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cartItems.value.map(item => (
              <div key={item.id} className="bg-white p-4 rounded shadow-md max-w-96 border-2 border-blue-400">
                <img src={item.imageUrl} alt={item.productName} className="w-64 h-32 object-cover object-center" />
                <h3 className="text-lg font-semibold mb-2">{item.productName}</h3>
                <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
              </div>
            )
            )}
          </div>
          <div className="my-4">
            <h3 className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none" onClick={() => startPayment()}>Checkout</button>
            <button 
                className="bg-gray-900 text-white px-4 py-2 ml-2 rounded-md hover:bg-gray-800 focus:outline-none" 
                onClick={() => clearCart()}>Clear cart
            </button>
          </div>
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
