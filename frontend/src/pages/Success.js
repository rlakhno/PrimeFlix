
// Success.js
import '../App.css';
import React, { useEffect, useState } from 'react';
import { useSession } from '../SessionContext';
import axios from 'axios';

function Success() {
  const { session } = useSession();
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    let data = sessionStorage.getItem("items");
    if (data) {
      console.log("data from Success: ", data);
      try {
        const parsedData = JSON.parse(data);
        setItemsData(parsedData);

        parsedData.forEach(element => {
          console.log("element: ", element.id);
          if(element.id === 'price_1PY9gf1PxLOehmUIZoBke1ER') {

            console.log("element.id TRUE", element.id);
            // ................Update bubscription
            axios.put(`${process.env.REACT_APP_API_BASE_URL}api/subscription/${session.userId}`, {subscribed: true})
            .then(response => {
              // console.log('Subscription updated successfully:', response.data);
            })
            .catch(error => {
              console.error('Error updating subscription:', error.response ? error.response.data : error.message);

            })
            // ................Update bubscription 
          } else {
              console.log("element.id FALSE", element.id);
          }
        });

        // Send data to the backend
        axios.post(`${process.env.REACT_APP_API_BASE_URL}api/items`, { userId: session.userId, items: parsedData })
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
      <ul>
        {itemsData.map((item, index) => (
          <ul key={index}>
            ID: {item.id}, Quantity: {item.quantity}
          </ul>
        ))}
      </ul>
    </div>
  )
}

export default Success;