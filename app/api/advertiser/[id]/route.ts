// GFauto/app/api/advertiser/[id]/route.ts
// Nome do Código: route.ts (GET Advertiser por ID)
// Versão: 1.0
// Autor: Alcides Weber & Dev Team
// Data: 2025-07-22
// Hora: 08:40
// Comentários: Retorna os dados de um anunciante com base no ID único (UUID)

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: 'ID do anunciante é obrigatório.' }, { status: 400 })
    }

    const advertiser = await prisma.advertiser.findUnique({
      where: { id },
    })

    if (!advertiser) {
      return NextResponse.json({ error: 'Anunciante não encontrado.' }, { status: 404 })
    }

    return NextResponse.json(advertiser, { status: 200 })
  } catch (error) {
    console.error('[GET_ADVERTISER_BY_ID]', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
