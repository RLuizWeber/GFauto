import Image from 'next/image';
import Link from 'next/link';

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
    id: string;
    url: string;
    ordem: number;
  }[];
}

export default function AnuncioCard({ anuncio }: { anuncio: Anuncio }) {
  const imagemUrl = anuncio.imagemPrincipal || 
    (anuncio.imagens.length > 0 ? anuncio.imagens[0].url : '/images/placeholder.jpg');
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${anuncio.plano === 'premium' ? 'border-2 border-yellow-400' : ''}`}>
      <div className="grid md:grid-cols-3 gap-4">
        {/* Coluna da Esquerda - Imagem */}
        <div className="relative h-48 md:h-full">
          <Image
            src={imagemUrl}
            alt={anuncio.titulo}
            fill
            style={{ objectFit: 'cover' }}
          />
          {anuncio.plano === 'premium' && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-800 px-2 py-1 rounded-md text-xs font-bold">
              PREMIUM
            </div>
          )}
        </div>
        
        {/* Coluna do Centro - Descrição */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{anuncio.titulo}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{anuncio.descricao}</p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Endereço:</span> {anuncio.endereco}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Telefone:</span> {anuncio.telefone}
            </p>
            {anuncio.whatsapp && (
              <p className="text-gray-700">
                <span className="font-semibold">WhatsApp:</span> {anuncio.whatsapp}
              </p>
            )}
          </div>
        </div>
        
        {/* Coluna da Direita - Mapa e Ações */}
        <div className="p-4 bg-gray-50">
          <div className="h-32 bg-gray-200 mb-4 relative">
            {anuncio.latitude && anuncio.longitude ? (
              <div className="absolute inset-0">
                {/* Aqui entraria o componente de mapa com as coordenadas */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Mapa: {anuncio.latitude.toFixed(6)}, {anuncio.longitude.toFixed(6)}</span>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-500">Localização não disponível</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Link
              href={`/anuncio/${anuncio.id}`}
              className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
            >
              Ver Detalhes
            </Link>
            
            {anuncio.whatsapp && (
              <a
                href={`https://wa.me/${anuncio.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 px-4 bg-green-600 text-white text-center rounded-md hover:bg-green-700 transition-colors"
              >
                Contato via WhatsApp
              </a>
            )}
            
            {anuncio.site && (
              <a
                href={anuncio.site}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 px-4 bg-gray-200 text-gray-800 text-center rounded-md hover:bg-gray-300 transition-colors"
              >
                Visitar Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
