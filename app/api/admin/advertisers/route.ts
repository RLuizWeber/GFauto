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

    // USAR MESMA ABORDAGEM DO DATABASE EXPLORER (que funciona!)
    const timestamp = Date.now();
    console.log('=== QUERY SIMPLES COMO DATABASE EXPLORER - TIMESTAMP:', timestamp, '===');
    
    // Contar registros primeiro
    const countResult = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM "Advertiser"`);
    const totalCount = Number((countResult as any)[0].count);
    console.log('🔢 Total count no banco:', totalCount);
    
    // Buscar todos os dados (como Database Explorer)
    const advertisers = await prisma.$queryRawUnsafe(`SELECT * FROM "Advertiser" ORDER BY "createdAt" DESC`) as any[];

    console.log('=== RESULTADOS COMO DATABASE EXPLORER ===');
    console.log('📊 Total de anunciantes encontrados:', advertisers.length);
    console.log('🆔 IDs dos anunciantes:', advertisers.map(a => a.id));
    console.log('👤 Nomes dos anunciantes:', advertisers.map(a => a.nomeResponsavel));
    console.log('📋 Dados completos:', advertisers);

    // RETORNAR DADOS EXATAMENTE COMO DATABASE EXPLORER FAZ
    console.log('=== RETORNANDO DADOS COMO DATABASE EXPLORER ===');
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
