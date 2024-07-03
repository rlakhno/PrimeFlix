
// Coffee: price_1PX6XL1PxLOehmUImH80IHbR
// Sunglasses: price_1PX6mJ1PxLOehmUIbX85yFVG
// Camera: price_1PX6np1PxLOehmUI1bbQrTaZ 
// Subscription: price_1PY9gf1PxLOehmUIZoBke1ER




const productsArray = [

  {
    id: "price_1PX6XL1PxLOehmUImH80IHbR",
    title: "Coffee",
    price: 4.99
  },

  {
    id: "price_1PX6mJ1PxLOehmUIbX85yFVG",
    title: "Sunglasses",
    price: 9.99
  },

  {
    id: "price_1PX6np1PxLOehmUI1bbQrTaZ",
    title: "Camera",
    price: 39.99
  },

  {
    id: "price_1PY9gf1PxLOehmUIZoBke1ER",
    title: "Subscription",
    price: 2.99

  }


];

function getProductData(id) {
  let productData = productsArray.find(product => product.id === id)

  if (productData == undefined) {
    console.log("Product data does not exist for ID: " + id);
  }
  return productData;

}

export {productsArray, getProductData};