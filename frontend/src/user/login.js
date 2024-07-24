import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/authContext';
import { loginUser, checkIfAdministrator } from '../api';

const Login = () => {
    const [formDataLogin, setFormData] = useState({
        e_mail: '',
        password: ''
    });
    const { authData, updateAuthData } = useAuth();
    const [error, setError] = useState();

    const handleChange = (e) => {
        setFormData({
            ...formDataLogin,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form submitted:', formDataLogin);
            const userResponse = await loginUser(formDataLogin);
            console.log('Response', userResponse);

            updateAuthData({ isLoggedIn: true });

            const adminResponse = await checkIfAdministrator(formDataLogin.e_mail);
            updateAuthData({ isAdministrator: adminResponse.administrator, username: adminResponse.username });

        } catch (error) {
            console.error('Error:', error.response?.data?.message);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

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
                    <Link to='/register' className='register_link'>Not registered?</Link>
                    <button type="submit" onClick={handleSubmit}>Login</button>
                    {error && <label className='ErrorMessage'>{error}</label>}
                </div>
            )}
        </div>
    );
};

export default Login;
