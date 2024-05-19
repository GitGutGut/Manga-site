import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';
import { useAuth } from '../components/authContext';

const Register = () => {
  const [formDataRegister, setFormData] = useState({
    e_mail: '',
    password: '',
    name: ''
  });

  const { authData, updateAuthData } = useAuth();
  const [error, setError] = useState();
  const isRegistered = authData.isLoggedIn;

  useEffect(() => {
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formDataRegister,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formDataRegister);
    await axios.post("http://localhost:8000/polls/user-registration/",
      formDataRegister
    ).then(response => {
      console.log('Response', response.data);
      updateAuthData({ isLoggedIn: true, username: formDataRegister.name })
    }).catch(error => {
      console.error('Error:', error.response.data);
      setError(error.response.data.message)
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
            {error && <label className='ErrorMessage'>{error}</label>}
        </div>
      )}
    </div>
  );
}

export default Register;