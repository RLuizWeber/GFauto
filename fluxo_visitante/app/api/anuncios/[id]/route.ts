// Caminho: /fluxo_visitante/app/api/anuncios/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

/**
 * API para buscar detalhes de um anúncio específico
 * 
 * @param {Request} request - Objeto de requisição
 * @param {Object} params - Parâmetros da rota, incluindo o ID do anúncio
 * @returns {Promise<NextResponse>} Detalhes do anúncio
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const anuncio = await prisma.anuncio.findUnique({
      where: { id },
      include: {
        imagens_anuncio: {
          orderBy: {
            ordem: 'asc'
          }
        },
        especialidades: true,
        cidades: {
          include: {
            estados: true
          }
        }
      }
    });
    
    if (!anuncio) {
      return NextResponse.json(
        { error: 'Anúncio não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(anuncio);
  } catch (error) {
    console.error('Erro ao buscar detalhes do anúncio:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar detalhes do anúncio' },
      { status: 500 }
    );
  }
}
