// Caminho: /app/resultados/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ResultadosList from '@/components/visitante/ResultadosList';

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

export default function ResultadosPage() {
  const searchParams = useSearchParams();
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Parâmetros da busca
  const estado = searchParams.get('estado');
  const cidade = searchParams.get('cidade');
  const especialidade = searchParams.get('especialidade');
  const cidadeId = searchParams.get('cidade_id');
  const especialidadeId = searchParams.get('especialidade_id');
  
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        setLoading(true);
        
        // Construir a URL da API com base nos parâmetros disponíveis
        let apiUrl = '/api/fornecedores?';
        
        if (cidadeId && especialidadeId) {
          apiUrl += `cidade_id=${cidadeId}&especialidade_id=${especialidadeId}`;
        } else if (cidade && especialidade) {
          apiUrl += `cidade=${encodeURIComponent(cidade)}&especialidade=${encodeURIComponent(especialidade)}`;
        } else {
          throw new Error('Parâmetros de busca insuficientes');
        }
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Falha ao buscar fornecedores');
        }
        
        const data = await response.json();
        setFornecedores(data);
      } catch (err) {
        console.error('Erro ao buscar fornecedores:', err);
        setError('Não foi possível encontrar resultados para esta busca.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFornecedores();
  }, [cidadeId, especialidadeId, cidade, especialidade]);
  
  // Construir a string de filtros aplicados com espaçamento correto
  const filtrosAplicados = [
    estado ? `Estado: ${estado}` : null,
    cidade ? `Cidade: ${cidade}` : null,
    especialidade ? `Especialidade: ${especialidade}` : null
  ].filter(Boolean).join(' | ');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resultados da Busca</h1>
      
      {filtrosAplicados && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Filtros aplicados:</h2>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded">
            {filtrosAplicados}
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">
          <p>Carregando resultados...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
          <p className="mt-2">Por favor, verifique os termos da busca e tente novamente.</p>
        </div>
      ) : fornecedores.length > 0 ? (
        <ResultadosList fornecedores={fornecedores} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-6">
          <p>Não foi possível encontrar resultados para esta busca.</p>
          <p className="mt-2">Por favor, verifique os termos da busca e tente novamente.</p>
        </div>
      )}
    </div>
  );
}
