import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../services/user.service';
import './Login.css'; // Import the CSS file

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');  
    const [flag, setFlag] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true); // Set loading to true
        const isValidUser = await validateUser(username, password);
        if (isValidUser) {
           
            setFlag(true);
            navigate('/home');
            setLoading(false);
        } else {
            console.log('Login failed');
            setFlag(false);
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="login-input"
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="login-input"
            />
            <button onClick={login} disabled={loading} className="login-button">
            {loading? <span className="loading" ></span>:<span>  Click me</span>}
            </button>
            <div className="login-message">
                {flag === false && <p>Login failed</p>}
            </div>
            <div>
                Don't have an account? <a href="/register">Register</a>
            </div>
        </div>
    );
};

export default LoginComponent;