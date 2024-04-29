import React, { useState } from 'react';
import Navbar from './navbar';


const Register = () => {
  const [formDataRegister, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formDataRegister,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formDataRegister);
    // HANDLE BACKEND
  }


  return (
    <div className='home'>
      <Navbar />
      <div className='register'>
        <h2>Register</h2>

        <div className='username'>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder='Username'
            value={formDataRegister.username}
            onChange={handleChange}
          />
        </div>
        <div className='email'>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder='Email'
            value={formDataRegister.email}
            onChange={handleChange}
          />
        </div>
        <div className='password'>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={formDataRegister.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit"
          onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}

export default Register;