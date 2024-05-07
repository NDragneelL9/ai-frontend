
// Sample product data
// Generate random product names
const productNames = ['shirt', 'shoes', 'hat', 'sunglasses', 'watch', 'bag', 'jacket', 'dress', 'jeans'];

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
    return `src/assets/${productName}_${getRandomInt(1, 6)}.jpg`;
}

// Generate an array of 50 objects
export const fkProducts = Array.from({ length: 54 }, (_, index) => {
    const productName = productNames[getRandomInt(0, productNames.length - 1)];
    return {
        id: index + 1,
        productName: productName,
        price: getRandomPrice(10, 100),
        imageUrl: getImageUrl(productName)
    }
});