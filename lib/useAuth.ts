// Caminho: lib/useAuth.ts
// Hook personalizado para gerenciar autenticação no GFauto
// Autor: GPT & Weber
// Data: 27/07/2025

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  nomeResponsavel: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  imagemUrl?: string;
  planoEscolhido: string;
  statusCadastro: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const userData = localStorage.getItem('gfauto_user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User) => {
    localStorage.setItem('gfauto_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('gfauto_user');
    setUser(null);
    router.push('/advertiser/login');
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedData };
      localStorage.setItem('gfauto_user', JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  const requireAuth = () => {
    if (!loading && !user) {
      router.push('/advertiser/login');
      return false;
    }
    return true;
  };

  return {
    user,
    loading,
    login,
    logout,
    updateUser,
    requireAuth,
    isAuthenticated: !!user
  };
}
