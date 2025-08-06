/**
 * API de teste para verificar estado real do banco de dados
 * GET: Mostra dados diretos do banco sem cache
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('=== TESTE DIRETO DO BANCO ===');
    console.log('Timestamp:', new Date().toISOString());

    // Query SQL direta para garantir dados reais
    const result = await prisma.$queryRaw`
      SELECT 
        id, 
        "nomeResponsavel", 
        email, 
        cpf,
        "createdAt"
      FROM "Advertiser" 
      ORDER BY "createdAt" DESC
    `;

    console.log('Resultado da query direta:', result);

    // Também tentar o método Prisma normal
    const resultPrisma = await prisma.advertiser.findMany({
      select: {
        id: true,
        nomeResponsavel: true,
        email: true,
        cpf: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('Resultado Prisma normal:', resultPrisma);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      directQuery: result,
      prismaQuery: resultPrisma,
      counts: {
        directQuery: Array.isArray(result) ? result.length : 0,
        prismaQuery: resultPrisma.length
      }
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });

  } catch (error) {
    console.error('Erro no teste do banco:', error);
    return NextResponse.json(
      { error: 'Erro no teste do banco', details: String(error) },
      { status: 500 }
    );
  }
}
