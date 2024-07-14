
//ProductCart.js
import { Card, Button, Form, Row, Col, FormLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import { useContext } from 'react';

// props.product is the product we are selling
function ProductCard(props) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);

  return (
    <Card className="product-card h-100" style={{ width: '15rem' }}>
      <Card.Img src={product.image} variant="top" className="card-img-top" style={{ height: '190px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {product.title === "Subscription" ? <Card.Text>Enjoy Videos ✅</Card.Text> : <Card.Text>In stock: {product.quantity}</Card.Text>}
        {productQuantity > 0 ?
          <>
            <Form as={Row}>
                <Form.Label column="true" sm="6">
                  In Cart: {productQuantity}
                   
                </Form.Label>
                {product.title === "Subscription" ? "" :
                <Col sm="6" className="d-flex align-items-center justify-content-end">
                  <Button sm="6" 
                  onClick={() => cart.addOneToCart(product.id) } className='mx-2'>+</Button>
                  <Button sm="6" 
                  onClick={() => cart.removeOneFromCart(product.id) }className='mx-2'>-</Button>
                </Col>}
            </Form>
        
            <Button variant='danger' 
            onClick={() => cart.deleteFromCart(product.id) }
            className='my-2'>Remove From Cart</Button>

          </>
          :
          <Button variant='primary'
            onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
        }

      </Card.Body>
    </Card>
  )

}

export default ProductCard;