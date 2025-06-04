// Caminho: /components/visitante/ResultadosList.tsx
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
  estado: string | null;
  cidade: string | null;
  especialidade: string | null;
  page?: number;
}

export default function ResultadosList({ estado, cidade, especialidade, page = 1 }: ResultadosListProps) {
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
        
        // Simulação de busca de anúncios - em produção, isso seria uma chamada API real
        // Ajuste conforme necessário para integrar com sua API
        setTimeout(() => {
          // Dados simulados para demonstração
          const mockAnuncios = [
            {
              id: "1",
              titulo: "Mecânica Exemplo",
              descricao: "Oficina especializada em carros importados com mais de 20 anos de experiência.",
              endereco: "Rua Exemplo, 123",
              telefone: "1199998888",
              whatsapp: "11999998888",
              email: "contato@mecanicaexemplo.com",
              site: "https://mecanicaexemplo.com",
              plano: "premium",
              imagemPrincipal: "/placeholder.jpg",
              imagens: [{ id: "1", url: "/placeholder.jpg", ordem: 1 }],
              especialidade: { id: "1", nome: "Mecânica Geral" },
              cidade: { id: "1", nome: "São Paulo", estado: { id: "1", sigla: "SP" } }
            },
            {
              id: "2",
              titulo: "Auto Elétrica Modelo",
              descricao: "Serviços completos de auto elétrica para todas as marcas.",
              endereco: "Av. Principal, 456",
              telefone: "1188887777",
              whatsapp: null,
              email: "contato@autoeletrica.com",
              site: null,
              plano: "basico",
              imagemPrincipal: null,
              imagens: [],
              especialidade: { id: "2", nome: "Auto Elétrica" },
              cidade: { id: "1", nome: "São Paulo", estado: { id: "1", sigla: "SP" } }
            },
            {
              id: "3",
              titulo: "Funilaria e Pintura Express",
              descricao: "Reparos rápidos de funilaria e pintura com qualidade premium.",
              endereco: "Rua Secundária, 789",
              telefone: "1177776666",
              whatsapp: "11977776666",
              email: null,
              site: null,
              plano: "premium",
              imagemPrincipal: "/placeholder.jpg",
              imagens: [{ id: "2", url: "/placeholder.jpg", ordem: 1 }],
              especialidade: { id: "3", nome: "Funilaria e Pintura" },
              cidade: { id: "1", nome: "São Paulo", estado: { id: "1", sigla: "SP" } }
            }
          ];
          
          setAnuncios(mockAnuncios);
          setPagination({
            page: 1,
            pageSize: 10,
            total: mockAnuncios.length,
            totalPages: 1
          });
          setLoading(false);
        }, 1500);
        
      } catch (err) {
        console.error('Erro ao buscar anúncios:', err);
        setError('Não foi possível carregar os anúncios. Por favor, tente novamente.');
        setLoading(false);
      }
    };
    
    fetchAnuncios();
  }, [estado, cidade, especialidade, page]);
  
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
          baseUrl={`/resultados?estado=${estado}&cidade=${cidade}&especialidade=${especialidade}`} 
        />
      )}
    </div>
  );
}
