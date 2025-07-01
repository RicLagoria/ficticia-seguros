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
    enfermedades: []
};

const PersonaForm = ({ onSubmit, personaParaEditar }) => {
    const [form, setForm] = useState(initialForm);
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (personaParaEditar) {
            setForm({ ...personaParaEditar, enfermedades: personaParaEditar.enfermedades || [] });
        }
    }, [personaParaEditar]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddEnfermedad = () => {
        setForm(prev => ({ ...prev, enfermedades: [...prev.enfermedades, { nombre: '' }] }));
    };

    const handleRemoveEnfermedad = (index) => {
        const nuevas = [...form.enfermedades];
        nuevas.splice(index, 1);
        setForm(prev => ({ ...prev, enfermedades: nuevas }));
    };

    const handleEnfermedadChange = (index, value) => {
        const nuevas = [...form.enfermedades];
        nuevas[index].nombre = value;
        setForm(prev => ({ ...prev, enfermedades: nuevas }));
    };

    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!form.nombreCompleto.trim()) nuevosErrores.nombreCompleto = 'El nombre es obligatorio';
        if (!form.identificacion.trim()) nuevosErrores.identificacion = 'La identificación es obligatoria';
        if (!form.genero.trim()) nuevosErrores.genero = 'El género es obligatorio';
        if (!form.edad || form.edad < 0 || form.edad > 120) nuevosErrores.edad = 'Edad inválida';
        if (form.enfermedades && form.enfermedades.some(e => !e.nombre.trim())) {
            nuevosErrores.enfermedades = 'Todas las enfermedades deben tener nombre';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        onSubmit(form);
        setForm(initialForm);
        setErrores({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{form.id ? 'Editar' : 'Nueva'} Persona</h2>
            <input name="nombreCompleto" value={form.nombreCompleto} onChange={handleChange} placeholder="Nombre completo" />
            {errores.nombreCompleto && <p className="error">{errores.nombreCompleto}</p>}

            <input name="identificacion" value={form.identificacion} onChange={handleChange} placeholder="Identificación" />
            {errores.identificacion && <p className="error">{errores.identificacion}</p>}

            <input name="edad" type="number" value={form.edad} onChange={handleChange} placeholder="Edad" />
            {errores.edad && <p className="error">{errores.edad}</p>}

            <input name="genero" value={form.genero} onChange={handleChange} placeholder="Género" />
            {errores.genero && <p className="error">{errores.genero}</p>}

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

            <div>
                <h3>Enfermedades</h3>
                {form.enfermedades.map((enf, idx) => (
                    <div key={idx}>
                        <input
                            value={enf.nombre}
                            onChange={(e) => handleEnfermedadChange(idx, e.target.value)}
                            placeholder={`Enfermedad #${idx + 1}`}
                        />
                        <button type="button" onClick={() => handleRemoveEnfermedad(idx)}>Quitar</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddEnfermedad}>Agregar enfermedad</button>
                {errores.enfermedades && <p className="error">{errores.enfermedades}</p>}
            </div>

            <button type="submit">Guardar</button>
        </form>
    );
};

export default PersonaForm;


