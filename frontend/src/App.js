// src/App.js
import React, { useEffect, useState } from 'react';
import { isAuthenticated, logout } from './services/authService';
import LoginForm from './components/LoginForm';
import PersonaForm from './components/PersonaForm';
import PersonaList from './components/PersonaList';
import {
    getPersonas,
    crearPersona,
    actualizarPersona,
    eliminarPersona
} from './services/personaService';

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
            console.error(err);
            setError('No se pudieron cargar las personas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autenticado) cargarPersonas();
    }, [autenticado]);

    const handleGuardar = async (persona) => {
        try {
            if (persona.id) {
                await actualizarPersona(persona.id, persona);
            } else {
                await crearPersona(persona);
            }
            await cargarPersonas();
            setPersonaParaEditar(null);
        } catch (err) {
            console.error(err);
            alert('Error al guardar la persona.');
        }
    };

    const handleEliminar = async (id) => {
        try {
            await eliminarPersona(id);
            await cargarPersonas();
        } catch (err) {
            console.error(err);
            alert('Error al eliminar la persona.');
        }
    };

    const handleLogout = () => {
        logout();
        setAutenticado(false);
    };

    if (!autenticado) {
        return <LoginForm onLoginSuccess={() => setAutenticado(true)} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
                {/* Header */}
                <header className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Gestión de Personas
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Cerrar sesión
                    </button>
                </header>

                {/* Formulario de Persona */}
                <section>
                    <PersonaForm
                        onSubmit={handleGuardar}
                        personaParaEditar={personaParaEditar}
                    />
                </section>

                {/* Listado de Personas */}
                <section className="space-y-4">
                    {loading ? (
                        <p className="text-center text-gray-600">Cargando personas…</p>
                    ) : error ? (
                        <p className="text-center text-red-600">{error}</p>
                    ) : (
                        <PersonaList
                            personas={personas}
                            onEdit={setPersonaParaEditar}
                            onDelete={handleEliminar}
                        />
                    )}
                </section>
            </div>
        </div>
    );
}

export default App;
