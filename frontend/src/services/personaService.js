import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:8080/api/personas';
//const API_URL ='/api/personas'


const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const getPersonas = () => axiosInstance.get(API_URL);
export const crearPersona = (persona) => axiosInstance.post(API_URL, persona);
export const actualizarPersona = (id, persona) => axiosInstance.put(`${API_URL}/${id}`, persona);
export const eliminarPersona = (id) => axiosInstance.delete(`${API_URL}/${id}`);

