
import { Button, Navbar, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useContext, useEffect } from "react";
import Logo from "./LOGO";
import subscribedImage from '../images/subscribed.jpg'
import subscribeImage from '../images/subscribe.jpg'
import { CartContext } from '../CartContext';
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";
import { useSession } from '../SessionContext';
import '../App.css';
import axios from "axios";

const NavbarComponent = () => {
  const [subscribe, setSubscribe] = useState(false);
  const [image, setImage] = useState(subscribeImage);
  const { session, logout } = useSession();
  const [name, setName] = useState('');
  const cart = useContext(CartContext);
  // const { totalCost } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  // const navigate = useNavigate();
  
  useEffect(() => {
    const firstName = sessionStorage.getItem("name");
    const userId = sessionStorage.getItem("userId");
    console.log("firstName: ", firstName);
    if(firstName != null && firstName.length > 0){
      setName(firstName);
    }
    axios.get(`http://localhost:8080/api/${userId}/subscription`)
    .then(response => {
      console.log("Subscription response.data: ", response.data.response[0].subscribed);
      if (response.data.response[0].subscribed) {
        window.sessionStorage.setItem("subscription", "price_1PY9gf1PxLOehmUIZoBke1ER");
        setImage(subscribedImage);
      }
    })
    .catch(error => {
      console.log("Error message: ", error);
    })
    let subscription = sessionStorage.getItem("subscription");
    console.log("subscription: ", subscription);
    if (subscription === "price_1PY9gf1PxLOehmUIZoBke1ER") {
      setSubscribe(true);
      setImage(subscribedImage);
      console.log("subscribe is True: ", subscribe);
    } else {
      console.log("subscribe is FALSE: ", subscribe);
    }
  }, []);

  const removeName = () => {
    logout();
    setName('');
    setImage(subscribeImage);
  }

  // Stripe checkout
  const checkout = async () => {

    for(let i = 0; i < cart.items.length; i ++) {
      if(cart.items[i].id === 'price_1PY9gf1PxLOehmUIZoBke1ER') {
        window.sessionStorage.setItem("subscription", "price_1PY9gf1PxLOehmUIZoBke1ER");
      }
    }
    window.sessionStorage.setItem("items", JSON.stringify(cart.items));
    

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
      <Navbar expand="sm" className="navBar" >
        <Navbar.Brand href="/home" className="navbar-brand-with-padding">
          <Logo />
        </Navbar.Brand>
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Navbar.Brand href="/store">Store</Navbar.Brand>
        <Navbar.Brand href="/videos">Videos</Navbar.Brand>
        <Navbar.Brand href="/profile">Profile</Navbar.Brand>
        {name === '' ? ''
        : 
        <Navbar.Brand href="/profile">Hi <strong>{name}</strong></Navbar.Brand>
        }
        <Navbar.Toggle />
        <Button onClick={removeName} >Logout</Button>

        <Navbar.Brand href="/store" className="navbar-brand-with-padding">
          <img
            src={image}
            width="100"
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
            style={{ borderRadius: '10%' }}
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


