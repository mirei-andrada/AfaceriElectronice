import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './ProductList.css';


const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Încărcăm produsele din backend
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data); // Stocăm produsele
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            alert('You must be logged in to add products to the cart.');
            return;
        }
        addToCart(product);
    };

    return (
        
        <div className="product-list-container">
            <div className="header">
                <h2>Products</h2>
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="price">Price: {product.price.toFixed(2)} RON</p>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        {/* <button onClick={() => addToCart(product)}>Add to Cart</button> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
