
import { PureComponent, createContext, useState } from "react";
import { productsArray, getProductData } from "./productsStore";

// Contex (catr, addToCart, removeCart)
// Provider -> gives our React app access to all the things in our context

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => { },
  addOneToCart: () => { },
  removeOneFromCart: () => { },
  deleteFromCart: () => { },
  getTotalCost: () => { }
});

export function CartProvider({ children }) {

  const [cartProducts, setCartProducts] = useState([]);

  //[ { id: 1, quantity: 2 }, {id: 2, quantity: 1} ]

  function getProductQuantity(id) {
    const quantity = cartProducts.find(product => product.id === id)?.quantity

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts(
        [
          ...cartProducts,
          {
            // when product is NOT in catr -> create new object in cart 
            id: id,
            quantity: 1
          }
        ]
      )
    } else {  //product is in cart
      // [ { id:1, quantityt: 3 }, { id:2, quantityt: 1  }, ] 
      // add to product id 2
      // [ { id:1, quantityt: 3 }, { id:2, quantityt: 2 -> (1 + 1)  }, ]
      setCartProducts(
        cartProducts.map(
          product =>
            // if condition
            product.id === id
              // if statement is true
              ? { ...product, quantity: product.quantity + 1 }
              // if statement if false
              : product
        )
      )
    }

  }


  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity == 1) {

      deleteFromCart(id);

    } else {
      //product is in cart
      // [ { id:1, quantityt: 3 }, { id:2, quantityt: 2  }, ] 
      // remove  product id 2
      // [ { id:1, quantityt: 3 }, { id:2, quantityt: 1 -> (1 - 1)  }, ]
      setCartProducts(
        cartProducts.map(
          product =>
            // if condition 'ternary operator'
            product.id === id
              // if statement is true
              ? { ...product, quantity: product.quantity - 1 }
              // if statement if false
              : product
        )
      )
    }

  }

  function deleteFromCart(id) {
    // filter; [] if an object meets a condition, add the object to array
    // [product1, product2, product3] if id === 2
    // return [product1, product3]
    setCartProducts(
      cartProducts =>
        cartProducts.filter(currentProduct => {
          return currentProduct.id != id;
        })
    )
  }



  function getTotalCost() {

    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += (productData.price * cartItem.quantity);
    });

    return totalCost;
  }


  const contextValue = {
    items: cartProducts, 
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost
  }

  return(
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )

}

export default CartProvider;
