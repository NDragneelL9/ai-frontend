import React from 'react';

const ProductsSection = ({cartItems}) => {

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '19.99',
      image: 'src/assets/product_1.png', // Replace with actual image path
    },
    {
      id: 2,
      name: 'Product 2',
      price: '29.99',
      image: 'src/assets/product_2.png', // Replace with actual image path
    },
    {
      id: 3,
      name: 'Product 3',
      price: '39.99',
      image: 'src/assets/product_3.jpg', // Replace with actual image path
    },
  ];

  const addToCart = (item) => {
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


  return (
    <section className="py-12 min-h-[75vh]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {(products && products.length > 0) && (
            products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 hover:border-gray-500">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover object-center" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;