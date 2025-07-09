import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log('[TEST-DB] Iniciando teste de conexão...');
    
    // Teste 1: Conexão básica
    const startTime = Date.now();
    await prisma.$connect();
    const connectTime = Date.now() - startTime;
    console.log(`[TEST-DB] Conexão estabelecida em ${connectTime}ms`);
    
    // Teste 2: Query simples
    const queryStartTime = Date.now();
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`;
    const queryTime = Date.now() - queryStartTime;
    console.log(`[TEST-DB] Query executada em ${queryTime}ms`);
    
    // Teste 3: Contar registros das tabelas principais
    const counts = await Promise.all([
      prisma.advertiser.count(),
      prisma.anuncio.count(),
      prisma.payment.count()
    ]);
    
    // Teste 4: Verificar schema
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    const response = {
      status: 'success',
      message: 'Conexão com banco de dados funcionando perfeitamente',
      timestamp: new Date().toISOString(),
      performance: {
        connectionTime: `${connectTime}ms`,
        queryTime: `${queryTime}ms`,
        totalTime: `${Date.now() - startTime}ms`
      },
      database: {
        info: result,
        tables: tables,
        counts: {
          advertisers: counts[0],
          anuncios: counts[1],
          payments: counts[2]
        }
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'Configurada ✅' : 'Não configurada ❌',
        vercelRegion: process.env.VERCEL_REGION || 'Local'
      }
    };
    
    console.log('[TEST-DB] Teste concluído com sucesso:', response);
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    console.error('[TEST-DB ERROR]', error);
    
    const errorResponse = {
      status: 'error',
      message: 'Erro na conexão com banco de dados',
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        code: error.code || 'UNKNOWN',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'Configurada ✅' : 'Não configurada ❌',
        vercelRegion: process.env.VERCEL_REGION || 'Local'
      }
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
    
  } finally {
    await prisma.$disconnect();
    console.log('[TEST-DB] Conexão encerrada');
  }
}

// Método POST para testes mais avançados
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType = 'basic' } = body;
    
    console.log(`[TEST-DB] Executando teste: ${testType}`);
    
    await prisma.$connect();
    
    let testResult;
    
    switch (testType) {
      case 'connection':
        testResult = await prisma.$queryRaw`SELECT 1 as test`;
        break;
        
      case 'tables':
        testResult = await prisma.$queryRaw`
          SELECT 
            schemaname,
            tablename,
            tableowner
          FROM pg_tables 
          WHERE schemaname = 'public'
        `;
        break;
        
      case 'performance':
        const start = Date.now();
        await prisma.advertiser.findMany({ take: 1 });
        await prisma.anuncio.findMany({ take: 1 });
        await prisma.payment.findMany({ take: 1 });
        const end = Date.now();
        testResult = { executionTime: `${end - start}ms` };
        break;
        
      default:
        testResult = { message: 'Tipo de teste não reconhecido' };
    }
    
    return NextResponse.json({
      status: 'success',
      testType,
      result: testResult,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[TEST-DB POST ERROR]', error);
    
    return NextResponse.json({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
    
  } finally {
    await prisma.$disconnect();
  }
}