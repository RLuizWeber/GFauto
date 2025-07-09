import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const debugInfo: any = {
    steps: [],
    errors: [],
    success: false,
    timestamp: new Date().toISOString()
  };

  try {
    // PASSO 1: Verificar Variáveis de Ambiente
    debugInfo.steps.push('STEP 1: ENV VARS');
    console.log('=== STEP 1: ENV VARS ===');
    
    const databaseUrlExists = !!process.env.DATABASE_URL;
    const nodeEnv = process.env.NODE_ENV;
    const databaseUrlLength = process.env.DATABASE_URL?.length || 0;
    
    console.log('DATABASE_URL exists:', databaseUrlExists);
    console.log('DATABASE_URL length:', databaseUrlLength);
    console.log('NODE_ENV:', nodeEnv);
    
    debugInfo.step1 = {
      databaseUrlExists,
      databaseUrlLength,
      nodeEnv,
      status: databaseUrlExists ? 'SUCCESS' : 'ERROR'
    };
    
    if (!databaseUrlExists) {
      debugInfo.errors.push('DATABASE_URL não encontrada nas variáveis de ambiente');
      throw new Error('DATABASE_URL não configurada');
    }

    // PASSO 2: Verificar Import do Prisma
    debugInfo.steps.push('STEP 2: PRISMA IMPORT');
    console.log('=== STEP 2: PRISMA IMPORT ===');
    
    const prismaType = typeof prisma;
    const hasPrismaConnect = typeof prisma.$connect === 'function';
    
    console.log('Prisma type:', prismaType);
    console.log('Has $connect method:', hasPrismaConnect);
    
    debugInfo.step2 = {
      prismaType,
      hasPrismaConnect,
      status: (prismaType === 'object' && hasPrismaConnect) ? 'SUCCESS' : 'ERROR'
    };
    
    if (prismaType !== 'object' || !hasPrismaConnect) {
      debugInfo.errors.push('Prisma não foi importado corretamente ou não tem métodos necessários');
      throw new Error('Falha no import do Prisma');
    }

    // PASSO 3: Verificar Conexão
    debugInfo.steps.push('STEP 3: CONNECTION');
    console.log('=== STEP 3: CONNECTION ===');
    
    await prisma.$connect();
    console.log('Connection successful');
    
    debugInfo.step3 = {
      status: 'SUCCESS',
      message: 'Conexão estabelecida com sucesso'
    };

    // PASSO 4: Verificar Query Simples
    debugInfo.steps.push('STEP 4: SIMPLE QUERY');
    console.log('=== STEP 4: SIMPLE QUERY ===');
    
    const result = await prisma.$queryRaw`SELECT 1 as test, NOW() as current_time`;
    console.log('Query result:', result);
    
    debugInfo.step4 = {
      status: 'SUCCESS',
      result,
      message: 'Query executada com sucesso'
    };

    // PASSO 5: Verificar Desconexão
    debugInfo.steps.push('STEP 5: DISCONNECT');
    console.log('=== STEP 5: DISCONNECT ===');
    
    await prisma.$disconnect();
    console.log('Disconnection successful');
    
    debugInfo.step5 = {
      status: 'SUCCESS',
      message: 'Desconexão realizada com sucesso'
    };

    debugInfo.success = true;

    return NextResponse.json({
      status: 'success',
      message: 'Conexão com banco de dados bem-sucedida - Todos os passos executados',
      database: 'conectado',
      debug: debugInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in debug flow:', error);
    
    const errorInfo = {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
    };
    
    debugInfo.errors.push(errorInfo);

    return NextResponse.json({
      status: 'error',
      message: 'Erro na conexão com banco de dados',
      debug: debugInfo,
      error: {
        name: errorInfo.name,
        message: errorInfo.message,
        code: (error as any)?.code || 'UNKNOWN',
        stack: errorInfo.stack
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'Configurada' : 'Não configurada'
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
