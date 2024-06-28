
import { createContext, useState } from "react";
import { productsArray } from "./productsStore";

// Contex (catr, addToCart, removeCart)
// Provider -> gives our React app access to all the things in our context

const CartContext = createContext({
  item: [],
  
});

