import React from 'react';
import { currentUser, isLoggedIn, orders, payments } from "../signals/signals"
import UserAuthPage from './LoginPage';
import { googleLogout } from '@react-oauth/google';
import { nextMonthPayment } from '../helpers/dateHelper';
import { getOrderStatusColor, getOrderStatusText } from '../helpers/orderHelper';
import { Link } from 'react-router-dom';


const UserProfilePage = () => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const addressField = name.split('.')[1]; // Extract field name from nested address object
      currentUser.value = {
        ...currentUser.value,
        address: {
          ...currentUser.value.address,
          [addressField]: value
        }
      }
    } else {
      currentUser.value = {
        ...currentUser.value,
        [name]: value
      }
    }
  };

  const logOut = () => {
    googleLogout();
    currentUser.value = null
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code to handle form submission (e.g., update user profile)
    console.log('Form submitted:', currentUser.value);
  };

  if (!isLoggedIn.value) {
    return <UserAuthPage />
  }

  return (
    <div className="container mx-auto mt-8 min-h-[71vh]">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <img src={currentUser.value.profileImage} alt="profile-image" referrerPolicy="no-referrer" className="p-6 max-h-64 max-w-64" />
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 pr-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">First Name:</h3>
                <input
                  type="text"
                  name="firstName"
                  value={currentUser.value.firstName}
                  onChange={handleChange}
                  className="border border-gray-400 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Last Name:</h3>
                <input
                  type="text"
                  name="lastName"
                  value={currentUser.value.lastName}
                  onChange={handleChange}
                  className="border border-gray-400 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/3 pr-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Country:</h3>
                <input
                  type="text"
                  name="address.country"
                  value={currentUser.value.address.country}
                  onChange={handleChange}
                  className="border border-gray-400 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 pr-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">City:</h3>
                <input
                  type="text"
                  name="address.city"
                  value={currentUser.value.address.city}
                  onChange={handleChange}
                  className="border border-gray-400 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Street:</h3>
                <input
                  type="text"
                  name="address.street"
                  value={currentUser.value.address.street}
                  onChange={handleChange}
                  className="border border-gray-400 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Credit Card:</h3>
            <input
              type="text"
              name="creditCardInfo"
              value={currentUser.value.creditCardInfo}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-2 rounded-md w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Save Changes</button>
        </div>
      </form>
      <div className="bg-white rounded-lg shadow-md my-2 mx-2">
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 pr-4 my-4 mx-2">
            <h2 className="text-2xl font-semibold mb-4">User orders</h2>
            <div className="flex ml-2">
              {orders.value && orders.value.length > 0 && (
                orders.value.map(order => {
                  const orderPayments = payments.value.filter(payment => payment.orderId === order.id);
                  const totalPaid = orderPayments.reduce((amountPaid, payment) => {
                    return amountPaid + payment.amount
                  }, 0)
                  return (
                    <Link to={`/order/${order.id}`} key={order.id} state={{ ...order }} className="mr-2">
                      <div className="max-w-xs w-full rounded-lg overflow-hidden shadow-md ml-2 border border-gray-400">
                        <div className={`px-4 py-2 ${getOrderStatusColor(order.isClosed)} text-white text-center`}>
                          <h3 className="text-lg font-semibold">{getOrderStatusText(order.isClosed)}</h3>
                        </div>
                        <div className="p-4">
                          <p className="text-sm">Order number: {order.id}</p>
                          <p className="text-sm">Total price: ${order.totalAmount.toFixed(2)}</p>
                          <p className="text-sm">Remaining: ${(order.totalAmount - totalPaid).toFixed(2)}</p>
                          <p className="text-sm">Order date: {order.orderDate.substring(0, 10)}</p>
                          <p className="text-sm">Next payment: {nextMonthPayment().toISOString().substring(0, 10)}</p>
                        </div>
                      </ div>
                    </Link>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-2">
        <button onClick={logOut} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Log out</button>
      </div>
    </div>
  );
}

export default UserProfilePage;
