import React, { useState } from 'react';
import { FiMenu, FiUser, FiBell, FiSettings } from 'react-icons/fi';

const Header: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button className="p-1 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:hidden">
            <FiMenu className="h-6 w-6" />
          </button>
          <h1 className="ml-3 text-xl font-semibold text-gray-800">GFauto Admin</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <FiBell className="h-6 w-6" />
          </button>
          <div className="relative">
            <button 
              className="flex items-center space-x-2 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <FiUser className="h-5 w-5 text-gray-600" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">Admin</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Seu Perfil</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configurações</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</a>
              </div>
            )}
          </div>
          <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <FiSettings className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
