/// Caminho: app/advertiser/painel/page.tsx
// Versão: 1.0
// Autor: GPT & Weber
// Data: 27/07/2025
// Comentários: Painel do Anunciante com botões de funcionalidades.

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PainelPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');

  useEffect(() => {
    // Futuro: carregar nome do anunciante via sessão/contexto/API
    setNome('Anunciante');
  }, []);

  const botoes = [
    { label: 'Upgrade para Premium', rota: '/planos' },
    { label: 'Criar Novo Anúncio', rota: '/planos' }, // ok
    { label: 'Gerenciar Anúncios Existentes', rota: '/advertiser/anuncios' },
    { label: 'Atualizar Dados Cadastrais', rota: '/advertiser/editar-dados' },
    { label: 'Renovar Plano', rota: '/planos' },
    { label: 'Alterar Senha', rota: '/advertiser/alterar-senha' },
    { label: 'Alterar E-mail', rota: '/advertiser/alterar-email' },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Bem-vindo, {nome}! Este é seu painel.
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {botoes.map((botao, index) => (
          <button
            key={index}
            onClick={() => router.push(botao.rota)}
            className="p-4 border rounded-lg shadow hover:bg-blue-50 transition"
          >
            {botao.label}
          </button>
        ))}
      </div>
    </div>
  );
}
