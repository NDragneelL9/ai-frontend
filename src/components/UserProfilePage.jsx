import React, { useState } from 'react';

const user = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St, City, Country',
  creditCardInfo: '**** **** **** 1234',
};

function UserProfile() {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [address, setAddress] = useState(user.address);
  const [creditCard, setCreditCard] = useState(user.creditCardInfo);

  // This is just a utility function to censor the credit card number.
  const censorCard = (cardNumber) => {
    return cardNumber.replace(/\\d(?=\\d{4})/g, "*");
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="mb-6">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700">Credit Card</label>
        <input
          type="text"
          id="creditCard"
          name="creditCard"
          value={censorCard(creditCard)}
          onChange={(e) => setCreditCard(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          maxLength="16"
          placeholder="****-****-****-####"
        />
      </div>
      <div className="mb-6">
        <button className="mt-1 p-2 block w-full bg-blue-500 text-white font-bold border border-gray-300 rounded-md shadow-sm hover:border-indigo-800 sm:text-sm">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default UserProfile;