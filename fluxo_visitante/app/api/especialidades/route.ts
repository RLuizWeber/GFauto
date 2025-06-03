// Caminho: /fluxo_visitante/app/api/especialidades/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * API para buscar especialidades disponíveis em uma cidade
 * 
 * @param {Request} request - Objeto de requisição com parâmetro cidade_id
 * @returns {Promise<NextResponse>} Lista de especialidades disponíveis na cidade
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cidadeId = searchParams.get('cidade_id');
    
    if (!cidadeId) {
      // Se não for fornecido cidade_id, retorna todas as especialidades
      const especialidades = await prisma.especialidade.findMany({
        orderBy: {
          nome: 'asc'
        }
      });
      
      return NextResponse.json(especialidades);
    }
    
    // Buscar especialidades disponíveis na cidade
    const especialidadesDisponiveis = await prisma.especialidadeDisponivel.findMany({
      where: {
        cidadeId: cidadeId
      },
      include: {
        especialidade: true
      },
      orderBy: {
        especialidade: {
          nome: 'asc'
        }
      }
    });
    
    // Extrair apenas as especialidades
    const especialidades = especialidadesDisponiveis.map(item => item.especialidade);
    
    return NextResponse.json(especialidades);
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar especialidades' },
      { status: 500 }
    );
  }
}
