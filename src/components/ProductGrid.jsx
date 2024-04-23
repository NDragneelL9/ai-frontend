import React from 'react';
import ProductCard from './ProductCard';
import HeroBanner from './HeroBanner';

const ProductGrid = ({ products }) => {
    return (
        <>
            <HeroBanner />
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </>
    );
};

export default ProductGrid;
