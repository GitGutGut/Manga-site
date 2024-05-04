import React, { useState } from 'react';
import Navbar from './navbar';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './authContext';

const Login = () => {
    const [formDataLogin, setFormData] = useState({
        e_mail: '',
        password: ''
    });
    const { authData, updateAuthData } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formDataLogin,
            [e.target.name]: e.target.value
        });
    }

    const checkIfAdministrator = async () => {
        await axios.get("http://localhost:8000/polls/user-login/",
            {
                params: {
                    e_mail: formDataLogin.e_mail
                }
            }
        ).then(response => {
            updateAuthData({ isAdministrator: response.data.administrator });
        }).catch(error => {
            console.error("Error fetching data:", error);
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formDataLogin);
        await axios.post("http://localhost:8000/polls/user-login/",
            formDataLogin
        ).then(response => {
            console.log('Response', response.data);
            updateAuthData({ isLoggedIn: true, e_mail: formDataLogin.e_mail });
            checkIfAdministrator()


        }).catch(error => {
            console.error('Error:', error.response.data.message);
        })
    }
    return (
        <div className='home'>
            <Navbar />
            {authData.isLoggedIn ? (
                <div className='login'>
                    <h2>Welcome! You are logged in.</h2>
                </div>
            ) : (
                <div className='login'>
                    <h2>Login</h2>
                    <div className='email'>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="e_mail"
                            placeholder='Email'
                            value={formDataLogin.e_mail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='password'>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={formDataLogin.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Link to='/register' className='register_link'>Not logged in?</Link>
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </div>
            )}
        </div>
    );
};


export default Login;