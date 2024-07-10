
import { Row, Col } from 'react-bootstrap';
import { fetchProductData, productsArray } from '../productsStore';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Store() {
  const navigate = useNavigate();
  const [productsArray, setProductsArray] = useState([]);
  let productsArray1 = [];
  let array = [];

  
  async function makeProductArray() {
    const products = await fetchProductData();
    setProductsArray(products);

  }


  //  Authorization
  useEffect(() => {
    makeProductArray();

    let data = sessionStorage.getItem("valid");
    if (data === "false" || data === null) {
      navigate('/');
    }
  }, [])
  return (
    <>
      <h1 align="center" className='p-3'>Welcome to PrimeFlix store!</h1>
      <Row xs={1} md={3} className='g-4'>
        {productsArray.map((product, index) => (
          <Col align="center" key={index}>
            <ProductCard product={product} />
          </Col>
        ))}



      </Row>

    </>

  )
}

export default Store;