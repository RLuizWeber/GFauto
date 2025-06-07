// Caminho: /components/visitante/ResultadosList.tsx
'use client';

import { useState, useEffect } from 'react';
import AnuncioCard from './AnuncioCard';
import Pagination from './Pagination';
import LoadingResults from './LoadingResults';

interface Anuncio {
  id: string;
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
    id: string;
    url: string;
    ordem: number;
  }[];
  especialidade: {
    id: string;
    nome: string;
  };
  cidade: {
    id: string;
    nome: string;
    estado: {
      id: string;
      sigla: string;
    };
  };
}

interface ResultadosListProps {
  estado?: string | null;
  cidade?: string | null;
  especialidade?: string | null;
  cidadeId?: string;
  especialidadeId?: string;
  page?: number;
}

export default function ResultadosList({ 
  estado, 
  cidade, 
  especialidade, 
  cidadeId, 
  especialidadeId, 
  page = 1 
}: ResultadosListProps) {
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
        
        // Construir a URL da API com base nos parâmetros disponíveis
        let apiUrl = '/api/anuncios?';
        
        if (cidadeId) {
          apiUrl += `cidade_id=${cidadeId}&`;
        }
        
        if (especialidadeId) {
          apiUrl += `especialidade_id=${especialidadeId}&`;
        }
        
        // Se temos estado/cidade/especialidade como strings (da busca por texto)
        if (cidade && !cidadeId) {
          apiUrl += `cidade=${encodeURIComponent(cidade)}&`;
        }
        
        if (estado) {
          apiUrl += `estado=${encodeURIComponent(estado)}&`;
        }
        
        if (especialidade && !especialidadeId) {
          apiUrl += `especialidade=${encodeURIComponent(especialidade)}&`;
        }
        
        apiUrl += `page=${page}`;
        
        // Simular dados para desenvolvimento
        // Em produção, isso seria substituído pela chamada real à API
        const mockData = {
          anuncios: [
            {
              id: '1',
              titulo: 'Mecânica Exemplo',
              descricao: 'Oficina especializada em carros importados com mais de 20 anos de experiência.',
              endereco: 'Av. Brasil, 1500, Centro, Passo Fundo',
              telefone: '5499999999',
              whatsapp: '5499999999',
              email: 'contato@mecanicaexemplo.com',
              site: 'https://mecanicaexemplo.com',
              plano: 'premium',
              imagemPrincipal: '/placeholder.jpg',
              imagens: [],
              especialidade: {
                id: '1',
                nome: 'Mecânica Geral'
              },
              cidade: {
                id: '1',
                nome: 'Passo Fundo',
                estado: {
                  id: '1',
                  sigla: 'RS'
                }
              }
            },
            {
              id: '2',
              titulo: 'Auto Elétrica Central',
              descricao: 'Especialistas em sistema elétrico automotivo. Atendemos todas as marcas.',
              endereco: 'Rua das Palmeiras, 123, Bairro São José, Passo Fundo',
              telefone: '5499888888',
              whatsapp: '5499888888',
              email: 'contato@autoeletricacentral.com',
              site: null,
              plano: 'basico',
              imagemPrincipal: '/placeholder.jpg',
              imagens: [],
              especialidade: {
                id: '2',
                nome: 'Auto Elétrica'
              },
              cidade: {
                id: '1',
                nome: 'Passo Fundo',
                estado: {
                  id: '1',
                  sigla: 'RS'
                }
              }
            },
            {
              id: '3',
              titulo: 'Autopeças Genuínas',
              descricao: 'A maior loja de autopeças da região. Peças originais com garantia.',
              endereco: 'Av. Principal, 500, Centro, Passo Fundo',
              telefone: '5499777777',
              whatsapp: null,
              email: 'vendas@autopecas.com',
              site: 'https://autopecas.com',
              plano: 'premium',
              imagemPrincipal: '/placeholder.jpg',
              imagens: [],
              especialidade: {
                id: '3',
                nome: 'Autopeças'
              },
              cidade: {
                id: '1',
                nome: 'Passo Fundo',
                estado: {
                  id: '1',
                  sigla: 'RS'
                }
              }
            }
          ],
          pagination: {
            page: 1,
            pageSize: 10,
            total: 3,
            totalPages: 1
          }
        };
        
        // Na produção, descomente o código abaixo e remova a simulação
        /*
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Falha ao buscar anúncios');
        }
        
        const data = await response.json();
        setAnuncios(data.anuncios);
        setPagination(data.pagination);
        */
        
        // Usando dados simulados para desenvolvimento
        setAnuncios(mockData.anuncios);
        setPagination(mockData.pagination);
        
      } catch (err) {
        console.error('Erro ao buscar anúncios:', err);
        setError('Não foi possível carregar os anúncios. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnuncios();
  }, [cidadeId, especialidadeId, estado, cidade, especialidade, page]);
  
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
  
  // Separar anúncios premium dos regulares
  const anunciosPremium = anuncios.filter(anuncio => anuncio.plano === 'premium');
  const anunciosRegulares = anuncios.filter(anuncio => anuncio.plano !== 'premium');
  
  return (
    <div>
      {/* Seção de anúncios premium */}
      {anunciosPremium.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">PREMIUM</h2>
          <div className="space-y-4">
            {anunciosPremium.map((anuncio) => (
              <AnuncioCard 
                key={anuncio.id} 
                anuncio={anuncio} 
                isPremium={true} 
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Seção de anúncios regulares */}
      {anunciosRegulares.length > 0 && (
        <div>
          {anunciosPremium.length > 0 && (
            <h2 className="text-xl font-bold text-gray-800 mb-4">OUTROS ANÚNCIOS</h2>
          )}
          <div className="space-y-4">
            {anunciosRegulares.map((anuncio) => (
              <AnuncioCard 
                key={anuncio.id} 
                anuncio={anuncio} 
                isPremium={false} 
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Paginação */}
      {pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination 
            currentPage={pagination.page} 
            totalPages={pagination.totalPages} 
            baseUrl={`/resultados?${cidadeId ? `cidade_id=${cidadeId}&` : ''}${especialidadeId ? `especialidade_id=${especialidadeId}&` : ''}${estado ? `estado=${encodeURIComponent(estado)}&` : ''}${cidade ? `cidade=${encodeURIComponent(cidade)}&` : ''}${especialidade ? `especialidade=${encodeURIComponent(especialidade)}&` : ''}`} 
          />
        </div>
      )}
    </div>
  );
}
