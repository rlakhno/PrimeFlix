// Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import validate from './LoginValidation';
import axios from 'axios';

function Login() {

  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Set Axios defaults
  axios.defaults.withCredentials = true;

  //  Authorization
  useEffect(() => {
    let data = sessionStorage.getItem("valid");
    if (data === "true" ) {
      navigate('/home');
    }
  }, [])
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  // Set Axios defaults
  axios.defaults.withCredentials = true;

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validate(values);
    if (validation.isError) {
      setErrors(validation.messages);
      return
    }
    axios.post('${API_BASE_URL}login', values)
      .then(res => {
        console.log("Login Response: ", res.data);
        if (res.data.valid) {
          if(res.data.userFirstName.length > 0) {
            window.sessionStorage.setItem("name", res.data.userFirstName);
            window.sessionStorage.setItem("userId", res.data.userId);
          }
          window.sessionStorage.setItem("valid", true);
          navigate('/home');

        }
      })
      .catch(err => {
        alert("⛔ Invalid Credentials!");
        console.log(err);
      });

  }


  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100" style={{
      backgroundImage: "url('/3d-cinema.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="bg-white p-4 rounded w-50 shadow-lg">
        <h2 className="text-center mb-4">Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" placeholder="Enter Email" name='email' onChange={handleInput} className="form-control rounded-0" />
            {errors.email &&
              <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" placeholder="Enter Password" name='password' onChange={handleInput} className="form-control rounded-0" />
            {errors.password &&
              <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className="btn btn-success w-100 mb-2">Login</button>
          <p className="text-center">Agree to the terms and conditions</p>
          <Link to="/signup" className="btn btn-outline-secondary w-100 bg-light rounded-0 text-decoratio-none">Create Account</Link>
        </form>
      </div>
    </div>
  );



}

export default Login;
