import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API para busca de estados brasileiros
 * 
 * Esta API retorna a lista completa de estados brasileiros ordenados por nome.
 * Utilizada no formulário de busca do fluxo do visitante.
 * 
 * @returns {Promise<NextResponse>} Lista de estados
 */
export async function GET() {
  try {
    const estados = await prisma.estado.findMany({
      orderBy: {
        nome: 'asc'
      },
      select: {
        id: true,
        nome: true,
        sigla: true
      }
    });
    
    return NextResponse.json(estados);
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar estados' },
      { status: 500 }
    );
  }
}
