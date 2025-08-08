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
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar auth imediatamente quando o componente monta
    const initAuth = () => {
      try {
        const userData = localStorage.getItem('gfauto_user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          
          // Validar se os dados do usuário ainda são válidos
          if (parsedUser.id && parsedUser.email) {
            setUser(parsedUser);
          } else {
            // Dados inválidos, limpar
            localStorage.removeItem('gfauto_user');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        localStorage.removeItem('gfauto_user');
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    // Executar imediatamente, sem delay
    initAuth();
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
    // Se ainda está carregando ou não foi inicializado, não redirecionar ainda
    if (loading || !initialized) {
      return true; // Aguardar
    }
    
    if (!user) {
      router.push('/advertiser/login');
      return false;
    }
    return true;
  };

  return {
    user,
    loading,
    initialized,
    login,
    logout,
    updateUser,
    requireAuth,
    isAuthenticated: !!user
  };
}
