// Caminho: components/painel/Header.tsx
// Componente de cabeçalho para o painel do anunciante
// Autor: GPT & Weber
// Data: 27/07/2025

'use client';

import { useAuth } from '@/lib/useAuth';
import { useState } from 'react';

export default function PainelHeader() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) return null;

  const nomeExibicao = user.nomeFantasia || user.razaoSocial || user.nomeResponsavel;
  const iniciais = nomeExibicao.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Título */}
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">
              GFauto - Painel
            </h1>
            <span className="text-sm text-gray-500">
              Plano: {user.planoEscolhido}
            </span>
          </div>

          {/* Informações do usuário */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {nomeExibicao}
              </p>
              <p className="text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            {/* Avatar/Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {user.imagemUrl ? (
                  <img
                    src={user.imagemUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium">{iniciais}</span>
                )}
              </button>

              {/* Menu dropdown */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        // TODO: Implementar upload de avatar
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Alterar Foto
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Implementar edição de perfil
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Editar Perfil
                    </button>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={() => {
                        logout();
                        setShowMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
