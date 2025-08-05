import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const estadoId = url.searchParams.get('estado_id');

    if (!estadoId) {
      return NextResponse.json(
        { error: 'Parâmetro estado_id é obrigatório' },
        { status: 400 }
      );
    }

    console.log('Buscando cidades para estado:', estadoId);

    const cidades = await prisma.cidades.findMany({
      where: {
        estado_id: estadoId
      },
      select: {
        id: true,
        nome: true,
        estado_id: true
      },
      orderBy: {
        nome: 'asc'
      }
    });

    console.log(`Encontradas ${cidades.length} cidades para estado ${estadoId}`);

    return NextResponse.json(cidades);
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

