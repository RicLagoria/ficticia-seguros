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
    enfermedades: [{ nombre: '' }]
};

const PersonaForm = ({ onSubmit, personaParaEditar }) => {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (personaParaEditar) {
            setForm({
                ...personaParaEditar,
                enfermedades: personaParaEditar.enfermedades?.length
                    ? personaParaEditar.enfermedades
                    : [{ nombre: '' }]
            });
        }
    }, [personaParaEditar]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEnfermedadChange = (index, value) => {
        const nuevas = [...form.enfermedades];
        nuevas[index].nombre = value;
        setForm({ ...form, enfermedades: nuevas });
    };

    const agregarEnfermedad = () => {
        setForm({ ...form, enfermedades: [...form.enfermedades, { nombre: '' }] });
    };

    const eliminarEnfermedad = (index) => {
        const nuevas = form.enfermedades.filter((_, i) => i !== index);
        setForm({ ...form, enfermedades: nuevas });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enfermedadesFiltradas = form.enfermedades.filter(e => e.nombre.trim() !== '');
        onSubmit({ ...form, enfermedades: enfermedadesFiltradas });
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

            <h4>Enfermedades</h4>
            {form.enfermedades.map((enf, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <input
                        type="text"
                        placeholder="Nombre de la enfermedad"
                        value={enf.nombre}
                        onChange={(e) => handleEnfermedadChange(index, e.target.value)}
                    />
                    <button type="button" onClick={() => eliminarEnfermedad(index)}>🗑️</button>
                </div>
            ))}
            <button type="button" onClick={agregarEnfermedad}>➕ Agregar enfermedad</button>

            <br /><br />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default PersonaForm;

