/**
 * API de administração de anunciantes
 * GET: Lista todos os anunciantes
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const advertisers = await prisma.advertiser.findMany({
      select: {
        id: true,
        nomeResponsavel: true,
        email: true,
        cpf: true,
        planoEscolhido: true,
        statusCadastro: true,
        emailVerificado: true,
        createdAt: true,
        cidade: true,
        estado: true,
        celContato: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(advertisers);
  } catch (error) {
    console.error('Erro ao buscar anunciantes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar anunciantes' },
      { status: 500 }
    );
  }
}
