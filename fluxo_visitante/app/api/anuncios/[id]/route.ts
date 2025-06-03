// app/api/anuncios/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

/**
 * API para detalhes de um anúncio específico
 * 
 * Esta API retorna os detalhes completos de um anúncio específico,
 * incluindo todas as suas imagens, informações da especialidade e cidade.
 * 
 * @param {Request} request - Objeto de requisição
 * @param {Object} params - Parâmetros da rota, contendo o id do anúncio
 * @returns {Promise<NextResponse>} Detalhes completos do anúncio
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
