// src/components/LoginForm.js
import React, { useState } from 'react';
import { login } from '../../services/authService';
import logo from '../../logo.svg';

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
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Ficticia SA" className="login-logo" />

                {errorGeneral && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {errorGeneral}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    {/* Username */}
                    <label htmlFor="username" className="block text-left text-sm font-medium mb-1">
                        Usuario
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="login-input"
                    />
                    <p className="h-4 text-sm text-red-600">
                        {errores.username || '\u00A0'}
                    </p>

                    {/* Password */}
                    <label htmlFor="password" className="block text-left text-sm font-medium mb-1">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <p className="h-4 text-sm text-red-600">
                        {errores.password || '\u00A0'}
                    </p>

                    <button type="submit" className="login-button">
                        Ingresar
                    </button>
                </form>

                <div className="login-footer">
                    <a href="#">Olvidó su contraseña?</a>
                    <a href="#">Crear cuenta</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
