// Caminho: /fluxo_visitante/app/api/estados/route.ts
// app/api/estados/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * API para buscar todos os estados brasileiros
 * 
 * @param {Request} request - Objeto de requisição
 * @returns {Promise<NextResponse>} Lista de estados
 */
export async function GET(request: Request) {
  try {
    const estados = await prisma.estado.findMany({
      orderBy: {
        nome: 'asc'
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