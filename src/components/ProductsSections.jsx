import React, { useState } from 'react';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import { fkProducts } from '../helpers/seeds';

const ProductsSection = ({ cartItems }) => {
  const products = useSignal([]);

  const loadProducts = async () => {
    try {
      // TODO: Comment until integration with backend
      // const response = await fetch(PRODUCTS_GET_URL); // Replace with your API endpoint
      // if (response) {
      //   products.value = await response.json();
      // }
    } catch (error) {
      console.error(error.message)
    } finally {
      // load fake products if no api available
      if (products.value.length === 0) {
        products.value = fkProducts;
      }
    }
  };

  useSignalEffect(() => {
    loadProducts();
  })

  const addToCart = (item) => {
    const itemPresent = cartItems.value.find(it => it.id === item.id);
    if (!!itemPresent) {
      const filteredItems = cartItems.value.filter(it => it.id !== itemPresent.id);
      cartItems.value = [
        ...filteredItems,
        { ...itemPresent, quantity: itemPresent.quantity + 1 }
      ]
    } else {
      cartItems.value = [
        ...cartItems.value,
        { ...item, quantity: 1 }
      ];
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Function to get products for the current page
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.value.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="py-12 min-h-[71vh]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {getCurrentPageProducts().map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-400 hover:border-gray-500">
              <img src={product.imageUrl} alt={product.productName} className="w-full h-32 object-cover object-center" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(products.value.length / productsPerPage) }, (_, i) => (
            <button key={i} className={`mx-2 py-2 px-4 rounded-md border ${currentPage === i + 1 ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} hover:bg-gray-200 focus:outline-none`} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;