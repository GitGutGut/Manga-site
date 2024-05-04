import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const storedAuthData = localStorage.getItem('authData');
        return storedAuthData ? JSON.parse(storedAuthData) : { isLoggedIn: false, e_mail: "", isAdministrator: false };
    });

    useEffect(() => {
        localStorage.setItem('authData', JSON.stringify(authData));
    }, [authData]);

    const updateAuthData = newData => {
        setAuthData(prevData => ({
            ...prevData,
            ...newData
        }));
    };

    return (
        <AuthContext.Provider value={{ authData, updateAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);