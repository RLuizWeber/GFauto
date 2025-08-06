/// Caminho: app/advertiser/login/page.tsx
// Versão: 1.0
// Autor: GPT & Weber
// Data: 27/07/2025
// Comentários: Tela de login do anunciante com campos de CPF e Senha, máscara e redirecionamento para página Planos.

'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import InputMask from 'react-input-mask';

export default function LoginPage() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [recoverCpf, setRecoverCpf] = useState('');
  const [recoverMessage, setRecoverMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login realizado:', data);
      
      // Salvar dados do usuário no localStorage
      localStorage.setItem('gfauto_user', JSON.stringify(data.anunciante));
      
      // Redirecionar para o painel do anunciante após login bem-sucedido
      router.push('/painel');
    } else {
      const data = await response.json();
      if (data.needsEmailConfirmation) {
        setErro('⚠️ ' + data.error);
      } else {
        setErro(data.error || 'CPF não encontrado ou senha inválida');
      }
    }
  };

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverMessage('');

    const response = await fetch('/api/password/recover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf: recoverCpf }),
    });

    const data = await response.json();
    setRecoverMessage(data.message || data.error);
    
    if (response.ok) {
      // Aumentar o tempo de exibição da mensagem de sucesso
      setTimeout(() => {
        setShowRecoverModal(false);
        setRecoverCpf('');
        setRecoverMessage('');
      }, 6000); // 6 segundos em vez de 3
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Login do Anunciante</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">CPF</label>
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {erro && <p className="text-red-600 mb-2">{erro}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
        
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowRecoverModal(true)}
            className="text-blue-600 hover:text-blue-800 font-medium underline decoration-2 underline-offset-2"
          >
            Esqueci minha senha
          </button>
        </div>
        
        <div className="mt-2 text-center text-xs text-gray-500">
          Não tem conta? <a href="/cadastro" className="text-blue-600 hover:text-blue-800 underline">Cadastre-se aqui</a>
        </div>
      </form>

      {/* Modal de Recuperação de Senha */}
      {showRecoverModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-4">Recuperar Senha</h2>
            <p className="text-sm text-gray-600 mb-4">
              Se o CPF estiver cadastrado, você receberá um email com instruções para recuperar sua senha.
            </p>
            <form onSubmit={handleRecoverPassword}>
              <div className="mb-4">
                <label className="block font-semibold mb-1">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  value={recoverCpf}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRecoverCpf(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Digite seu CPF"
                  required
                />
              </div>
              {recoverMessage && (
                <p className={`mb-4 text-sm font-medium ${recoverMessage.includes('erro') || recoverMessage.includes('Erro') ? 'text-red-600' : 'text-green-600'}`}>
                  {recoverMessage}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Enviar Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRecoverModal(false);
                    setRecoverCpf('');
                    setRecoverMessage('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
