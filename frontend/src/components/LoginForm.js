import React, { useState } from 'react';
import { login } from '../services/authService';

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorGeneral, setErrorGeneral] = useState(null);
    const [errores, setErrores] = useState({});

    const validarCampos = () => {
        const nuevos = {};
        if (!username.trim()) nuevos.username = 'Usuario requerido';
        if (!password.trim()) nuevos.password = 'Contraseña requerida';
        setErrores(nuevos);
        return Object.keys(nuevos).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorGeneral(null);
        if (!validarCampos()) return;
        try {
            await login(username, password);
            onLoginSuccess();
        } catch {
            setErrorGeneral('Credenciales inválidas');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Iniciar sesión</h2>

                {errorGeneral && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {errorGeneral}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            placeholder="Tu usuario"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                        {errores.username && <span className="text-red-600 text-sm mt-1 block">{errores.username}</span>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                        {errores.password && <span className="text-red-600 text-sm mt-1 block">{errores.password}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                    >
                        Ingresar
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-500 text-sm">
                    ¿No tienes cuenta? <a href="#" className="text-indigo-600 hover:underline">Regístrate</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
