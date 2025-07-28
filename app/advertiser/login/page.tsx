/// Caminho: app/advertiser/login/page.tsx
// Versão: 1.0
// Autor: GPT & Weber
// Data: 27/07/2025
// Comentários: Tela de login do anunciante com campos de CPF e Senha, máscara e redirecionamento para página Planos.

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputMask from 'react-input-mask';

export default function LoginPage() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    const response = await fetch('/api/advertiser/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push('https://gfauto.vercel.app/planos');
    } else {
      const data = await response.json();
      setErro(data.message || 'Erro ao fazer login');
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
            onChange={(e) => setCpf(e.target.value)}
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
      </form>
    </div>
  );
}
