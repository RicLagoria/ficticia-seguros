import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children, formPanel, onLogout }) => {
    return (
        <div className="grid grid-cols-layout min-h-screen bg-gray-100 text-black">
            <aside className="bg-[#1e293b] text-white p-4">
                <Sidebar onLogout={onLogout} />
            </aside>
            <section className="bg-white p-6 border-r border-gray-200 overflow-y-auto">
                {formPanel}
            </section>
            <main className="bg-gray-50 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;