import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import PersonaList from '../components/personas/PersonaList';
import PersonaForm from '../components/personas/PersonaForm';

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
                           error,
                           onLogout
                       }) => {
    return (
        <MainLayout
            formPanel={
                <PersonaForm
                    personaParaEditar={personaParaEditar}
                    setPersonaParaEditar={setPersonaParaEditar}
                    crearPersona={crearPersona}
                    actualizarPersona={actualizarPersona}
                    cargarPersonas={cargarPersonas}
                />
            }
            onLogout={onLogout}
        >
            <PersonaList
                personas={personas}
                setPersonas={setPersonas}
                setPersonaParaEditar={setPersonaParaEditar}
                eliminarPersona={eliminarPersona}
                cargarPersonas={cargarPersonas}
                loading={loading}
                error={error}
            />
        </MainLayout>
    );
};

export default DashboardPage;