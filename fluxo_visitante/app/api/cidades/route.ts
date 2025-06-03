// app/api/cidades/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * API para busca de cidades filtradas por estado
 * 
 * Esta API retorna a lista de cidades pertencentes ao estado especificado,
 * ordenadas por nome. Utilizada no segundo campo do formulário de busca
 * na página inicial, após a seleção do estado.
 * 
 * @param {Request} request - Objeto de requisição com parâmetro estado_id
 * @returns {Promise<NextResponse>} Lista de cidades com id e nome
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
        estadoId: estadoId
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
