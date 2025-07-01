import React, { useState, useEffect } from 'react';

const initialForm = {
    nombreCompleto: '',
    identificacion: '',
    edad: '',
    genero: '',
    estado: true,
    maneja: false,
    usaLentes: false,
    diabetico: false,
    otraEnfermedad: ''
};

const PersonaForm = ({ onSubmit, personaParaEditar }) => {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (personaParaEditar) setForm(personaParaEditar);
    }, [personaParaEditar]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm(initialForm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{form.id ? 'Editar' : 'Nueva'} Persona</h2>
            <input name="nombreCompleto" value={form.nombreCompleto} onChange={handleChange} placeholder="Nombre completo" required />
            <input name="identificacion" value={form.identificacion} onChange={handleChange} placeholder="Identificación" required />
            <input name="edad" type="number" value={form.edad} onChange={handleChange} placeholder="Edad" required />
            <input name="genero" value={form.genero} onChange={handleChange} placeholder="Género" required />
            <label>
                Estado activo:
                <input type="checkbox" name="estado" checked={form.estado} onChange={handleChange} />
            </label>
            <label>
                Maneja:
                <input type="checkbox" name="maneja" checked={form.maneja} onChange={handleChange} />
            </label>
            <label>
                Usa lentes:
                <input type="checkbox" name="usaLentes" checked={form.usaLentes} onChange={handleChange} />
            </label>
            <label>
                Diabético:
                <input type="checkbox" name="diabetico" checked={form.diabetico} onChange={handleChange} />
            </label>
            <input name="otraEnfermedad" value={form.otraEnfermedad} onChange={handleChange} placeholder="Otra enfermedad" />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default PersonaForm;
