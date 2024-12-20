import React, { useState } from 'react';
import { register } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Asigură-te că calea este corectă


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            setMessage('Registration successful! You can now log in.');
            setTimeout(() => {navigate('/login');}, 2000);
        } catch (err) {
            setMessage('Error registering user. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
