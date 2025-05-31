'use client';

import { useState, useEffect } from 'react';
import AnuncioCard from './AnuncioCard';
import Pagination from './Pagination';

interface Anuncio {
  id: string;
  titulo: string;
  descricao: string;
  endereco: string;
  telefone: string;
  whatsapp: string | null;
  email: string | null;
  site: string | null;
  plano: 'premium' | 'cortesia';
  imagemPrincipal: string | null;
  latitude: number | null;
  longitude: number | null;
  imagens: {
    id: number;
    url: string;
    ordem: number;
  }[];
}

interface ResultadosProps {
  cidadeId: string;
  especialidadeId: string;
  page: number;
}

export default function ResultadosList({ cidadeId, especialidadeId, page }: ResultadosProps) {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: page || 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/anuncios?cidade_id=${cidadeId}&especialidade_id=${especialidadeId}&page=${page}&pageSize=${pagination.pageSize}`
        );
        
        if (!response.ok) {
          throw new Error('Erro ao buscar anúncios');
        }
        
        const data = await response.json();
        setAnuncios(data.anuncios);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Erro ao buscar anúncios:', error);
        setError('Não foi possível carregar os resultados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnuncios();
  }, [cidadeId, especialidadeId, page, pagination.pageSize]);

  if (loading) {
    return <div className="text-center py-12">Carregando resultados...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  if (anuncios.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Nenhum resultado encontrado</h2>
        <p className="text-gray-600 mb-6">
          Não encontramos serviços para esta especialidade na cidade selecionada.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Voltar à Página Inicial
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-gray-600">
          Encontramos {pagination.total} resultado(s) para sua busca
        </p>
      </div>
      
      <div className="space-y-6">
        {anuncios.map((anuncio) => (
          <AnuncioCard key={anuncio.id} anuncio={anuncio} />
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
