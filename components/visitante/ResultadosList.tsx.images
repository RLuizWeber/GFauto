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
              titulo: 'Mecânica Exemplo Premium',
              descricao: 'Oficina especializada em carros importados com mais de 20 anos de experiência. Atendemos todas as marcas e modelos, com garantia de serviço e peças originais.',
              endereco: 'Av. Brasil, 1500, Centro, Passo Fundo, RS',
              telefone: '5499999999',
              whatsapp: '5499999999',
              email: 'contato@mecanicaexemplo.com',
              site: 'https://mecanicaexemplo.com',
              plano: 'premium',
              imagemPrincipal: '/images/anuncios/mecanica1.jpg',
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
              descricao: 'Especialistas em sistema elétrico automotivo. Atendemos todas as marcas e modelos, com serviços de injeção eletrônica, ar condicionado, alarmes e travas.',
              endereco: 'Rua das Palmeiras, 123, Bairro São José, Passo Fundo, RS',
              telefone: '5499888888',
              whatsapp: '5499888888',
              email: 'contato@autoeletricacentral.com',
              site: null,
              plano: 'premium',
              imagemPrincipal: '/images/anuncios/autoeletrica1.jpg',
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
              descricao: 'A maior loja de autopeças da região. Peças originais com garantia para todas as marcas nacionais e importadas. Entrega para todo o Brasil.',
              endereco: 'Av. Principal, 500, Centro, Passo Fundo, RS',
              telefone: '5499777777',
              whatsapp: '5499777777',
              email: 'vendas@autopecas.com',
              site: 'https://autopecas.com',
              plano: 'basico',
              imagemPrincipal: '/images/anuncios/autopecas1.jpg',
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
            },
            {
              id: '4',
              titulo: 'Funilaria e Pintura Express',
              descricao: 'Serviços de funilaria e pintura com qualidade e rapidez. Atendemos seguradoras e particulares. Orçamento sem compromisso.',
              endereco: 'Rua dos Técnicos, 789, Vila Nova, Passo Fundo, RS',
              telefone: '5499666666',
              whatsapp: '5499666666',
              email: 'contato@funilariaexpress.com',
              site: null,
              plano: 'basico',
              imagemPrincipal: '/images/anuncios/mecanica1.jpg',
              imagens: [],
              especialidade: {
                id: '4',
                nome: 'Funilaria e Pintura'
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
              id: '5',
              titulo: 'Centro Automotivo Total',
              descricao: 'Serviços completos para seu veículo: mecânica, elétrica, funilaria, pintura e muito mais. Equipe especializada e preços justos.',
              endereco: 'Av. das Indústrias, 456, Distrito Industrial, Passo Fundo, RS',
              telefone: '5499555555',
              whatsapp: '5499555555',
              email: 'atendimento@centroautomotivo.com',
              site: 'https://centroautomotivo.com',
              plano: 'premium',
              imagemPrincipal: '/images/anuncios/autoeletrica1.jpg',
              imagens: [],
              especialidade: {
                id: '5',
                nome: 'Centro Automotivo'
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
            total: 5,
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
