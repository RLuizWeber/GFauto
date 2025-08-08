/// Caminho: app/painel/page.tsx
// Versão: 2.0
// Autor: GPT & Weber
// Data: 27/07/2025
// Comentários: Painel do Anunciante com autenticação, header e funcionalidades melhoradas.

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import PainelHeader from '@/components/painel/Header';

interface AnuncioInfo {
  data_expiracao?: string;
  plano?: string;
}

export default function PainelPage() {
  const router = useRouter();
  const { user, loading, initialized, requireAuth } = useAuth();
  const [anuncioInfo, setAnuncioInfo] = useState<AnuncioInfo | null>(null);
  const [carregandoAnuncio, setCarregandoAnuncio] = useState(true);

  useEffect(() => {
    // Só verificar auth depois que foi inicializado
    if (initialized && !requireAuth()) {
      return;
    }
  }, [initialized, requireAuth]);

  // Buscar informações do anúncio quando o usuário estiver carregado
  useEffect(() => {
    if (user?.id) {
      buscarInfoAnuncio();
    }
  }, [user]);

  const buscarInfoAnuncio = async () => {
    try {
      const response = await fetch(`/api/anuncios?advertiserId=${user?.id}`);
      if (response.ok) {
        const anuncios = await response.json();
        if (anuncios.length > 0) {
          setAnuncioInfo(anuncios[0]); // Pegar o primeiro anúncio
        }
      }
    } catch (error) {
      console.error('Erro ao buscar informações do anúncio:', error);
    } finally {
      setCarregandoAnuncio(false);
    }
  };

  // Função para calcular anos de validade baseado no plano
  const calcularAnosValidade = (plano: string) => {
    if (!plano) return 1;
    
    const planoLower = plano.toLowerCase();
    if (planoLower.includes('2') || planoLower.includes('dois')) {
      return 2;
    } else if (planoLower.includes('3') || planoLower.includes('tres') || planoLower.includes('três')) {
      return 3;
    }
    return 1; // Default: 1 ano
  };

  // Função para formatar a informação de validade
  const formatarInfoValidade = () => {
    if (!anuncioInfo?.data_expiracao && !user?.planoEscolhido) {
      return '';
    }

    const plano = anuncioInfo?.plano || user?.planoEscolhido || '';
    const anos = calcularAnosValidade(plano);
    const textoAnos = `${anos} ano${anos > 1 ? 's' : ''}`;
    
    if (anuncioInfo?.data_expiracao) {
      const dataExpiracao = new Date(anuncioInfo.data_expiracao);
      const dataFormatada = dataExpiracao.toLocaleDateString('pt-BR');
      return ` (${textoAnos}, válido até ${dataFormatada})`;
    } else {
      return ` (${textoAnos})`;
    }
  };

  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando painel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // O requireAuth já redirecionou
  }

  const botoes = [
    { 
      label: 'Upgrade para Premium', 
      rota: '/planos',
      icon: '⭐',
      descricao: 'Apareça no topo dos resultados'
    },
    { 
      label: 'Criar Novo Anúncio', 
      rota: '/planos',
      icon: '➕',
      descricao: 'Publique um novo anúncio'
    },
    { 
      label: 'Gerenciar Anúncios', 
      rota: '/advertiser/anuncios',
      icon: '📝',
      descricao: 'Edite seus anúncios existentes'
    },
    { 
      label: 'Atualizar Dados', 
      rota: '/advertiser/editar-dados',
      icon: '👤',
      descricao: 'Atualize informações da empresa'
    },
    { 
      label: 'Renovar Plano', 
      rota: '/planos',
      icon: '🔄',
      descricao: 'Renove ou mude seu plano'
    },
    { 
      label: 'Alterar E-mail', 
      rota: '/advertiser/alterar-email',
      icon: '📧',
      descricao: 'Atualize seu e-mail de contato'
    },
  ];

  const nomeExibicao = user.nomeFantasia || user.razaoSocial || user.nomeResponsavel;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header aparece IMEDIATAMENTE quando user estiver carregado */}
      <PainelHeader />
      
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {nomeExibicao}!
          </h1>
          <p className="text-gray-600">
            Gerencie seus anúncios e configure sua conta a partir deste painel.
          </p>
        </div>

        {/* Status do plano - pode ter loading separado */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Status do Plano</h2>
              <p className="text-gray-600">
                Você está no plano <span className="font-medium text-blue-600">
                  {user.planoEscolhido}{formatarInfoValidade()}
                </span>
              </p>
              {carregandoAnuncio && (
                <p className="text-sm text-gray-400 mt-1">
                  <span className="inline-block animate-spin rounded-full h-3 w-3 border-b-2 border-blue-400 mr-2"></span>
                  Carregando informações de validade...
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Status do Cadastro</p>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                user.statusCadastro === 'ativo' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.statusCadastro}
              </span>
            </div>
          </div>
        </div>

        {/* Grid de funcionalidades - aparece imediatamente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {botoes.map((botao, index) => (
            <button
              key={index}
              onClick={() => router.push(botao.rota)}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md hover:border-blue-300 transition-all duration-200 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {botao.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {botao.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {botao.descricao}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
