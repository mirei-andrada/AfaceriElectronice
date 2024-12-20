import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Importă fișierul CSS

const Profile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.removeItem('userId');
        alert('You have been logged out.');
        navigate('/login'); 
    };

    const goToOrderHistory = () => {
        navigate('/orders');
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {userId ? (
                <div className="profile-actions">
                <button className="profile-button" onClick={handleLogout}>
                    Logout
                </button>
                <button className="profile-button" onClick={goToOrderHistory}>
                    View Order History
                </button>
            </div>
            ) : (
                <p className="login-prompt" onClick={handleLoginRedirect}>
                    Click here to log in
                </p>
            )}
        </div>
    );
};

export default Profile;
