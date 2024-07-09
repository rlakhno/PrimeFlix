import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useSession } from "../SessionContext";

export const Profile = () => {

  const navigate = useNavigate();
  const { session } = useSession();
  useEffect(() => {
    let data = sessionStorage.getItem("valid");
    if (data === "false" || data === null) {
      navigate('/');
    }
  }, []);




  return (
    <div>
      <h2>
        Profile page
      </h2> 
      <p>first name: {session.firstName} , email: {session.email}</p>
    </div>
  )
}