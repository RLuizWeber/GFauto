"use client";
import React from 'react';
import { Column } from 'react-table';

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
}

const DataTable = <T extends object>({
  columns,
  data,
  onRowClick,
  isLoading = false,
  pagination = true,
  itemsPerPage = 10
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      {isLoading ? (
        <div className="p-4 flex justify-center">
          <p>Carregando dados...</p>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.Header as React.ReactNode}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Simplified for example - would need accessor implementation */}
                      {String(row[column.accessor as keyof T] || '')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhum dado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      
      {pagination && data.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{Math.min(itemsPerPage, data.length)}</span> de{' '}
                <span className="font-medium">{data.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Anterior
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Próxima
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;