// src/pages/LoginPage.js
import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = ({ onLoginSuccess }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <LoginForm onLoginSuccess={onLoginSuccess} />
        </div>
    );
};

export default LoginPage;
