import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SignupValidation from './SignupValidation'

function Signup() {

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(SignupValidation(values));

  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100" style={{
      backgroundImage: "url('https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="bg-white p-4 rounded w-50 shadow-lg">
        <h2 className="text-center mb-4">Sign-up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input 
            type="text" 
            placeholder="Enter First Name" 
            name='firstName' 
            onChange={handleInput} 
            className="form-control rounded-0" />
            {errors.firstName && 
            <span className='text-danger'>{errors.firstName}</span>}
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" placeholder="Enter Last Name" name='lastName' onChange={handleInput} className="form-control rounded-0" />
            {errors.lastName && 
            <span className='text-danger'>{errors.lastName}</span>}
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" placeholder="Enter Email" name='email' onChange={handleInput} className="form-control rounded-0" />
            {errors.email && 
            <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" placeholder="Enter Password" name='password' onChange={handleInput} className="form-control rounded-0" />
            {errors.password && <span className='text-denger'>{errors.password}</span>}
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