
// Sample product data
// Generate random product names
const productNames = ['Shirt', 'Pants', 'Shoes', 'Hat', 'Sunglasses', 'Watch', 'Bag', 'Jacket', 'Dress', 'Jeans'];

// Function to generate a random integer between min and max (inclusive)
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random price between minPrice and maxPrice
const getRandomPrice = (minPrice, maxPrice) => {
    return (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
}

// Function to generate a random URL for the image
const getImageUrl = (productName) => {
    return `https://images.placeholders.dev/?width=200&height=200&text=${productName}&bgColor=black&textColor=blue`;
}

// Generate an array of 50 objects
export const fkProducts = Array.from({ length: 48 }, (_, index) => {
    const productName = productNames[getRandomInt(0, productNames.length - 1)];
    return {
        id: index + 1,
        productName: productName,
        price: getRandomPrice(10, 100),
        imageUrl: getImageUrl(productName)
    }
});