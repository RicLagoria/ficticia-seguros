import React from 'react';

const Sidebar = ({ onLogout }) => {
    return (
        <div className="flex flex-col h-full p-4">
            <h1 className="text-xl font-bold mb-8">Ficticia Seguros SA</h1>
            <nav className="space-y-4">
                {[
                    'Dashboard',
                    'Clientes',
                    'Carrito',
                    'Facturación',
                    'Productos',
                    'Consultas',
                    'Administración'
                ].map((item) => (
                    <a
                        key={item}
                        href="#"
                        className="block text-sm hover:text-blue-300 transition"
                    >
                        {item}
                    </a>
                ))}
            </nav>
            <div className="mt-auto">
                <button
                    onClick={onLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded w-full mt-8 text-sm"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;