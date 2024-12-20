import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file
import { addUser } from '../services/user.service';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const user = {
                username,
                password,
                email,
            };
            addUser(user);
            navigate('/', { state: { status: 'success' } });
        }
    };

    return (
        <div className="register-container">
           
            <form onSubmit={handleSubmit} className="register-form">
            <h1>Register</h1>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="register-input"
                />
                {errors.username && <p className="register-message">{errors.username}</p>}
                
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="register-input"
                />
                {errors.password && <p className="register-message">{errors.password}</p>}
                
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="register-input"
                />
                {errors.email && <p className="register-message">{errors.email}</p>}
                
                <button type="submit" className="register-button">Register</button>
                <div className='sign-up'>
                Have an account? <a href="/">login</a>
            </div>
            </form>
        </div>
    );
};

export default Register;