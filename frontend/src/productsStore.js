
// Coffee: price_1PX6XL1PxLOehmUImH80IHbR
// Sunglasses: price_1PX6mJ1PxLOehmUIbX85yFVG
// Camera: price_1PX6np1PxLOehmUI1bbQrTaZ 
// Subscription: price_1PY9gf1PxLOehmUIZoBke1ER


// ProductStore.js

import axios from 'axios';

let productsArray = [];

async function fetchProductData() {
  const response = await axios.get('http://localhost:8080/api/products');
  // console.log("response from ProductStore: ", response.data.products);
  if (response.data.products) {
    productsArray = response.data.products;
    const array = response.data.products;
    // console.log("productsArray from ProductStore: ", productsArray);
    return array;
  } else {
    console.log("⛔from ProductStore - fetchProductData: ", response.data);
    console.error('Error fetching product data:');
    return []
  }
}

// Function to get product data by id
async function getProductData(id) {
  const product = await fetchProductData();
  const productData = product.find(product => product.id === id);
  if(!productData) {
    console.log(`⛔from ProductStore - getProductData: for ID: ${id}`);
  }
  return productData;
}


export { getProductData, fetchProductData, productsArray }



// const productsArray = [

//   {
//     id: "price_1PX6XL1PxLOehmUImH80IHbR",
//     title: "Coffee",
//     price: 4.99
//   },

//   {
//     id: "price_1PX6mJ1PxLOehmUIbX85yFVG",
//     title: "Sunglasses",
//     price: 9.99
//   },

//   {
//     id: "price_1PX6np1PxLOehmUI1bbQrTaZ",
//     title: "Camera",
//     price: 39.99
//   },

//   {
//     id: "price_1PY9gf1PxLOehmUIZoBke1ER",
//     title: "Subscription",
//     price: 2.99

//   }


// ];

// function getProductData(id) {
//   let productData = productsArray.find(product => product.id === id)

//   if (productData == undefined) {
//     console.log("Product data does not exist for ID: " + id);
//   }
//   return productData;

// }

// export {productsArray, getProductData};