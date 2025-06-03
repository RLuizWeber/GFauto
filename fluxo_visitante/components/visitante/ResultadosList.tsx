// Caminho: /fluxo_visitante/components/visitante/ResultadosList.tsx
'use client';

import { useState, useEffect } from 'react';
import AnuncioCard from './AnuncioCard';
import Pagination from './Pagination';
import LoadingResults from './LoadingResults';

interface Anuncio {
  id: string; // Alterado de number para string
  titulo: string;
  descricao: string | null;
  endereco: string;
  telefone: string;
  whatsapp: string | null;
  email: string | null;
  site: string | null;
  plano: string;
  imagemPrincipal: string | null;
  imagens: {
    id: string; // Alterado de number para string
    url: string;
    ordem: number;
  }[];
  especialidade: {
    id: string; // Alterado de number para string
    nome: string;
  };
  cidade: {
    id: string; // Alterado de number para string
    nome: string;
    estado: {
      id: string; // Alterado de number para string
      sigla: string;
    };
  };
}

interface ResultadosListProps {
  cidadeId: string;
  especialidadeId: string;
  page: number;
}

export default function ResultadosList({ cidadeId, especialidadeId, page = 1 }: ResultadosListProps) {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page,
    pageSize: 10,
    total: 0,
    totalPages: 0
  });
  
  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/anuncios?cidade_id=${cidadeId}&especialidade_id=${especialidadeId}&page=${page}`
        );
        
        if (!response.ok) {
          throw new Error('Falha ao buscar anúncios');
        }
        
        const data = await response.json();
        setAnuncios(data.anuncios);
        setPagination(data.pagination);
      } catch (err) {
        console.error('Erro ao buscar anúncios:', err);
        setError('Não foi possível carregar os anúncios. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnuncios();
  }, [cidadeId, especialidadeId, page]);
  
  if (loading) {
    return <LoadingResults />;
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }
  
  if (anuncios.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        <p>Nenhum anúncio encontrado para esta busca.</p>
        <p className="mt-2">Tente selecionar outra cidade ou especialidade.</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {anuncios.map((anuncio) => (
          <AnuncioCard 
            key={anuncio.id} 
            anuncio={anuncio} 
            isPremium={anuncio.plano === 'premium'} 
          />
        ))}
      </div>
      
      {pagination.totalPages > 1 && (
        <Pagination 
          currentPage={pagination.page} 
          totalPages={pagination.totalPages} 
          baseUrl={`/resultados?cidade_id=${cidadeId}&especialidade_id=${especialidadeId}`} 
        />
      )}
    </div>
  );
}