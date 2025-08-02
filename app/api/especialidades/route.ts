import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// este arquivo: api/especialidades/route.ts
const prisma = new PrismaClient();

export async function GET() {
  try {
    const especialidades = await prisma.especialidades.findMany({
      select: {
        id: true,
        nome: true
      },
      orderBy: {
        nome: 'asc'
      }
    });

    return NextResponse.json(especialidades);
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}