// src/services/http.js
import axios from 'axios';
import { getToken } from './authService';
import { showError } from '../utils/notifications';

// Base URL configurable vía .env: REACT_APP_API_URL=http://localhost:8080/api
const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api'
});

// Interceptor para adjuntar JWT
http.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});


http.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;
        const msg    = error.response?.data?.message || error.message;

        switch (status) {
            case 400:
                showError(`Solicitud inválida: ${msg}`);
                break;
            case 401:
                showError('No autorizado. Por favor, inicia sesión.');
                break;
            case 403:
                showError('Acceso prohibido.');
                break;
            case 404:
                showError('Recurso no encontrado.');
                break;
            case 409:
                showError(`Conflicto: ${msg}`);
                break;
            default:
                showError('Error interno. Intenta más tarde.');
        }

        return Promise.reject(error);
    }
);

export default http;

