import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// GET /api/anuncios
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cidadeId = searchParams.get('cidadeId');
  const especialidadeId = searchParams.get('especialidadeId');

  try {
    const anuncios = await prisma.anuncio.findMany({
      where: {
        cidadeId: cidadeId || undefined,
        especialidadeId: especialidadeId || undefined,
        ativo: true
      }
    });

    return NextResponse.json(anuncios);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar anúncios.' }, { status: 500 });
  }
}

// POST /api/anuncios
export async function POST(req: Request) {
  const data = await req.json();

  try {
    const novoAnuncio = await prisma.anuncio.create({
      data
    });

    return NextResponse.json(novoAnuncio);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar anúncio.' }, { status: 500 });
  }
}
