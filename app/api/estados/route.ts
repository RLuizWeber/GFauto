import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const estados = await prisma.estado.findMany({
      select: {
        id: true,
        nome: true,
        sigla: true
      },
      orderBy: {
        nome: 'asc'
      }
    });

    return NextResponse.json(estados);
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
