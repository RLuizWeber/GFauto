import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * API para busca de especialidades disponíveis em uma cidade
 *
 * Esta API retorna a lista de especialidades disponíveis em uma cidade específica.
 * Utilizada no formulário de busca do fluxo do visitante.
 *
 * @param {Request} request - Objeto de requisição
 * @returns {Promise<NextResponse>} Lista de especialidades disponíveis na cidade
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

    // Buscar especialidades disponíveis na cidade através da tabela de relacionamento
    const especialidades = await prisma.especialidade.findMany({
      where: {
        especialidadesDisponiveis: {
          some: {
            cidadeId: parseInt(cidadeId)
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
