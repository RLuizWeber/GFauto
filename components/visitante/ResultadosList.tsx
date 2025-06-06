// Caminho: /components/visitante/ResultadosList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Fornecedor {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  email: string;
  website: string;
  tipo: 'premium' | 'cortesia';
}

interface ResultadosListProps {
  cidadeId?: string;
  especialidadeId?: string;
  page?: number;
  fornecedores?: Fornecedor[];
}

export default function ResultadosList({ cidadeId, especialidadeId, page = 1, fornecedores: fornecedoresProp }: ResultadosListProps) {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(fornecedoresProp || []);
  const [loading, setLoading] = useState(!fornecedoresProp);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Se fornecedores foram passados como prop, não precisamos buscar
    if (fornecedoresProp) {
      setFornecedores(fornecedoresProp);
      setLoading(false);
      return;
    }
    
    // Se não temos cidadeId ou especialidadeId, não podemos buscar
    if (!cidadeId || !especialidadeId) {
      setError('Parâmetros de busca insuficientes');
      setLoading(false);
      return;
    }
    
    const fetchFornecedores = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/fornecedores?cidade_id=${cidadeId}&especialidade_id=${especialidadeId}&page=${page}`
        );
        
        if (!response.ok) {
          throw new Error('Falha ao buscar fornecedores');
        }
        
        const data = await response.json();
        setFornecedores(data);
      } catch (err) {
        console.error('Erro ao buscar fornecedores:', err);
        setError('Não foi possível carregar os fornecedores. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFornecedores();
  }, [cidadeId, especialidadeId, page, fornecedoresProp]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }
  
  if (fornecedores.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        <p>Nenhum fornecedor encontrado para esta busca.</p>
        <p className="mt-2">Tente selecionar outra cidade ou especialidade.</p>
      </div>
    );
  }
  
  // Separar fornecedores por tipo
  const fornecedoresPremium = fornecedores.filter(f => f.tipo === 'premium');
  const fornecedoresCortesia = fornecedores.filter(f => f.tipo === 'cortesia');
  
  return (
    <div>
      {/* Fornecedores Premium */}
      {fornecedoresPremium.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Fornecedores Premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fornecedoresPremium.map((fornecedor) => (
              <div 
                key={fornecedor.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{fornecedor.nome}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Premium</span>
                  </div>
                  <p className="text-gray-700 mb-4">{fornecedor.descricao}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600"><strong>Endereço:</strong> {fornecedor.endereco}</p>
                    <p className="text-sm text-gray-600"><strong>Telefone:</strong> {fornecedor.telefone}</p>
                    {fornecedor.email && (
                      <p className="text-sm text-gray-600"><strong>Email:</strong> {fornecedor.email}</p>
                    )}
                    {fornecedor.website && (
                      <p className="text-sm text-gray-600">
                        <strong>Website:</strong> <a href={fornecedor.website.startsWith('http') ? fornecedor.website : `https://${fornecedor.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{fornecedor.website}</a>
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <Link 
                      href={`/fornecedor/${fornecedor.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Fornecedores Cortesia */}
      {fornecedoresCortesia.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-700">Fornecedores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fornecedoresCortesia.map((fornecedor) => (
              <div 
                key={fornecedor.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{fornecedor.nome}</h3>
                  <p className="text-gray-700 mb-4">{fornecedor.descricao}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600"><strong>Endereço:</strong> {fornecedor.endereco}</p>
                    <p className="text-sm text-gray-600"><strong>Telefone:</strong> {fornecedor.telefone}</p>
                    {fornecedor.email && (
                      <p className="text-sm text-gray-600"><strong>Email:</strong> {fornecedor.email}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
