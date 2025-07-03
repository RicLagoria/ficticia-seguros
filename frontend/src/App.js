// src/App.js
import React, { useEffect, useState } from 'react';
import { isAuthenticated, logout } from './services/authService';
import {
    getPersonas,
    crearPersona,
    actualizarPersona,
    eliminarPersona
} from './services/personaService';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
    const [personas, setPersonas] = useState([]);
    const [personaParaEditar, setPersonaParaEditar] = useState(null);
    const [autenticado, setAutenticado] = useState(isAuthenticated());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cargarPersonas = async () => {
        setLoading(true);
        setError(null);
        try {
            const lista = await getPersonas();
            setPersonas(lista);
        } catch (err) {
            setError('Error al cargar personas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autenticado) {
            cargarPersonas();
        }
    }, [autenticado]);

    return autenticado ? (
        <DashboardPage
            personas={personas}
            setPersonas={setPersonas}
            personaParaEditar={personaParaEditar}
            setPersonaParaEditar={setPersonaParaEditar}
            cargarPersonas={cargarPersonas}
            eliminarPersona={eliminarPersona}
            crearPersona={crearPersona}
            actualizarPersona={actualizarPersona}
            loading={loading}
            error={error}
        />
    ) : (
        <LoginPage onLoginSuccess={() => setAutenticado(true)} />
    );
}

export default App;
