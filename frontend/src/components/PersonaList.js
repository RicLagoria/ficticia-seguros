// src/components/PersonaList.js
import React from 'react';

const PersonaList = ({ personas = [], onEdit, onDelete }) => {
    if (!personas.length) {
        return (
            <div className="login-box">
                <h2 className="text-xl font-semibold text-center text-gray-800">
                    Listado de personas
                </h2>
                <p className="text-center text-gray-600">
                    Cargando o no hay personas para mostrar…
                </p>
            </div>
        );
    }

    return (
        <div className="login-box">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                Listado de personas
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium">Nombre</th>
                        <th className="px-4 py-2 text-left font-medium">Identificación</th>
                        <th className="px-4 py-2 text-left font-medium">Edad</th>
                        <th className="px-4 py-2 text-left font-medium">Género</th>
                        <th className="px-4 py-2 text-left font-medium">Estado</th>
                        <th className="px-4 py-2 text-left font-medium">Maneja</th>
                        <th className="px-4 py-2 text-left font-medium">Lentes</th>
                        <th className="px-4 py-2 text-left font-medium">Diabético</th>
                        <th className="px-4 py-2 text-left font-medium">Enfermedades</th>
                        <th className="px-4 py-2 text-left font-medium">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {personas.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{p.nombreCompleto}</td>
                            <td className="px-4 py-2">{p.identificacion}</td>
                            <td className="px-4 py-2">{p.edad}</td>
                            <td className="px-4 py-2">{p.genero}</td>
                            <td className="px-4 py-2">{p.estado ? 'Activo' : 'Inactivo'}</td>
                            <td className="px-4 py-2">{p.maneja ? 'Sí' : 'No'}</td>
                            <td className="px-4 py-2">{p.usaLentes ? 'Sí' : 'No'}</td>
                            <td className="px-4 py-2">{p.diabetico ? 'Sí' : 'No'}</td>
                            <td className="px-4 py-2">
                                {p.enfermedades?.length > 0 ? (
                                    p.enfermedades.map((e, i) => (
                                        <span
                                            key={i}
                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mr-1"
                                        >
                        {e.nombre}
                      </span>
                                    ))
                                ) : (
                                    <em className="text-gray-500">Sin enfermedades</em>
                                )}
                            </td>
                            <td className="px-4 py-2 flex space-x-2">
                                <button
                                    onClick={() => onEdit(p)}
                                    className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-xs"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => onDelete(p.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonaList;
