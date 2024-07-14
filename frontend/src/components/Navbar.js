
import { Button, Navbar, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useContext, useEffect } from "react";
import logo from './logo1.jpg';
import subscribe from '../images/subscribe.jpg'
import { CartContext } from '../CartContext';
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";
import { useSession } from '../SessionContext';
import axios from "axios";

const NavbarComponent = () => {
  const { session, logout } = useSession();
  const [name, setName] = useState();
  const cart = useContext(CartContext);
  // const { totalCost } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  

  const removeName = () => {
    logout()
    setName('')
  }

  // Stripe checkout
  const checkout = async () => {
    window.sessionStorage.setItem("items", JSON.stringify(cart.items));
    // .................................new
    // await axios.post('http://localhost:8080/items', { withCredentials: true, data:  { items: cart.items } });


    await fetch('http://localhost:8080/items', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: cart.items })
    })
    // ..............................

    console.log("cart.items Navbar: ", cart.items);
    await fetch('http://localhost:8080/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: cart.items, email: session.user })
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          // Forwarding user to Stripe
          window.location.assign(response.url);
        }
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
      });
  }

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/home" className="navbar-brand-with-padding">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Navbar.Brand href="/store">Store</Navbar.Brand>
        <Navbar.Brand href="/videos">Videos</Navbar.Brand>
        <Navbar.Brand href="/profile">Profile</Navbar.Brand>
        {/* <Button onClick={removeName} >Logout</Button> */}
        <Navbar.Brand href="/profile">Hi <strong>{session.firstName} {session.id}</strong></Navbar.Brand>
        <Navbar.Toggle />
        <Button onClick={removeName} >Logout</Button>
        <Navbar.Brand href="/home" className="navbar-brand-with-padding">
          <img
            src={subscribe}
            width="90"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ?
            <>
              <p>Items in your cart: </p>
              {cart.items.map((currentProduct, index) => (
                <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
              ))}
              {/* <h1>Total: {cart.getTotalCost().toFixed(2)}</h1> */}
              <h1>Total: {cart.totalCost}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase items
              </Button>
            </>
            :
            <h3>There are no items in your cart! 👀</h3>
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;


