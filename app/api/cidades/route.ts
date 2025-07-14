import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const estadoId = searchParams.get('estado_id');

    if (!estadoId) {
      return NextResponse.json(
        { error: 'Parâmetro estado_id é obrigatório' },
        { status: 400 }
      );
    }

    const cidades = await prisma.cidade.findMany({
      where: {
        estadoId: estadoId
      },
      select: {
        id: true,
        nome: true,
        estadoId: true
      },
      orderBy: {
        nome: 'asc'
      }
    });

    return NextResponse.json(cidades);
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

