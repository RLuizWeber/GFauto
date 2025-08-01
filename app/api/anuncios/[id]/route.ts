/// Caminho: app/api/anuncios/[id]/route.ts
// Versão: 1.0
// Autor: GPT & Weber
// Data: 01/08/2025
// Comentários:
// - Rota de API para operações de anúncios individuais pelo ID (consultar, atualizar e deletar).
// - Permite buscar um anúncio, editar campos (PUT/PATCH) ou remover um anúncio pelo seu id.
// - Necessário importar o Prisma para funcionar.

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // Importação obrigatória!

// GET: Buscar anúncio pelo ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    if (!id) {
      return NextResponse.json({ message: 'ID do anúncio faltando.' }, { status: 400 })
    }

    const anuncio = await prisma.anuncio.findUnique({ where: { id } })
    if (!anuncio) {
      return NextResponse.json({ message: 'Anúncio não encontrado.' }, { status: 404 })
    }

    return NextResponse.json(anuncio)
  } catch (err: any) {
    console.error('[GET ANUNCIO ERROR]', err)
    return NextResponse.json({ message: 'Erro ao buscar anúncio.' }, { status: 500 })
  }
}

// PATCH: Atualizar campos do anúncio pelo ID
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const data = await req.json()
    if (!id) {
      return NextResponse.json({ message: 'ID do anúncio faltando.' }, { status: 400 })
    }

    // Só atualiza campos enviados
    const anuncioAtualizado = await prisma.anuncio.update({
      where: { id },
      data
    })

    return NextResponse.json(anuncioAtualizado)
  } catch (err: any) {
    console.error('[PATCH ANUNCIO ERROR]', err)
    return NextResponse.json({ message: 'Erro ao atualizar anúncio.' }, { status: 500 })
  }
}

// DELETE: Remover anúncio pelo ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    if (!id) {
      return NextResponse.json({ message: 'ID do anúncio faltando.' }, { status: 400 })
    }

    await prisma.anuncio.delete({ where: { id } })
    return NextResponse.json({ message: 'Anúncio removido com sucesso.' }, { status: 200 })
  } catch (err: any) {
    console.error('[DELETE ANUNCIO ERROR]', err)
    return NextResponse.json({ message: 'Erro ao remover anúncio.' }, { status: 500 })
  }
}
