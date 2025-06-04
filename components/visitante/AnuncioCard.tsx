// Caminho: /components/visitante/AnuncioCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { formatarTelefone } from '../../utils/formatters';

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

interface AnuncioCardProps {
  anuncio: Anuncio;
  isPremium?: boolean;
}

export default function AnuncioCard({ anuncio, isPremium = false }: AnuncioCardProps) {
  // Definir uma imagem padrão caso a imagem principal não esteja disponível
  const imagemUrl = anuncio.imagemPrincipal || 
    (anuncio.imagens && anuncio.imagens.length > 0 ? anuncio.imagens[0].url : '/placeholder.jpg');
  
  console.log('Renderizando anúncio:', anuncio.titulo, 'Imagem:', imagemUrl);
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isPremium ? 'border-l-4 border-yellow-400' : ''} mb-4`}>
      {/* Layout horizontal com 3 colunas: Imagem | Dados | Botões */}
      <div className="flex flex-col md:flex-row">
        {/* Coluna 1: Imagem à esquerda */}
        <div className="md:w-1/4 p-4">
          {isPremium && (
            <div className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
              PREMIUM
            </div>
          )}
          <div className="relative w-full h-32 bg-gray-100 rounded-lg">
            {/* Usar div com background-image como fallback para garantir que algo seja exibido */}
            <div 
              className="absolute inset-0 bg-cover bg-center rounded-lg" 
              style={{ backgroundImage: `url(${imagemUrl})` }}
            ></div>
            
            {/* Tentar carregar a imagem com o componente Image */}
            <Image 
              src={imagemUrl} 
              alt={anuncio.titulo} 
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover rounded-lg"
              onError={(e) => {
                // Fallback para uma imagem padrão em caso de erro
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.jpg';
              }}
            />
          </div>
        </div>
        
        {/* Coluna 2: Dados do anunciante no meio */}
        <div className="md:w-2/4 p-4 border-r border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{anuncio.titulo}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{anuncio.descricao}</p>
          
          <div className="flex items-center text-gray-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{anuncio.endereco}</span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm">{formatarTelefone(anuncio.telefone)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm">{anuncio.cidade.nome}, {anuncio.cidade.estado.sigla}</span>
          </div>
          
          <div className="mt-2 text-sm text-gray-500">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">
              {anuncio.especialidade.nome}
            </span>
          </div>
        </div>
        
        {/* Coluna 3: Botões à direita */}
        <div className="md:w-1/4 p-4 flex flex-col justify-center space-y-3">
          <Link 
            href={`/anuncio/${anuncio.id}`}
            className="w-full px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors"
          >
            Ver Detalhes
          </Link>
          
          <Link 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(anuncio.endereco)}`}
            target="_blank"
            className="w-full px-4 py-2 bg-green-600 text-white text-center rounded hover:bg-green-700 transition-colors"
          >
            Ver no Mapa
          </Link>
          
          {anuncio.whatsapp && (
            <Link 
              href={`https://wa.me/${anuncio.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              className="w-full px-4 py-2 bg-green-500 text-white text-center rounded hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm.03 5.976a6.048 6.048 0 0 1 6.047 6.046c0 3.34-2.707 6.046-6.047 6.046a6.048 6.048 0 0 1-6.047-6.046c0-3.34 2.707-6.046 6.047-6.046z" fillRule="evenodd" clipRule="evenodd"/>
              </svg>
              WhatsApp
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
