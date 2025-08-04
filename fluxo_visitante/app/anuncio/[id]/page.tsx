// Caminho: /fluxo_visitante/app/anuncio/[id]/page.tsx
import { Metadata } from 'next';
import { prisma } from '../../../lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { formatarTelefone } from '../../../utils/formatters';

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const anuncio = await prisma.anuncio.findUnique({
    where: { id: params.id },
    include: {
      especialidades: true,
      cidades: {
        include: {
          estados: true
        }
      }
    }
  });

  if (!anuncio) {
    return {
      title: 'Anúncio não encontrado | GFauto',
    };
  }

  return {
    title: `${anuncio.titulo} | GFauto`,
    description: anuncio.descricao || `Detalhes sobre ${anuncio.titulo} em ${anuncio.cidades.nome}/${anuncio.cidades.estados.sigla}`,
  };
}

export default async function AnuncioPage({ params }: Props) {
  const anuncio = await prisma.anuncio.findUnique({
    where: { id: params.id },
    include: {
      imagens_anuncio: true,
      especialidades: true,
      cidades: {
        include: {
          estados: true
        }
      }
    }
  });

  if (!anuncio) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Anúncio não encontrado</h1>
          <p className="text-gray-600 mb-6">O anúncio que você está procurando não existe ou foi removido.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cabeçalho */}
          <div className="bg-blue-600 text-white p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{anuncio.titulo}</h1>
                <p className="text-blue-100 mt-1">
                  {anuncio.especialidades.nome} em {anuncio.cidades.nome}/{anuncio.cidades.estados.sigla}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/" className="inline-block px-4 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50">
                  Voltar para busca
                </Link>
              </div>
            </div>
          </div>
          
          {/* Conteúdo */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Coluna da esquerda - Imagens */}
              <div className="md:col-span-2">
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
                  {anuncio.imagens_anuncio && anuncio.imagens_anuncio.length > 0 ? (
                    <div className="relative aspect-video">
                      <Image 
                        src={anuncio.imagens_anuncio[0].url} 
                        alt={anuncio.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Sem imagem disponível</span>
                    </div>
                  )}
                </div>
                
                {anuncio.imagens_anuncio && anuncio.imagens_anuncio.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {anuncio.imagens_anuncio.slice(1, 5).map((imagem) => (
                      <div key={imagem.id} className="relative aspect-square rounded-md overflow-hidden">
                        <Image 
                          src={imagem.url} 
                          alt={anuncio.titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Descrição</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-600">{anuncio.descricao || "Sem descrição disponível."}</p>
                  </div>
                </div>
              </div>
              
              {/* Coluna da direita - Informações de contato */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Informações de contato</h2>
                  
                  <div className="space-y-4">
                    {anuncio.telefone && (
                      <div>
                        <p className="text-sm text-gray-500">Telefone:</p>
                        <p className="font-medium">{formatarTelefone(anuncio.telefone)}</p>
                      </div>
                    )}
                    
                    {anuncio.endereco && (
                      <div>
                        <p className="text-sm text-gray-500">Endereço:</p>
                        <p className="font-medium">{anuncio.endereco}</p>
                        <p className="text-sm">{anuncio.cidades.nome}/{anuncio.cidades.estados.sigla}</p>
                      </div>
                    )}
                    
                    {anuncio.email && (
                      <div>
                        <p className="text-sm text-gray-500">Email:</p>
                        <p className="font-medium">{anuncio.email}</p>
                      </div>
                    )}
                    
                    {anuncio.site && (
                      <div>
                        <p className="text-sm text-gray-500">Website:</p>
                        <a 
                          href={anuncio.site.startsWith('http') ? anuncio.site : `https://${anuncio.site}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {anuncio.site}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {anuncio.telefone && (
                    <div className="mt-6">
                      <a 
                        href={`tel:${anuncio.telefone}`}
                        className="block w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 text-center"
                      >
                        Ligar agora
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}