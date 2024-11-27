import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize from localStorage
    const [user, setUser] = useState(() => localStorage.getItem('user') || '');
    const [login, setLogin] = useState(!!localStorage.getItem('user'));
    const [error, setError] = useState(null);
    const [userdetails, setUserDetails] = useState(localStorage.getItem('branch') || null); // Initialize branch
    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        try {
            // First, attempt to log in
            const response = await axios.post('http://127.0.0.1:8000/login/', { 
                user: username, 
                password: password 
            });
            console.log(response); // Log the response from the login API

            // After login, fetch user details
            const response2 = await axios.get('http://127.0.0.1:8000/userdetails/', { 
                params: { email: username } // Passing the email as a query parameter
            });

            const branch = response2.data[0].branch;
            setUserDetails(branch);
            localStorage.setItem('branch', branch);
            localStorage.setItem('user', username);
            setUser(username);
            setLogin(true);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('branch');
        setUser('');
        setUserDetails(null);
        setLogin(false);
        navigate('/login');
    };

    useEffect(() => {
        setLogin(!!user);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, userdetails, error, login, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
