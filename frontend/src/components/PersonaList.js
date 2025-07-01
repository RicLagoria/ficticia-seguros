import React from 'react';

const PersonaList = ({ personas, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Listado de personas</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ background: '#f0f0f0' }}>
                    <th style={th}>Nombre</th>
                    <th style={th}>Identificación</th>
                    <th style={th}>Edad</th>
                    <th style={th}>Género</th>
                    <th style={th}>Estado</th>
                    <th style={th}>Maneja</th>
                    <th style={th}>Lentes</th>
                    <th style={th}>Diabético</th>
                    <th style={th}>Enfermedades</th>
                    <th style={th}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {personas.map((p) => (
                    <tr key={p.id}>
                        <td style={td}>{p.nombreCompleto}</td>
                        <td style={td}>{p.identificacion}</td>
                        <td style={td}>{p.edad}</td>
                        <td style={td}>{p.genero}</td>
                        <td style={td}>{p.estado ? 'Activo' : 'Inactivo'}</td>
                        <td style={td}>{p.maneja ? 'Sí' : 'No'}</td>
                        <td style={td}>{p.usaLentes ? 'Sí' : 'No'}</td>
                        <td style={td}>{p.diabetico ? 'Sí' : 'No'}</td>
                        <td style={td}>
                            {p.enfermedades && p.enfermedades.length > 0 ? (
                                p.enfermedades.map((e, i) => (
                                    <span key={i} style={badge}>{e.nombre}</span>
                                ))
                            ) : (
                                <em>Sin enfermedades</em>
                            )}
                        </td>
                        <td style={td}>
                            <button onClick={() => onEdit(p)}>✏️</button>{' '}
                            <button onClick={() => onDelete(p.id)}>🗑️</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// Estilos inline para mantenerlo simple
const th = {
    padding: '8px',
    borderBottom: '1px solid #ccc',
    textAlign: 'left'
};

const td = {
    padding: '8px',
    borderBottom: '1px solid #eee'
};

const badge = {
    display: 'inline-block',
    backgroundColor: '#d9edf7',
    color: '#31708f',
    padding: '2px 6px',
    margin: '2px',
    borderRadius: '4px',
    fontSize: '0.75rem'
};

export default PersonaList;
