import React, { useEffect, useState } from 'react';
import { isAuthenticated, logout } from './services/authService';
import LoginForm from './components/LoginForm';
import PersonaForm from './components/PersonaForm';
import PersonaList from './components/PersonaList';
import { getPersonas, crearPersona, actualizarPersona, eliminarPersona } from './services/personaService';

function App() {
    const [personas, setPersonas] = useState([]);
    const [personaParaEditar, setPersonaParaEditar] = useState(null);
    const [autenticado, setAutenticado] = useState(isAuthenticated());

    const cargarPersonas = () =>
        getPersonas().then(res => setPersonas(res.data));

    useEffect(() => {
        if (autenticado) cargarPersonas();
    }, [autenticado]);

    const handleGuardar = (persona) => {
        const request = persona.id
            ? actualizarPersona(persona.id, persona)
            : crearPersona(persona);

        request
            .then(cargarPersonas)
            .catch(err => {
                console.error("Error al guardar:", err);
                alert("Hubo un error al guardar la persona. Revisá los datos.");
            });

        setPersonaParaEditar(null);
    };

    const handleEliminar = (id) => {
        eliminarPersona(id).then(cargarPersonas);
    };

    const handleLogout = () => {
        logout();
        setAutenticado(false);
    };

    if (!autenticado) {
        return <LoginForm onLoginSuccess={() => setAutenticado(true)} />;
    }

    return (
        <div className="App">
            <button onClick={handleLogout}>Cerrar sesión</button>
            <PersonaForm onSubmit={handleGuardar} personaParaEditar={personaParaEditar} />
            <PersonaList personas={personas} onEdit={setPersonaParaEditar} onDelete={handleEliminar} />
        </div>
    );
}

export default App;

