/// Caminho: app/api/anuncios/route.ts
// Versão: 1.1
// Autor: GPT & Weber
// Data: 01/08/2025
// Comentários:
// - Rota de API para listagem e criação de anúncios
// - Utiliza filtros de cidade_id e especialidade_id para busca
// - Corrige uso de campos conforme schema.prisma (snake_case)

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Listar anúncios com filtro opcional por cidade_id e especialidade_id
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    // Busca parâmetros da query string
    const cidade_id = searchParams.get('cidade_id')
    const especialidade_id = searchParams.get('especialidade_id')

    // Busca todos os anúncios ativos com filtros, se fornecidos
    const anuncios = await prisma.anuncio.findMany({
      where: {
        cidade_id: cidade_id || undefined,
        especialidade_id: especialidade_id || undefined,
        ativo: true
      }
    })

    return NextResponse.json(anuncios)
  } catch (err: any) {
    console.error('[GET ANUNCIOS ERROR]', err)
    return NextResponse.json({ message: 'Erro ao buscar anúncios.' }, { status: 500 })
  }
}

// POST: Criação de novo anúncio (ajuste conforme os campos obrigatórios do seu schema)
export async function POST(req: Request) {
  try {
    const data = await req.json()
    // Aqui você pode validar os campos obrigatórios antes de criar

    const novoAnuncio = await prisma.anuncio.create({ data })

    return NextResponse.json(
      { id: novoAnuncio.id, message: 'Anúncio criado com sucesso.' },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('[CREATE ANUNCIO ERROR]', err)
    return NextResponse.json({ message: 'Erro ao criar anúncio.' }, { status: 500 })
  }
}
