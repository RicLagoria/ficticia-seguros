import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';
//const API_URL = '/auth/login';
//const API_URL = '/auth'

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const token = response.data.token;
    localStorage.setItem('jwt', token);
    return token;
};

export const logout = () => {
    localStorage.removeItem('jwt');
};

export const getToken = () => {
    return localStorage.getItem('jwt');
};

export const isAuthenticated = () => {
    return !!getToken();
};
