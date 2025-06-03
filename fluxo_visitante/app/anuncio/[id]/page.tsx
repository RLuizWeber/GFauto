// Caminho: /fluxo_visitante/app/anuncio/[id]/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '../../../../lib/prisma';

export const metadata: Metadata = {
  title: 'Detalhes do Anúncio | GFauto',
  description: 'Detalhes completos do anúncio selecionado.',
};

// Função para gerar metadados dinâmicos baseados no anúncio
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}) {
  const anuncio = await prisma.anuncio.findUnique({
    where: { id: params.id },
    select: { titulo: true, descricao: true }
  });

  if (!anuncio) {
    return {
      title: 'Anúncio não encontrado | GFauto',
      description: 'O anúncio solicitado não foi encontrado.'
    };
  }

  return {
    title: `${anuncio.titulo || 'Anúncio'} | GFauto`,
    description: anuncio.descricao?.substring(0, 160) || 'Detalhes do anúncio no GFauto.'
  };
}

// Componente para detalhes do anúncio
async function AnuncioDetalhes({ id }: { id: string }) {
  const anuncio = await prisma.anuncio.findUnique({
    where: { id },
    include: {
      imagens: {
        orderBy: {
          ordem: 'asc'
        }
      },
      especialidade: true,
      cidade: {
        include: {
          estado: true
        }
      }
    }
  });

  if (!anuncio) {
    notFound();
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{anuncio.titulo}</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Galeria de imagens */}
        <div>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
            {anuncio.imagemPrincipal || (anuncio.imagens.length > 0) ? (
              <img 
                src={anuncio.imagemPrincipal || anuncio.imagens[0].url} 
                alt={anuncio.titulo || 'Imagem principal'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500">Sem imagem disponível</span>
              </div>
            )}
          </div>
          
          {anuncio.imagens.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {anuncio.imagens.map((imagem) => (
                <div key={imagem.id} className="aspect-square bg-gray-200 rounded overflow-hidden">
                  <img 
                    src={imagem.url} 
                    alt={`Imagem ${imagem.ordem + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Informações do anúncio */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Descrição</h2>
            <p className="text-gray-700 whitespace-pre-line">{anuncio.descricao}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Informações de Contato</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Endereço:</span> {anuncio.endereco}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Telefone:</span> {anuncio.telefone}
              </p>
              {anuncio.whatsapp && (
                <p className="text-gray-700">
                  <span className="font-medium">WhatsApp:</span> {anuncio.whatsapp}
                </p>
              )}
              {anuncio.email && (
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {anuncio.email}
                </p>
              )}
              {anuncio.site && (
                <p className="text-gray-700">
                  <span className="font-medium">Site:</span>{' '}
                  <a 
                    href={anuncio.site} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {anuncio.site}
                  </a>
                </p>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Localização</h2>
            <p className="text-gray-700">
              <span className="font-medium">Cidade:</span>{' '}
              {anuncio.cidade?.nome}, {anuncio.cidade?.estado?.sigla}
            </p>
            
            {anuncio.latitude && anuncio.longitude && (
              <div className="mt-4 h-64 bg-gray-200 rounded-lg">
                {/* Aqui entraria o componente de mapa */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">
                    Mapa: {anuncio.latitude.toString()}, {anuncio.longitude.toString()}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {anuncio.whatsapp && (
              <a
                href={`https://wa.me/${anuncio.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors text-center"
              >
                Contato via WhatsApp
              </a>
            )}
            <a
              href="/"
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors text-center"
            >
              Voltar à Página Inicial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnuncioPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-12">Carregando detalhes do anúncio...</div>}>
          <AnuncioDetalhes id={params.id} />
        </Suspense>
      </div>
    </main>
  );
}