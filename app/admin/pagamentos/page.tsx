import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import TrendChart from '../components/ui/TrendChart';
import { Column } from 'react-table';

const PagamentosPage = () => {
  // Filtros de exemplo
  const filters = [
    {
      name: 'status',
      label: 'Status',
      options: [
        { value: 'aprovado', label: 'Aprovado' },
        { value: 'pendente', label: 'Pendente' },
        { value: 'recusado', label: 'Recusado' },
        { value: 'estornado', label: 'Estornado' },
      ],
    },
    {
      name: 'metodo',
      label: 'Método de Pagamento',
      options: [
        { value: 'cartao', label: 'Cartão de Crédito' },
        { value: 'boleto', label: 'Boleto' },
        { value: 'pix', label: 'PIX' },
      ],
    },
    {
      name: 'periodo',
      label: 'Período',
      options: [
        { value: 'hoje', label: 'Hoje' },
        { value: 'semana', label: 'Esta semana' },
        { value: 'mes', label: 'Este mês' },
        { value: 'trimestre', label: 'Este trimestre' },
        { value: 'ano', label: 'Este ano' },
      ],
    },
  ];

  // Dados de exemplo para a tabela de pagamentos
  const columns: Column<{
    id: string;
    anuncio: string;
    cliente: string;
    valor: string;
    metodo: string;
    status: string;
    data: string;
  }>[] = [
    { Header: 'ID', accessor: 'id' as const },
    { Header: 'Anúncio', accessor: 'anuncio' as const },
    { Header: 'Cliente', accessor: 'cliente' as const },
    { Header: 'Valor', accessor: 'valor' as const },
    { Header: 'Método', accessor: 'metodo' as const },
    { Header: 'Status', accessor: 'status' as const },
    { Header: 'Data', accessor: 'data' as const },
  ];

  const pagamentos = [
    { id: '#P1234', anuncio: 'Honda Civic 2022', cliente: 'João Silva', valor: 'R$ 1.200,00', metodo: 'Cartão de Crédito', status: 'Aprovado', data: '22/05/2025' },
    { id: '#P1235', anuncio: 'Toyota Corolla 2023', cliente: 'Maria Oliveira', valor: 'R$ 1.500,00', metodo: 'PIX', status: 'Aprovado', data: '21/05/2025' },
    { id: '#P1236', anuncio: 'Hyundai HB20 2021', cliente: 'Pedro Santos', valor: 'R$ 950,00', metodo: 'Boleto', status: 'Pendente', data: '20/05/2025' },
    { id: '#P1237', anuncio: 'Fiat Argo 2022', cliente: 'Ana Costa', valor: 'R$ 850,00', metodo: 'Cartão de Crédito', status: 'Aprovado', data: '19/05/2025' },
    { id: '#P1238', anuncio: 'Volkswagen Gol 2020', cliente: 'Carlos Ferreira', valor: 'R$ 780,00', metodo: 'PIX', status: 'Recusado', data: '18/05/2025' },
    { id: '#P1239', anuncio: 'Jeep Compass 2023', cliente: 'Fernanda Lima', valor: 'R$ 1.800,00', metodo: 'Cartão de Crédito', status: 'Aprovado', data: '17/05/2025' },
    { id: '#P1240', anuncio: 'Ford Ranger 2021', cliente: 'Roberto Alves', valor: 'R$ 1.950,00', metodo: 'Boleto', status: 'Aprovado', data: '16/05/2025' },
    { id: '#P1241', anuncio: 'Chevrolet Onix 2022', cliente: 'Juliana Mendes', valor: 'R$ 720,00', metodo: 'PIX', status: 'Pendente', data: '15/05/2025' },
    { id: '#P1242', anuncio: 'Nissan Kicks 2023', cliente: 'Marcelo Souza', valor: 'R$ 1.150,00', metodo: 'Cartão de Crédito', status: 'Aprovado', data: '14/05/2025' },
    { id: '#P1243', anuncio: 'Renault Kwid 2021', cliente: 'Camila Rocha', valor: 'R$ 480,00', metodo: 'PIX', status: 'Estornado', data: '13/05/2025' },
  ];

  // Dados de exemplo para o gráfico de tendências
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Pagamentos Aprovados',
        data: [12500, 15200, 18900, 16700, 22300, 24550],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
      {
        label: 'Pagamentos Recusados',
        data: [1200, 980, 1500, 1100, 1300, 1050],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
    ],
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    console.log('Filtros aplicados:', filters);
    // Aqui seria implementada a lógica para filtrar os pagamentos
  };

  const handleSearchChange = (searchTerm: string) => {
    console.log('Termo de busca:', searchTerm);
    // Aqui seria implementada a lógica para buscar pagamentos
  };

  const handleRowClick = (row: any) => {
    console.log('Pagamento selecionado:', row);
    // Aqui seria implementada a navegação para a página de detalhes do pagamento
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pagamentos</h1>
        <p className="text-gray-600">Gerencie e analise todos os pagamentos da plataforma</p>
      </div>

      <div className="mb-6">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Buscar pagamentos..."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TrendChart
          title="Tendência de Pagamentos"
          data={chartData}
          height={350}
        />
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Distribuição por Método de Pagamento</h2>
          {/* Aqui entraria um gráfico de distribuição por método de pagamento */}
          <div className="h-[350px] flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Gráfico de distribuição por método de pagamento</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-end mb-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Exportar Relatório
          </button>
        </div>

        <DataTable
          columns={columns}
          data={pagamentos}
          onRowClick={handleRowClick}
          pagination={true}
          itemsPerPage={10}
        />
      </div>
    </AdminLayout>
  );
};

export default PagamentosPage;