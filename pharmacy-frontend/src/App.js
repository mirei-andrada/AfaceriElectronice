import React, { useState, useEffect } from 'react'; // Import pentru React și useState
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import pentru react-router-dom
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import Checkout from './components/Cart/Checkout';
import OrderHistory from './components/Order/OrderHistory';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';


const App = () => {
  const [user, setUser] = useState(null); // Utilizatorul autentificat
  const [cart, setCart] = useState([]); // Produse din coș
  // const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  useEffect(() => {
    setUser(localStorage.getItem('userId')); // Verifică dacă userId există în localStorage
  }, []);

  const addToCart = (product) => {
      const existingItem = cart.find((item) => item._id === product._id);
      if (existingItem) {
          setCart(
              cart.map((item) =>
                  item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
              )
          );
      } else {
          setCart([...cart, { ...product, quantity: 1 }]);
      }
  };

  const updateCart = (productId, quantity) => {
      setCart(
          cart.map((item) =>
              item._id === productId ? { ...item, quantity } : item
          )
      );
  };

  const removeFromCart = (productId) => {
      setCart(cart.filter((item) => item._id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
      <Router>
          <Navbar /> {/* Navbar-ul este afișat pe toate paginile */}
          <Routes>
          {!user ? (
        <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirecționează către login */}
        </>
    ) : (
        <>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList addToCart={addToCart} />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                  path="/cart"
                  element={
                      <Cart
                          cart={cart}
                          updateCart={updateCart}
                          removeFromCart={removeFromCart}
                      />
                  }
              />
              <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} userId={localStorage.getItem('userId')} />} />
              <Route path="/orders" element={<OrderHistory userId={localStorage.getItem('userId')} />} />
          </>
    )}
    </Routes>
    </Router>
  );
};

export default App;
