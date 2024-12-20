import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Backend-ul tău
});

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getProducts = () => api.get('/products');
export const placeOrder = (orderDetails) => {
    return api.post('/orders', orderDetails);
};
export const saveCart = (cartData) => {
    return api.post('/cart/save', cartData); // Endpoint pentru salvarea coșului
};
export const getUserOrders = (userId) => api.get(`/orders/${userId}`);





export default api;
