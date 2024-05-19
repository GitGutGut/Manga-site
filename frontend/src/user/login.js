import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/authContext';

const Login = () => {
    const [formDataLogin, setFormData] = useState({
        e_mail: '',
        password: ''
    });
    const { authData, updateAuthData } = useAuth();
    const [error, setError] = useState();

    useEffect(() => {
        
    }, [error]);

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
            updateAuthData({ isAdministrator: response.data.administrator, username: response.data.username });
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
            updateAuthData({ isLoggedIn: true });
            checkIfAdministrator()


        }).catch(error => {
            console.error('Error:', error.response.data.message);
            setError(error.response.data.message)
        })
    }
    return (
        <div className='home'>
            <Navbar />
            {authData.isLoggedIn ? (
                <div className='login'>
                    <h1>Welcome! You are logged in.</h1>
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
                    {error && <label className='ErrorMessage'>{error}</label>}
                </div>
            )}
        </div>
    );
};


export default Login;