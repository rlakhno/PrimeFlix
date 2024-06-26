import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100" style={{ 
      backgroundImage: "url('https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg')", 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="bg-white p-4 rounded w-50 shadow-lg">
        <h2 className="text-center mb-4">Sign-up</h2>
        <form action="">
        <div className="mb-3 text-start">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" placeholder="Enter First Name" className="form-control rounded-0" />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" placeholder="Enter Last Name" className="form-control rounded-0" />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" placeholder="Enter Email" className="form-control rounded-0" />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" placeholder="Enter Password" className="form-control rounded-0" />
          </div>
          
          <button className="btn btn-success w-100 mb-2">Sign-up</button>
          <p className="text-center">Agree to the terms and conditions</p>
          <Link to="/" className="btn btn-outline-secondary w-100 bg-light rounded-0 text-decoratio-none">Login</Link>
        </form>
      </div>
    </div>
  );
    
}

export default Signup