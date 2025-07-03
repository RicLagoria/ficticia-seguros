// src/pages/DashboardPage.js
import React from 'react';
import PersonaPanel from '../components/personas/PersonaPanel';

const DashboardPage = ({
                           personas,
                           setPersonas,
                           personaParaEditar,
                           setPersonaParaEditar,
                           cargarPersonas,
                           eliminarPersona,
                           crearPersona,
                           actualizarPersona,
                           loading,
                           error
                       }) => {
    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <PersonaPanel
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
        </div>
    );
};

export default DashboardPage;
