"use client";
import React from 'react';
import DataTable from '../components/ui/DataTable';
import FilterBar from '../components/ui/FilterBar';
import { Column } from 'react-table';

const AnunciosPage = () => {
  // Filtros de exemplo
  const filters = [
    {
      name: 'status',
      label: 'Status',
      options: [
        { value: 'ativo', label: 'Ativo' },
        { value: 'pendente', label: 'Pendente' },
        { value: 'expirado', label: 'Expirado' },
        { value: 'removido', label: 'Removido' },
      ],
    },
    {
      name: 'categoria',
      label: 'Categoria',
      options: [
        { value: 'sedan', label: 'Sedan' },
        { value: 'suv', label: 'SUV' },
        { value: 'hatch', label: 'Hatch' },
        { value: 'pickup', label: 'Pickup' },
        { value: 'outro', label: 'Outro' },
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

  // Dados de exemplo para a tabela de anúncios
  const columns: Column<{
    id: string;
    titulo: string;
    categoria: string;
    preco: string;
    status: string;
    data: string;
    visualizacoes: string;
  }>[] = [
    { Header: 'ID', accessor: 'id' as const },
    { Header: 'Título', accessor: 'titulo' as const },
    { Header: 'Categoria', accessor: 'categoria' as const },
    { Header: 'Preço', accessor: 'preco' as const },
    { Header: 'Status', accessor: 'status' as const },
    { Header: 'Data', accessor: 'data' as const },
    { Header: 'Visualizações', accessor: 'visualizacoes' as const },
  ];

  const anuncios = [
    { id: '#A1234', titulo: 'Honda Civic 2022', categoria: 'Sedan', preco: 'R$ 120.000,00', status: 'Ativo', data: '22/05/2025', visualizacoes: '245' },
    { id: '#A1235', titulo: 'Toyota Corolla 2023', categoria: 'Sedan', preco: 'R$ 135.000,00', status: 'Ativo', data: '21/05/2025', visualizacoes: '189' },
    { id: '#A1236', titulo: 'Hyundai HB20 2021', categoria: 'Hatch', preco: 'R$ 75.000,00', status: 'Pendente', data: '20/05/2025', visualizacoes: '132' },
    { id: '#A1237', titulo: 'Fiat Argo 2022', categoria: 'Hatch', preco: 'R$ 68.000,00', status: 'Ativo', data: '19/05/2025', visualizacoes: '98' },
    { id: '#A1238', titulo: 'Volkswagen Gol 2020', categoria: 'Hatch', preco: 'R$ 62.000,00', status: 'Expirado', data: '18/05/2025', visualizacoes: '156' },
    { id: '#A1239', titulo: 'Jeep Compass 2023', categoria: 'SUV', preco: 'R$ 180.000,00', status: 'Ativo', data: '17/05/2025', visualizacoes: '278' },
    { id: '#A1240', titulo: 'Ford Ranger 2021', categoria: 'Pickup', preco: 'R$ 195.000,00', status: 'Ativo', data: '16/05/2025', visualizacoes: '203' },
    { id: '#A1241', titulo: 'Chevrolet Onix 2022', categoria: 'Hatch', preco: 'R$ 72.000,00', status: 'Pendente', data: '15/05/2025', visualizacoes: '167' },
    { id: '#A1242', titulo: 'Nissan Kicks 2023', categoria: 'SUV', preco: 'R$ 115.000,00', status: 'Ativo', data: '14/05/2025', visualizacoes: '192' },
    { id: '#A1243', titulo: 'Renault Kwid 2021', categoria: 'Hatch', preco: 'R$ 48.000,00', status: 'Removido', data: '13/05/2025', visualizacoes: '87' },
  ];

  const handleFilterChange = (filters: Record<string, any>) => {
    console.log('Filtros aplicados:', filters);
    // Aqui seria implementada a lógica para filtrar os anúncios
  };

  const handleSearchChange = (searchTerm: string) => {
    console.log('Termo de busca:', searchTerm);
    // Aqui seria implementada a lógica para buscar anúncios
  };

  const handleRowClick = (row: any) => {
    console.log('Anúncio selecionado:', row);
    // Aqui seria implementada a navegação para a página de detalhes do anúncio
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Anúncios</h1>
        <p className="text-gray-600">Gerencie todos os anúncios da plataforma</p>
      </div>

      <div className="mb-6">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Buscar anúncios..."
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-end mb-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Novo Anúncio
          </button>
        </div>

        <DataTable
          columns={columns}
          data={anuncios}
          onRowClick={handleRowClick}
          pagination={true}
          itemsPerPage={10}
        />
      </div>
    </>
  );
};

export default AnunciosPage;