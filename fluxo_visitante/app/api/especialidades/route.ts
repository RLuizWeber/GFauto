// app/api/especialidades/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * API para busca de especialidades disponíveis na cidade selecionada
 * 
 * Esta API retorna a lista de especialidades automotivas disponíveis na cidade
 * especificada, ordenadas por nome. Utilizada no terceiro campo do formulário
 * de busca na página inicial, após a seleção da cidade.
 * 
 * @param {Request} request - Objeto de requisição com parâmetro cidade_id
 * @returns {Promise<NextResponse>} Lista de especialidades com id, nome e slug
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cidadeId = searchParams.get('cidade_id');
    
    if (!cidadeId) {
      return NextResponse.json(
        { error: 'Parâmetro cidade_id é obrigatório' },
        { status: 400 }
      );
    }
    
    // Buscar especialidades disponíveis na cidade (que possuem anúncios ativos)
    const especialidades = await prisma.especialidade.findMany({
      where: {
        especialidadesDisponiveis: {
          some: {
            cidadeId: cidadeId
          }
        }
      },
      orderBy: {
        nome: 'asc'
      },
      select: {
        id: true,
        nome: true,
        slug: true,
        icone: true
      }
    });
    
    return NextResponse.json(especialidades);
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar especialidades' },
      { status: 500 }
    );
  }
}
