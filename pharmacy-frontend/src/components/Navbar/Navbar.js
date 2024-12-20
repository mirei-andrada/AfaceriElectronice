import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Stiluri pentru Navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/products" className="navbar-link">
                    Products
                </Link>
                <Link to="/cart" className="navbar-link">
                    Go to Cart
                </Link>
                <Link to="/profile" className="navbar-link">
                    Profile
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
