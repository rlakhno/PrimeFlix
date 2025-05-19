import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "../SessionContext";
import axios from "axios";
import { format } from "date-fns";

export const Profile = () => {

  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();
  const { session } = useSession();
  useEffect(() => {
    let data = sessionStorage.getItem("valid");
    if (data === "false" || data === null) {
      navigate('/');
    }
  }, []);

  // Set Axios defaults
  axios.defaults.withCredentials = true;  
const handleOnClick = (event) => {
  event.preventDefault();
  const userId = session.userId;
  console.log("userId: ", userId);
  axios.post(`${process.env.REACT_APP_API_BASE_URL}api/profile`, { userId })
  .then(res => {
    console.log("RES from Profile: ", res.data);
    if(res.data) {
      setResponses(res.data.response);
      console.log("Response from DB Profile: ", res.data.response);
      console.log("Data from DB Profile: ", res.data.response.length);
    }
  })
  .catch(err => {
    console.error("Error from Profile: ");
  })

}


  return (
    <div className="video-library">
      <h2>
        Customer's Profile
      </h2> 
      <p>First Name: <span className="table-column">{session.firstName}</span> Email: <span className="table-column">{session.email}</span> </p>
      <br />
      <button onClick={handleOnClick}>View Purchases</button>
      <table className="purchase-table">
        <thead>
          <tr>
            <th className="table-header">Product</th>
            <th className="table-header">Image</th>
            <th className="table-header">Date</th>
            <th className="table-header">Price</th>
            <th className="table-header">Qty</th>
            <th className="table-header">Total</th>
          </tr>
        </thead>
        <tbody>
        {responses.map((response, index) => (
        <tr key={index}>
          <td className="table-column">{response.title}</td>
          <td className="table-column">
            <img src={response.image} alt="Product" className="product-image" />
          </td>
          <td className="table-column">{format (new Date(response.purchase_date), 'MMMM dd, yyyy')}</td>
          <td className="table-column">${response.price}</td>
          <td className="table-column">x {response.quantity}</td>
          <td className="table-column">${response.price * response.quantity}</td>
      </tr>
       ))}
        </tbody>
      </table>
     
    </div>
  )
}