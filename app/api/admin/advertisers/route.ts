/**
 * API de administração de anunciantes
 * GET: Lista todos os anunciantes
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('=== API LISTANDO ANUNCIANTES ===');
    console.log('Timestamp:', new Date().toISOString());

    // Pequeno delay para garantir sincronização do DB
    await new Promise(resolve => setTimeout(resolve, 100));

    // QUERY SIMPLES SEM FILTROS - Pegar TODOS os registros
    const timestamp = Date.now();
    console.log('=== QUERY SIMPLES SEM FILTROS - TIMESTAMP:', timestamp, '===');
    
    const advertisers = await prisma.$queryRaw`
      SELECT 
        id, 
        "nomeResponsavel", 
        email, 
        cpf, 
        "planoEscolhido", 
        "statusCadastro", 
        "emailVerificado", 
        "createdAt", 
        cidade, 
        estado, 
        "celContato"
      FROM "Advertiser" 
      ORDER BY "createdAt" DESC
    ` as any[];

    console.log('=== RESULTADOS DA QUERY RAW ===');
    console.log('Total de anunciantes encontrados:', advertisers.length);
    console.log('IDs dos anunciantes:', advertisers.map(a => a.id));
    console.log('Nomes dos anunciantes:', advertisers.map(a => a.nomeResponsavel));
    console.log('Dados completos:', advertisers);

    // Tentar também com o método normal para comparar
    const advertisersPrisma = await prisma.advertiser.findMany({
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

    console.log('=== COMPARAÇÃO PRISMA FINDMANY ===');
    console.log('Total de anunciantes encontrados (PRISMA):', advertisersPrisma.length);
    console.log('IDs dos anunciantes (PRISMA):', advertisersPrisma.map(a => a.id));

    // RETORNAR DADOS DO QUERY RAW (deve ser mais confiável)
    console.log('=== RETORNANDO DADOS DA QUERY RAW ===');
    return NextResponse.json(advertisers, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('Erro ao buscar anunciantes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar anunciantes' },
      { status: 500 }
    );
  }
}
