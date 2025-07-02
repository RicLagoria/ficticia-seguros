// src/services/personaService.js
import http from './http';

const RESOURCE = '/personas';

// Devuelven directamente el data para simplificar el uso desde los componentes
export const getPersonas = async () => {
    const { data } = await http.get(RESOURCE);
    return data;
};

export const crearPersona = async (persona) => {
    const { data } = await http.post(RESOURCE, persona);
    return data;
};

export const actualizarPersona = async (id, persona) => {
    const { data } = await http.put(`${RESOURCE}/${id}`, persona);
    return data;
};

export const eliminarPersona = async (id) => {
    await http.delete(`${RESOURCE}/${id}`);
};
