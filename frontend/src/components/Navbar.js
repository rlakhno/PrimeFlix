
import { Button, Navbar, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import  React, { useState, useContext } from "react";
import logo from './logo1.jpg';
import { CartContext } from '../CartContext';
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";
import { useSession } from '../SessionContext';
import axios from "axios";

const NavbarComponent = () => {

  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const { session, logout } = useSession();

   // Logout function
  //  const logout = async () => {
  //   try {
  //     // await axios.post('http://localhost:8080/logout');
  //     await axios.get('http://localhost:8080/logout'); 
  //     // Clear client-side session state or perform any cleanup if needed
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // };

  // Stripe checkout
  const checkout = async () => {
    await fetch('http://localhost:8080/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: cart.items })
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

  // const navigate = useNavigate();
  // const logout = () => {
  //   window.localStorage.setItem("isLoggedIn", false)
  //   navigate('/');
  // }

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/home">
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
        <Button onClick={logout} >Logout</Button>
        <Navbar.Toggle />
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
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase items
              </Button>
            </>
            :
            <h1>There are no items in your cart!</h1>
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;






// import { Button, Container, Navbar, Modal } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from "react";
// import logo from './logo1.jpg';
// import { CartContext } from '../CartContext';
// import { useContext } from 'react';
// import CartProduct from "./CartProduct";
// import { response } from "express";

// const NavbarComponent = () => {

//   const cart = useContext(CartContext);
//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   // Stripe checkout
//   const checkout = async () => {
//     await fetch('http://localhost:8080/checkout', {
//       method: "POST",
//       headers: {
//         'Content-Type': 'applicatio/json'
//       },
//       body: JSON.stringify({ items: cart.items })
//     }).then((response) => {
//       return response.json();
//     }).then((response) => {
//       if (response.url) {
//         //forwarding user to Stripe
//         window.location.assign(response.url);
//       }
//     });
//   }


//   const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

//   return (
//     <>
//       <Navbar expand="sm">

//         <Navbar.Brand href="/home">
//           <img
//             src={logo}
//             width="30"
//             height="30"
//             className="d-inline-block align-top"
//             alt="Logo"
//           /></Navbar.Brand>
//         <Navbar.Brand href="/home">Home</Navbar.Brand>
//         <Navbar.Brand href="/store">Store</Navbar.Brand>
//         <Navbar.Brand href="/videos">Videos</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
//         </Navbar.Collapse>

//       </Navbar>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Shopping Cart</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {productsCount > 0 ?
//             <>
//               <p>Items in your cart: </p>
//               {cart.items.map((currentProduct, index) => (
//                 <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
//               ))}
//               <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
//               <Button variant="success" onClick={checkout}>
//                 Purchase items
//               </Button>

//             </>
//             :
//             <h1>There are no items in your cart!</h1>
//           }
//         </Modal.Body>
//       </Modal>
//     </>

//   );
// };

// export default NavbarComponent;
