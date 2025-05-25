"use client";
// Comentário para forçar um novo deploy na Vercel - [25/05/2025]
import React from 'react';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';

interface FilterBarProps {
  onFilterChange?: (filters: Record<string, any>) => void;
  onSearchChange?: (searchTerm: string) => void;
  filters?: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  searchPlaceholder?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  onSearchChange,
  filters = [],
  searchPlaceholder = 'Buscar...'
}) => {
  const [activeFilters, setActiveFilters] = React.useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const handleFilterChange = (filterName: string, value: any) => {
    const newFilters = {
      ...activeFilters,
      [filterName]: value
    };
    
    setActiveFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange && onSearchChange(e.target.value);
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange && onFilterChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 mb-4 md:mb-0 md:mr-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex items-center">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FiFilter className="mr-2 h-5 w-5 text-gray-400" />
            Filtros
          </button>
          
          {Object.keys(activeFilters).length > 0 && (
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={clearFilters}
            >
              <FiX className="mr-2 h-5 w-5" />
              Limpar Filtros
            </button>
          )}
        </div>
      </div>
      
      {isFilterOpen && filters.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filters.map((filter) => (
            <div key={filter.name} className="flex flex-col">
              <label htmlFor={filter.name} className="block text-sm font-medium text-gray-700 mb-1">
                {filter.label}
              </label>
              <select
                id={filter.name}
                name={filter.name}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={activeFilters[filter.name] || ''}
                onChange={(e) => handleFilterChange(filter.name, e.target.value)}
              >
                <option value="">Todos</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
