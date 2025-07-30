"use client";

import React from 'react';
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface RecentItemsTableProps<T> {
  title: string;
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

function RecentItemsTable<T extends { id: string }>({
  title,
  columns,
  data,
  isLoading = false,
  emptyMessage = "Nenhum item encontrado",
  onRowClick
}: RecentItemsTableProps<T>) {
  // Renderiza o valor de uma célula baseado no accessor
  const renderCell = (item: T, column: TableColumn<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    
    const value = item[column.accessor as keyof T];
    
    // Formatação especial para datas
    if (value instanceof Date) {
      return format(value, 'dd/MM/yyyy HH:mm', { locale: ptBR });
    }
    
    return value as React.ReactNode;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="p-4 border-b">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="px-6 py-3 text-left">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        {data.length === 0 ? (
          <div className="p-6 text-center text-gray-500">{emptyMessage}</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr 
                  key={item.id} 
                  className={onRowClick ? "hover:bg-gray-50 cursor-pointer" : ""}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ''}`}
                    >
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RecentItemsTable;
