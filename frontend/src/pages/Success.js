
// Success.js
import '../App.css';
import React, { useEffect, useState } from 'react';
import { useSession } from '../SessionContext';
import axios from 'axios';

function Success() {
  const { session, logout } = useSession();
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    let data = sessionStorage.getItem("items");
    if (data) {
      console.log("data from Success: ", data);
      try {
        const parsedData = JSON.parse(data);
        setItemsData(parsedData);

        // Send data to the backend
        axios.post('http://localhost:8080/api/items', { userId: session.userId, items: parsedData })
          .then(response => {
            console.log('Data sent to the server:', response.data);
          })
          .catch(error => {
            console.error('There was an error sending the data!', error.response ? error.response.data : error.message);
          });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [session]);


  console.log("session Success: ", session);

  return (
    <div className="video-library">
      <h1>Thank you for your purchase! <b>{session.firstName}</b></h1>
      <h4>Customer's email: {session.email}, ID: {session.userId} </h4>
      <h2>Items Purchased:</h2>
      <ui>
        {itemsData.map((item, index) => (
          <ul key={index}>
            ID: {item.id}, Quantity: {item.quantity}
          </ul>
        ))}
      </ui>
    </div>
  )
}

export default Success;