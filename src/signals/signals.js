import { effect, signal, computed } from "@preact/signals-react";
export const LOCAL_STORAGE_KEY = "cartItems"
export const PAYMENT_LOCAL_STORAGE_KEY = "payments"
export const ORDERS_LOCAL_STORAGE_KEY = "orders"
export const USER_LOCAL_STORAGE_KEY = "currentUser"

// Auth signals

export const currentUser = signal(getUserFromStorage());
function getUserFromStorage() {
  const currentUser = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return currentUser ? JSON.parse(currentUser) : null;
};

effect(() => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(currentUser.value));
})

//derived state based on whether a user exists
export const isLoggedIn = computed(() => {
  return !!currentUser.value;
});

// CART signals
export const cartItems = signal(getCartFromStorage());
function getCartFromStorage() {
  const cartItems = localStorage.getItem(LOCAL_STORAGE_KEY);
  return cartItems ? JSON.parse(cartItems) : [];
};

effect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems.value));
})

// Calculate total price of all items in the cart
export const totalPrice = cartItems.value.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);


// ORDER signals
export const orders = signal(getOrdersFromStorage());
function getOrdersFromStorage() {
  const orders = localStorage.getItem(ORDERS_LOCAL_STORAGE_KEY);
  return orders ? JSON.parse(orders) : [];
};

effect(() => {
  localStorage.setItem(ORDERS_LOCAL_STORAGE_KEY, JSON.stringify(orders.value));
})
// Payment signals

export const payments = signal(getPaymentsFromStorage());
function getPaymentsFromStorage() {
  const payments = localStorage.getItem(PAYMENT_LOCAL_STORAGE_KEY);
  return payments ? JSON.parse(payments) : [];
};