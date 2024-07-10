import { Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext, useState, useEffect } from "react";
import { getProductData } from "../productsStore";

function CartProduct(props) {

  const [productData, setProductData] = useState();
  const id = props.id;
  const quantity = props.quantity;
  useEffect(() => {
    async function loadData() {
      const productData = await getProductData(id);
      setProductData(productData);
    }
    loadData();

  }, [])
  const cart = useContext(CartContext);
  if (!productData) {
    return (
      <div>Loading</div>
    )
  }
  // console.log("productData.title from CartPRoduct: ", productData);



  return (

    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>
      <Button size="sm"
        onClick={() => cart.deleteFromCart(id)}>Remove</Button>

    </>

  )


}


export default CartProduct;