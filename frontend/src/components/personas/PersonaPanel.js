// src/components/personas/PersonaPanel.js
import React from 'react';
import PersonaForm from './PersonaForm';
import PersonaList from './PersonaList';

const PersonaPanel = ({
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PersonaForm
                personaParaEditar={personaParaEditar}
                setPersonaParaEditar={setPersonaParaEditar}
                crearPersona={crearPersona}
                actualizarPersona={actualizarPersona}
                cargarPersonas={cargarPersonas}
            />
            <PersonaList
                personas={personas}
                setPersonas={setPersonas}
                setPersonaParaEditar={setPersonaParaEditar}
                eliminarPersona={eliminarPersona}
                cargarPersonas={cargarPersonas}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default PersonaPanel;
