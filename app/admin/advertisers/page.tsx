/**
 * Página de administração de anunciantes
 * Permite visualizar, editar e excluir anunciantes
 */

'use client';

import { useEffect, useState } from 'react';

interface Advertiser {
  id: string;
  nomeResponsavel: string;
  email: string;
  cpf: string;
  planoEscolhido: string;
  statusCadastro: string;
  emailVerificado: boolean;
  createdAt: string;
  cidade: string;
  estado: string;
}

export default function AdminAdvertisersPage() {
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Força re-render

  useEffect(() => {
    fetchAdvertisers();
  }, []);

  const fetchAdvertisers = async () => {
    try {
      console.log('=== CARREGANDO ANUNCIANTES ===');
      console.log('Timestamp:', new Date().toISOString());
      
      // Força timestamp único + múltiplos parâmetros anti-cache
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(7);
      
      const url = `/api/admin/advertisers?t=${timestamp}&r=${randomId}&force=true&nocache=1`;
      console.log('🔗 URL da requisição:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Timestamp': timestamp.toString(),
        },
      });
      
      console.log('📡 Status da resposta:', response.status);
      console.log('📋 Headers da resposta:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log('📊 Dados recebidos:', data.length, 'anunciantes');
        console.log('🆔 IDs recebidos:', data.map((a: any) => a.id));
        console.log('👤 Nomes recebidos:', data.map((a: any) => a.nomeResponsavel));
        console.log('📋 Dados completos:', data);
        
        // LOGS DETALHADOS PARA DEBUG
        console.log('🔍 COMPARAÇÃO DE DADOS:');
        console.log('- Array length:', data.length);
        console.log('- Cada anunciante:');
        data.forEach((adv: any, index: number) => {
          console.log(`  ${index + 1}. ID: ${adv.id} | Nome: ${adv.nomeResponsavel} | Email: ${adv.email}`);
        });
        
        setAdvertisers(data);
        console.log('✅ setAdvertisers executado com', data.length, 'itens');
        
        // FORÇA RE-RENDER TOTAL
        setRefreshKey(prev => prev + 1);
        console.log('🔄 refreshKey incrementado para forçar re-render');
      } else {
        console.error('❌ Erro na resposta:', response.status);
      }
    } catch (error) {
      console.error('💥 Erro ao carregar anunciantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAdvertiser = async (id: string, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o anunciante "${nome}"?`)) {
      return;
    }

    console.log('=== INICIANDO EXCLUSÃO ===');
    console.log('ID para excluir:', id);
    console.log('Nome:', nome);

    // Mostrar loading visual
    const originalButton = document.querySelector(`[data-delete-id="${id}"]`) as HTMLButtonElement;
    if (originalButton) {
      originalButton.disabled = true;
      originalButton.innerHTML = '⏳ Excluindo...';
    }

    try {
      const response = await fetch(`/api/admin/advertisers/${id}`, {
        method: 'DELETE',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        // Remover da lista visualmente primeiro (otimistic update)
        setAdvertisers(current => current.filter(adv => adv.id !== id));
        
        alert('Anunciante excluído com sucesso!');
        console.log('Recarregando dados após exclusão...');
        
        // Recarregar dados imediatamente após exclusão
        setTimeout(async () => {
          console.log('=== RECARREGANDO APÓS EXCLUSÃO ===');
          setLoading(true);
          await fetchAdvertisers();
          setLoading(false);
        }, 500);
        
      } else {
        console.error('Erro na resposta:', data);
        alert(`Erro ao excluir anunciante: ${data.error || 'Erro desconhecido'}`);
        
        // Restaurar botão em caso de erro
        if (originalButton) {
          originalButton.disabled = false;
          originalButton.innerHTML = '🗑️ Excluir';
        }
      }
    } catch (error) {
      console.error('Erro ao excluir anunciante:', error);
      alert('Erro ao excluir anunciante');
      
      // Restaurar botão em caso de erro
      if (originalButton) {
        originalButton.disabled = false;
        originalButton.innerHTML = '🗑️ Excluir';
      }
    }
  };

  const getStatusColor = (status: string, emailVerificado: boolean) => {
    if (status === 'email_confirmado' && emailVerificado) {
      return 'bg-green-100 text-green-800';
    }
    if (status === 'cadastro_simples' && !emailVerificado) {
      return 'bg-yellow-100 text-yellow-800';
    }
    if (status === 'cadastro_concluido') {
      return 'bg-blue-100 text-blue-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (loading) {
    return <div className="p-8">Carregando anunciantes...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administração de Anunciantes</h1>
          <p className="text-gray-600">Total: {advertisers.length} anunciantes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              console.log('🔥 RESETANDO ESTADO COMPLETO...');
              setLoading(true);
              setAdvertisers([]); // Limpa o estado
              setRefreshKey(prev => prev + 1); // Força re-render
              fetchAdvertisers();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            🔄 Atualizar Lista
          </button>
          <button
            onClick={() => {
              console.log('Abrindo Database Explorer para comparação...');
              window.open('https://gfauto.vercel.app/api/database-explorer/Advertiser', '_blank');
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            title="Abrir Database Explorer para verificar dados reais"
          >
            🔍 Ver DB
          </button>
          <button
            onClick={() => {
              console.log('🔥 HARD REFRESH - Resetando tudo...');
              setAdvertisers([]);
              setRefreshKey(prev => prev + 1);
              window.location.reload();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            title="Recarrega a página completamente, ignorando todos os caches"
          >
            🔥 Hard Refresh
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={refreshKey}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anunciante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localização
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado em
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {advertisers.map((advertiser) => (
                <tr key={advertiser.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {advertiser.nomeResponsavel}
                      </div>
                      <div className="text-sm text-gray-500">
                        {advertiser.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {advertiser.cpf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      advertiser.planoEscolhido === 'premium' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {advertiser.planoEscolhido}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(advertiser.statusCadastro, advertiser.emailVerificado)}`}>
                      {advertiser.emailVerificado ? '✅ Confirmado' : '⏳ Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {advertiser.cidade} - {advertiser.estado}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(advertiser.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => deleteAdvertiser(advertiser.id, advertiser.nomeResponsavel)}
                      data-delete-id={advertiser.id}
                      className="text-red-600 hover:text-red-900 ml-4 px-3 py-1 rounded border border-red-300 hover:bg-red-50 transition-colors"
                      title="Excluir anunciante"
                    >
                      🗑️ Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
