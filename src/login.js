import React, { useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';


const Login = () => {
    const [formDataLogin, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formDataLogin,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formDataLogin);
        // HANDLE BACKEND
    }


    return (
        <div className='home'>
            <Navbar />
            <div className='login'>
                <h2>Login</h2>
                <div className='email'>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={formDataLogin.email}
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
                <button type="submit"
                    onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
}

export default Login;