"use client";
import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiList, FiUsers, FiShoppingCart } from 'react-icons/fi';
import { Column } from 'react-table';

// Importando componentes existentes
import MetricCard from '../components/ui/MetricCard';
import TrendChart from '../components/ui/TrendChart';
import DataTable from '../components/ui/DataTable';

// Importando novos componentes do Dashboard
import DashboardMetricCard from '../components/dashboard/MetricCard';
import DashboardTrendChart from '../components/dashboard/TrendChart';
import RecentItemsTable from '../components/dashboard/RecentItemsTable';

const DashboardPage = () => {
  // Estado para controlar qual versão do dashboard mostrar
  const [showNewDashboard, setShowNewDashboard] = useState(false);
  
  // Dados de exemplo para métricas (versão atual)
  const metrics = [
    { title: 'Total de Anúncios', value: '156', change: 12.5, changeLabel: 'vs. mês anterior', icon: <FiList size={20} />, color: 'blue' },
    { title: 'Pagamentos', value: 'R$ 24.550,00', change: 8.2, changeLabel: 'vs. mês anterior', icon: <FiDollarSign size={20} />, color: 'green' },
    { title: 'Novos Usuários', value: '38', change: -2.4, changeLabel: 'vs. mês anterior', icon: <FiUsers size={20} />, color: 'purple' },
    { title: 'Taxa de Conversão', value: '3.2%', change: 1.1, changeLabel: 'vs. mês anterior', icon: <FiShoppingCart size={20} />, color: 'yellow' },
  ];

  // Dados de exemplo para o gráfico de tendências (versão atual)
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Pagamentos',
        data: [12500, 15200, 18900, 16700, 22300, 24550],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Anúncios',
        data: [95, 120, 135, 142, 148, 156],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
      },
    ],
  };

  // Dados de exemplo para a tabela de transações recentes (versão atual)
  const columns: Column<{
    id: string;
    anuncio: string;
    cliente: string;
    valor: string;
    data: string;
    status: string;
  }>[] = [
    { Header: 'ID', accessor: 'id' as const },
    { Header: 'Anúncio', accessor: 'anuncio' as const },
    { Header: 'Cliente', accessor: 'cliente' as const },
    { Header: 'Valor', accessor: 'valor' as const },
    { Header: 'Data', accessor: 'data' as const },
    { Header: 'Status', accessor: 'status' as const },
  ];

  const transacoes = [
    { id: '#1234', anuncio: 'Honda Civic 2022', cliente: 'João Silva', valor: 'R$ 1.200,00', data: '22/05/2025', status: 'Aprovado' },
    { id: '#1235', anuncio: 'Toyota Corolla 2023', cliente: 'Maria Oliveira', valor: 'R$ 1.500,00', data: '21/05/2025', status: 'Aprovado' },
    { id: '#1236', anuncio: 'Hyundai HB20 2021', cliente: 'Pedro Santos', valor: 'R$ 950,00', data: '20/05/2025', status: 'Pendente' },
    { id: '#1237', anuncio: 'Fiat Argo 2022', cliente: 'Ana Costa', valor: 'R$ 850,00', data: '19/05/2025', status: 'Aprovado' },
    { id: '#1238', anuncio: 'Volkswagen Gol 2020', cliente: 'Carlos Ferreira', valor: 'R$ 780,00', data: '18/05/2025', status: 'Recusado' },
  ];

  // Dados para o novo Dashboard
  const [isLoading, setIsLoading] = useState(true);
  const [metricas, setMetricas] = useState({
    totalAnuncios: 156,
    anunciosPublicados: 124,
    totalPagamentos: 138,
    pagamentosAprovados: 112,
    novosAnunciantes: 35,
    taxaConversao: 3.2
  });
  const [tendenciaAnuncios, setTendenciaAnuncios] = useState({
    labels: [] as string[],
    dados: [] as number[]
  });
  const [tendenciaPagamentos, setTendenciaPagamentos] = useState({
    labels: [] as string[],
    dados: [] as number[]
  });
  const [anunciosRecentes, setAnunciosRecentes] = useState<any[]>([]);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30d');

  // Função para carregar dados do novo Dashboard
  const carregarDados = async () => {
    setIsLoading(true);
    
    try {
      // Simulação de dados para demonstração
      setTimeout(() => {
        // Dados simulados para tendências
        const ultimosMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
        setTendenciaAnuncios({
          labels: ultimosMeses,
          dados: [23, 28, 32, 41, 32]
        });
        setTendenciaPagamentos({
          labels: ultimosMeses,
          dados: [18, 22, 27, 35, 36]
        });
        
        // Dados simulados para anúncios recentes
        setAnunciosRecentes([
          {
            id: '1234',
            status: 'PUBLICADO',
            createdAt: new Date(2025, 4, 25),
            advertiserName: 'João Silva',
            advertiserEmail: 'joao@exemplo.com',
            paymentAmount: 30.00,
            paymentStatus: 'APPROVED'
          },
          {
            id: '1235',
            status: 'PUBLICADO',
            createdAt: new Date(2025, 4, 24),
            advertiserName: 'Maria Oliveira',
            advertiserEmail: 'maria@exemplo.com',
            paymentAmount: 30.00,
            paymentStatus: 'APPROVED'
          },
          {
            id: '1236',
            status: 'AGUARDANDO_PAGAMENTO',
            createdAt: new Date(2025, 4, 23),
            advertiserName: 'Pedro Santos',
            advertiserEmail: 'pedro@exemplo.com'
          },
          {
            id: '1237',
            status: 'PUBLICADO',
            createdAt: new Date(2025, 4, 22),
            advertiserName: 'Ana Costa',
            advertiserEmail: 'ana@exemplo.com',
            paymentAmount: 30.00,
            paymentStatus: 'APPROVED'
          },
          {
            id: '1238',
            status: 'EXPIRADO',
            createdAt: new Date(2025, 4, 20),
            advertiserName: 'Carlos Ferreira',
            advertiserEmail: 'carlos@exemplo.com',
            paymentAmount: 30.00,
            paymentStatus: 'APPROVED'
          }
        ]);
        
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      setIsLoading(false);
    }
  };

  // Carregar dados quando o componente montar ou o período mudar
  useEffect(() => {
    if (showNewDashboard) {
      carregarDados();
    }
  }, [showNewDashboard, periodoSelecionado]);

  // Colunas para a tabela de anúncios recentes (novo Dashboard)
  const colunasAnuncios = [
    { header: 'ID', accessor: 'id' },
    { 
      header: 'Status', 
      accessor: (anuncio: any) => {
        const statusMap: Record<string, { label: string, className: string }> = {
          'PUBLICADO': { label: 'Publicado', className: 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs' },
          'AGUARDANDO_PAGAMENTO': { label: 'Aguardando Pagamento', className: 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs' },
          'EXPIRADO': { label: 'Expirado', className: 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs' }
        };
        
        const { label, className } = statusMap[anuncio.status] || { label: anuncio.status, className: 'text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs' };
        
        return <span className={className}>{label}</span>;
      }
    },
    { 
      header: 'Data', 
      accessor: (anuncio: any) => {
        return new Intl.DateTimeFormat('pt-BR').format(anuncio.createdAt);
      }
    },
    { header: 'Anunciante', accessor: 'advertiserName' },
    { 
      header: 'Pagamento', 
      accessor: (anuncio: any) => {
        if (!anuncio.paymentAmount) return 'Pendente';
        return `R$ ${anuncio.paymentAmount.toFixed(2)}`;
      }
    }
  ];

  // Handler para mudança de período
  const handlePeriodoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriodoSelecionado(e.target.value);
  };

  // Handler para clique em anúncio
  const handleAnuncioClick = (anuncio: any) => {
    console.log('Navegando para anúncio:', anuncio.id);
  };

  // Renderização do Dashboard atual
  const renderCurrentDashboard = () => (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Visão geral do desempenho da plataforma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeLabel={metric.changeLabel}
            icon={metric.icon}
            color={metric.color as "blue" | "green" | "red" | "yellow" | "purple"}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TrendChart
          title="Tendência de Pagamentos e Anúncios"
          data={chartData}
          height={350}
        />
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Distribuição por Categoria</h2>
          {/* Aqui entraria um gráfico de distribuição por categoria */}
          <div className="h-[350px] flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Gráfico de distribuição por categoria</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Transações Recentes</h2>
        <DataTable
          columns={columns}
          data={transacoes}
          pagination={true}
          itemsPerPage={5}
        />
      </div>
    </>
  );

  // Renderização do novo Dashboard
  const renderNewDashboard = () => (
    <div className="space-y-6">
      {/* Cabeçalho com título e filtros */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Visão geral do desempenho da plataforma</p>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="periodo" className="text-sm font-medium text-gray-700">
            Período:
          </label>
          <select
            id="periodo"
            value={periodoSelecionado}
            onChange={handlePeriodoChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="1y">Último ano</option>
          </select>
          <button
            onClick={() => carregarDados()}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar
          </button>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardMetricCard
          title="Total de Anúncios"
          value={metricas.totalAnuncios}
          change={12.5}
          icon={<FiList className="h-6 w-6" />}
          isLoading={isLoading}
        />
        <DashboardMetricCard
          title="Anúncios Publicados"
          value={metricas.anunciosPublicados}
          change={8.3}
          icon={<FiList className="h-6 w-6" />}
          isLoading={isLoading}
        />
        <DashboardMetricCard
          title="Total de Pagamentos"
          value={`R$ ${(metricas.pagamentosAprovados * 30).toFixed(2)}`}
          change={15.2}
          icon={<FiDollarSign className="h-6 w-6" />}
          isLoading={isLoading}
        />
        <DashboardMetricCard
          title="Novos Anunciantes"
          value={metricas.novosAnunciantes}
          change={-2.4}
          icon={<FiUsers className="h-6 w-6" />}
          isLoading={isLoading}
        />
      </div>

      {/* Gráficos de tendência */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardTrendChart
          title="Tendência de Anúncios"
          labels={tendenciaAnuncios.labels}
          datasets={[
            {
              label: 'Anúncios',
              data: tendenciaAnuncios.dados,
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
            }
          ]}
          isLoading={isLoading}
        />
        <DashboardTrendChart
          title="Tendência de Pagamentos"
          labels={tendenciaPagamentos.labels}
          datasets={[
            {
              label: 'Pagamentos',
              data: tendenciaPagamentos.dados,
              borderColor: 'rgb(16, 185, 129)',
              backgroundColor: 'rgba(16, 185, 129, 0.5)',
            }
          ]}
          isLoading={isLoading}
        />
      </div>

      {/* Tabela de anúncios recentes */}
      <div>
        <RecentItemsTable
          title="Anúncios Recentes"
          columns={colunasAnuncios}
          data={anunciosRecentes}
          isLoading={isLoading}
          emptyMessage="Nenhum anúncio encontrado no período selecionado"
          onRowClick={handleAnuncioClick}
        />
      </div>
    </div>
  );

  return (
    <div>
      {/* Toggle para alternar entre os dashboards */}
      <div className="mb-4 flex items-center">
        <span className="mr-2 text-sm font-medium text-gray-700">
          {showNewDashboard ? 'Usando novo Dashboard' : 'Usando Dashboard atual'}
        </span>
        <button
          onClick={() => setShowNewDashboard(!showNewDashboard)}
          className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
        >
          {showNewDashboard ? 'Voltar para Dashboard atual' : 'Testar novo Dashboard'}
        </button>
      </div>

      {/* Renderiza o dashboard selecionado */}
      {showNewDashboard ? renderNewDashboard() : renderCurrentDashboard()}
    </div>
  );
};

export default DashboardPage;
