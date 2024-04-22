import { effect, signal } from '@preact/signals-react';
export const LOCAL_STORAGE_KEY = 'cartItems'

export const cartItems = signal(getCartFromStorage());
function getCartFromStorage() {
  const cartItems = localStorage.getItem(LOCAL_STORAGE_KEY);
  return cartItems ? JSON.parse(cartItems) : [];
};

effect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems.value));
})