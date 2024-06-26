import React, { useState } from 'react';

const UserProfilePage = () => {
  // Sample user data (replace with actual user data)
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    address: {
      country: 'Country',
      city: 'City',
      street: '123 Main St',
    },
    creditCardInfo: '**** **** **** 1234',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const addressField = name.split('.')[1]; // Extract field name from nested address object
      setUser(prevUser => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value
        }
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code to handle form submission (e.g., update user profile)
    console.log('Form submitted:', user);
  };

  return (
    <div className="container mx-auto mt-8 min-h-[75vh]">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 pr-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">First Name:</h3>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Last Name:</h3>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
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
                  value={user.address.country}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 pr-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">City:</h3>
                <input
                  type="text"
                  name="address.city"
                  value={user.address.city}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Street:</h3>
                <input
                  type="text"
                  name="address.street"
                  value={user.address.street}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Credit Card:</h3>
            <input
              type="text"
              name="creditCardInfo"
              value={user.creditCardInfo}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default UserProfilePage;
