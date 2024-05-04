import React, { useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import { useAuth } from './authContext';

const Register = () => {
  const [formDataRegister, setFormData] = useState({
    e_mail: '',
    password: '',
    name: ''
  });

  const { authData, updateAuthData } = useAuth();
  const isRegistered = authData.isLoggedIn;

  const handleChange = (e) => {
    setFormData({
      ...formDataRegister,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formDataRegister);
    axios.post("http://localhost:8000/polls/user-registration/",
      formDataRegister
    ).then(response => {
      console.log('Response', response.data);
      updateAuthData({ isLoggedIn: true, e_mail: formDataRegister.e_mail })

    }).catch(error => {

      console.error('Error:', error);
    })
  }


  return (
    <div className='home'>
      <Navbar />
      {isRegistered ? (
      <div className='registered'>
      <h1>Welcome! You are succesfully registered.</h1>
      </div>
      ) : (
        <div className='register'>
          <h2>Register</h2>

          <div className='username'>
            <label>Username:</label>
            <input
              type="text"
              name="name"
              placeholder='Username'
              value={formDataRegister.name}
              onChange={handleChange}
            />
          </div>
          <div className='email'>
            <label>Email:</label>
            <input
              type="email"
              name="e_mail"
              placeholder='Email'
              value={formDataRegister.e_mail}
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
        </div>)}
    </div>
  );
}

export default Register;