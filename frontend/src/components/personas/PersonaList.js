import React from 'react';

const PersonaList = ({
                         personas,
                         setPersonas,
                         setPersonaParaEditar,
                         eliminarPersona,
                         cargarPersonas,
                         loading,
                         error
                     }) => {
    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Listado de Personas</h2>

            {loading ? (
                <p className="text-gray-600">Cargando...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : personas.length === 0 ? (
                <p className="text-gray-600">No hay personas registradas.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">Nombre</th>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Edad</th>
                            <th className="p-2 border">Género</th>
                            <th className="p-2 border">Activo</th>
                            <th className="p-2 border">Maneja</th>
                            <th className="p-2 border">Lentes</th>
                            <th className="p-2 border">Diabético</th>
                            <th className="p-2 border">Enfermedades</th>
                            <th className="p-2 border">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {personas.map((persona) => (
                            <tr key={persona.id} className="border-t hover:bg-gray-50">
                                <td className="p-2 border">{persona.nombreCompleto}</td>
                                <td className="p-2 border">{persona.identificacion}</td>
                                <td className="p-2 border">{persona.edad}</td>
                                <td className="p-2 border">{persona.genero}</td>
                                <td className="p-2 border">{persona.estado ? '✅' : '❌'}</td>
                                <td className="p-2 border">{persona.maneja ? '✅' : '❌'}</td>
                                <td className="p-2 border">{persona.usaLentes ? '✅' : '❌'}</td>
                                <td className="p-2 border">{persona.diabetico ? '✅' : '❌'}</td>
                                <td className="p-2 border">
                                    {persona.enfermedades?.length > 0
                                        ? persona.enfermedades.map(e => e.nombre).join(', ')
                                        : '—'}
                                </td>
                                <td className="p-2 border space-x-2">
                                    <button
                                        onClick={() => setPersonaParaEditar(persona)}
                                        className="px-2 py-1 text-blue-600 hover:underline"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={async () => {
                                            await eliminarPersona(persona.id);
                                            await cargarPersonas();
                                        }}
                                        className="px-2 py-1 text-red-600 hover:underline"
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PersonaList;
