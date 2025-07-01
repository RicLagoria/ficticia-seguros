import React from 'react';

const PersonaList = ({ personas, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Listado de personas</h2>
            <ul>
                {personas.map((p) => (
                    <li key={p.id}>
                        {p.nombreCompleto} ({p.identificacion}) - Edad: {p.edad}
                        <button onClick={() => onEdit(p)}>Editar</button>
                        <button onClick={() => onDelete(p.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PersonaList;
