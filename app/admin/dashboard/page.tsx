"use client";
import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import MetricCard from '../components/ui/MetricCard';
import TrendChart from '../components/ui/TrendChart';
import DataTable from '../components/ui/DataTable';
import { FiDollarSign, FiList, FiUsers, FiShoppingCart } from 'react-icons/fi';
import { Column } from 'react-table';

const DashboardPage = () => {
  // Dados de exemplo para métricas
  const metrics = [
    { title: 'Total de Anúncios', value: '156', change: 12.5, changeLabel: 'vs. mês anterior', icon: <FiList size={20} />, color: 'blue' },
    { title: 'Pagamentos', value: 'R$ 24.550,00', change: 8.2, changeLabel: 'vs. mês anterior', icon: <FiDollarSign size={20} />, color: 'green' },
    { title: 'Novos Usuários', value: '38', change: -2.4, changeLabel: 'vs. mês anterior', icon: <FiUsers size={20} />, color: 'purple' },
    { title: 'Taxa de Conversão', value: '3.2%', change: 1.1, changeLabel: 'vs. mês anterior', icon: <FiShoppingCart size={20} />, color: 'yellow' },
  ];

  // Dados de exemplo para o gráfico de tendências
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

  // Dados de exemplo para a tabela de transações recentes
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

  return (
    <AdminLayout>
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
    </AdminLayout>
  );
};

export default DashboardPage;