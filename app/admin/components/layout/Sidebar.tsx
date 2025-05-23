import React from 'react';
import { FiHome, FiList, FiDollarSign, FiUsers, FiSettings, FiHelpCircle } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FiList, label: 'Anúncios', href: '/admin/anuncios' },
    { icon: FiDollarSign, label: 'Pagamentos', href: '/admin/pagamentos' },
    { icon: FiUsers, label: 'Usuários', href: '/admin/usuarios' },
    { icon: FiSettings, label: 'Configurações', href: '/admin/configuracoes' },
    { icon: FiHelpCircle, label: 'Ajuda', href: '/admin/ajuda' },
  ];

  return (
    <aside className="bg-indigo-800 text-white w-64 min-h-screen hidden md:block">
      <div className="p-6">
        <h2 className="text-2xl font-bold">GFauto</h2>
        <p className="text-indigo-200 text-sm">Painel Administrativo</p>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-700 hover:text-white"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
