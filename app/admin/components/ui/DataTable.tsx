"use client";
import React from 'react';
import { Column } from 'react-table';

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  pagination?: boolean;
  itemsPerPage?: number;
}

const DataTable = <T extends object>({
  columns,
  data,
  onRowClick,
  pagination = false,
  itemsPerPage = 10,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const paginatedData = React.useMemo(() => {
    if (!pagination) return data;
    const start = currentPage * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage, pagination]);

  const totalPages = React.useMemo(() => {
    return pagination ? Math.ceil(data.length / itemsPerPage) : 1;
  }, [data.length, itemsPerPage, pagination]);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {/* Aqui está a alteração para resolver o erro de tipagem */}
                {column.Header as React.ReactNode}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  {String(
                    // @ts-ignore - Acessando a propriedade dinamicamente
                    row[column.accessor as keyof T] || ''
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {pagination && totalPages > 1 && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className={`px-3 py-1 rounded ${
              currentPage === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage + 1} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages - 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;