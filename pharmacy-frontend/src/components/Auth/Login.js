import React, { useState } from 'react';
import { login } from '../../services/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 


const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            console.log('API Response:', response.data); // Log răspunsul API-ului
            setUser(response.data); // Setăm user-ul în aplicație
            setError(''); // Resetăm eroarea
            alert('Login successful!');
            localStorage.setItem('userId', response.data.userId);
            navigate('/products');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="register-container login-container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                You don't have an account?{' '}
                <Link to="/register" style={{ color: '#4CAF50', textDecoration: 'none' }}>
                    Create one
                </Link>
            </p>
        </div>
    );
};

export default Login;
