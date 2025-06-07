// Caminho: /components/visitante/AnuncioCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { formatarTelefone } from '../../utils/formatters';

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

interface AnuncioCardProps {
  anuncio: Anuncio;
  isPremium?: boolean;
}

export default function AnuncioCard({ anuncio, isPremium = false }: AnuncioCardProps) {
  const imagemUrl = anuncio.imagemPrincipal || 
    (anuncio.imagens && anuncio.imagens.length > 0 ? anuncio.imagens[0].url : '/placeholder.jpg');
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isPremium ? 'border-2 border-yellow-400' : ''}`}>
      <div className="relative">
        {isPremium && (
          <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
            PREMIUM
          </div>
        )}
        <div className="aspect-video relative">
          <Image 
            src={imagemUrl} 
            alt={anuncio.titulo} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{anuncio.titulo}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{anuncio.descricao}</p>
        
        <div className="flex items-center text-gray-600 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{anuncio.cidade.nome}, {anuncio.cidade.estado.sigla}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{formatarTelefone(anuncio.telefone)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{anuncio.especialidade.nome}</span>
          <Link 
            href={`/anuncio/${anuncio.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
