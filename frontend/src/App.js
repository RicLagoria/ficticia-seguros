import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
    const [autenticado, setAutenticado] = useState(isAuthenticated());
    const [personas, setPersonas] = useState([]);
    const [personaParaEditar, setPersonaParaEditar] = useState(null);
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

    const handleLogout = () => {
        logout();
        setAutenticado(false);
    };

    const dashboardProps = {
        personas,
        setPersonas,
        personaParaEditar,
        setPersonaParaEditar,
        cargarPersonas,
        eliminarPersona,
        crearPersona,
        actualizarPersona,
        loading,
        error,
        onLogout: handleLogout
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        autenticado
                            ? <Navigate to="/dashboard" />
                            : <LoginPage onLoginSuccess={() => setAutenticado(true)} />
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        autenticado
                            ? <DashboardPage {...dashboardProps} />
                            : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/"
                    element={
                        autenticado
                            ? <Navigate to="/dashboard" />
                            : <Navigate to="/login" />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;