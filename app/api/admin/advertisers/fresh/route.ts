/**
 * API "FRESH" - Força query direta sem qualquer cache
 * Endpoint alternativo para diagnóstico de cache
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Nova instância Prisma para garantir conexão fresca
const freshPrisma = new PrismaClient();

export async function GET() {
  try {
    console.log('=== API FRESH - BYPASS TOTAL DE CACHE ===');
    console.log('Fresh Timestamp:', new Date().toISOString());

    // Query completamente nova com conexão fresca
    const result = await freshPrisma.$queryRaw`
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
        "celContato",
        EXTRACT(EPOCH FROM NOW()) as db_timestamp
      FROM "Advertiser" 
      ORDER BY "createdAt" DESC
    ` as any[];

    console.log('FRESH - Total encontrado:', result.length);
    console.log('FRESH - IDs:', result.map((a: any) => a.id));
    console.log('FRESH - Nomes:', result.map((a: any) => a.nomeResponsavel));
    
    // Limpar dados do timestamp interno
    const cleanData = result.map(item => {
      const { db_timestamp, ...cleanItem } = item;
      return cleanItem;
    });

    return NextResponse.json(cleanData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Fresh-Query': 'true',
        'X-Timestamp': Date.now().toString(),
      }
    });
  } catch (error) {
    console.error('FRESH API - Erro:', error);
    return NextResponse.json(
      { error: 'Erro na API fresh', details: String(error) },
      { status: 500 }
    );
  } finally {
    await freshPrisma.$disconnect();
  }
}
