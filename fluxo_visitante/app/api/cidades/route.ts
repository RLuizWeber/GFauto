import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * API para busca de cidades filtradas por estado
 *
 * Esta API retorna a lista de cidades de um estado específico, ordenadas por nome.
 * Utilizada no formulário de busca do fluxo do visitante.
 *
 * @param {Request} request - Objeto de requisição
 * @returns {Promise<NextResponse>} Lista de cidades do estado especificado
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const estadoId = searchParams.get('estado_id');

    if (!estadoId) {
      return NextResponse.json(
        { error: 'Parâmetro estado_id é obrigatório' },
        { status: 400 }
      );
    }

    const cidades = await prisma.cidade.findMany({
      where: {
        estadoId: parseInt(estadoId)
      },
      orderBy: {
        nome: 'asc'
      },
      select: {
        id: true,
        nome: true
      }
    });

    return NextResponse.json(cidades);
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar cidades' },
      { status: 500 }
    );
  }
}
