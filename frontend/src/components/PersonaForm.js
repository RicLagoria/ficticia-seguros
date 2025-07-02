// src/components/PersonaForm.js
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
    const [touched, setTouched] = useState({});

    useEffect(() => {
        if (personaParaEditar) {
            setForm({
                ...personaParaEditar,
                enfermedades: personaParaEditar.enfermedades || []
            });
            setErrores({});
            setTouched({});
        }
    }, [personaParaEditar]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBlur = e => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validarFormulario();
    };

    const validarFormulario = () => {
        const nuevos = {};
        if (!form.nombreCompleto.trim()) nuevos.nombreCompleto = 'El nombre es obligatorio';
        if (!form.identificacion.trim()) nuevos.identificacion = 'La identificación es obligatoria';
        if (!form.genero.trim()) nuevos.genero = 'El género es obligatorio';
        if (form.edad === '' || form.edad < 0 || form.edad > 120) nuevos.edad = 'Edad inválida';
        if (form.enfermedades.some(e => !e.nombre.trim())) nuevos.enfermedades = 'Todas las enfermedades deben tener nombre';
        setErrores(nuevos);
        return Object.keys(nuevos).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        setTouched({
            nombreCompleto: true,
            identificacion: true,
            genero: true,
            edad: true,
            enfermedades: true
        });
        if (!validarFormulario()) return;
        onSubmit(form);
        setForm(initialForm);
        setErrores({});
        setTouched({});
    };

    const handleAddEnfermedad = () => {
        setForm(prev => ({
            ...prev,
            enfermedades: [...prev.enfermedades, { nombre: '' }]
        }));
    };

    const handleRemoveEnfermedad = idx => {
        setForm(prev => {
            const lista = [...prev.enfermedades];
            lista.splice(idx, 1);
            return { ...prev, enfermedades: lista };
        });
    };

    const handleEnfermedadChange = (idx, value) => {
        setForm(prev => {
            const lista = [...prev.enfermedades];
            lista[idx].nombre = value;
            return { ...prev, enfermedades: lista };
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="login-box space-y-6"
        >
            <h2 className="text-2xl font-semibold text-center">
                {form.id ? 'Editar' : 'Nueva'} Persona
            </h2>

            {/* Campos principales */}
            <div className="space-y-4">
                {[
                    { label: 'Nombre completo', name: 'nombreCompleto', type: 'text' },
                    { label: 'Identificación', name: 'identificacion', type: 'text' },
                    { label: 'Edad', name: 'edad', type: 'number' },
                    { label: 'Género', name: 'genero', type: 'text' }
                ].map(f => (
                    <div key={f.name}>
                        <label htmlFor={f.name} className="block text-sm font-medium mb-1">
                            {f.label}
                        </label>
                        <input
                            id={f.name}
                            name={f.name}
                            type={f.type}
                            value={form[f.name]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="login-input"
                        />
                        <p className="h-4 text-sm text-red-600 mt-1">
                            {touched[f.name] && errores[f.name]
                                ? errores[f.name]
                                : '\u00A0'}
                        </p>
                    </div>
                ))}
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4">
                {[
                    { label: 'Activo', name: 'estado' },
                    { label: 'Maneja', name: 'maneja' },
                    { label: 'Lentes', name: 'usaLentes' },
                    { label: 'Diabético', name: 'diabetico' }
                ].map(opt => (
                    <label key={opt.name} className="inline-flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name={opt.name}
                            checked={form[opt.name]}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-primary"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                ))}
            </div>

            {/* Enfermedades */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Enfermedades</h3>
                {form.enfermedades.map((enf, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={enf.nombre}
                            onChange={e => handleEnfermedadChange(idx, e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, enfermedades: true }))}
                            placeholder={`#${idx + 1}`}
                            className="login-input flex-1"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveEnfermedad(idx)}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                            Quitar
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddEnfermedad}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Agregar enfermedad
                </button>
                <p className="h-4 text-sm text-red-600">
                    {touched.enfermedades && errores.enfermedades
                        ? errores.enfermedades
                        : '\u00A0'}
                </p>
            </div>

            <button type="submit" className="login-button">
                Guardar
            </button>
        </form>
    );
};

export default PersonaForm;
