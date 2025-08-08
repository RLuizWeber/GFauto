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

// GET: Listar anúncios com filtro opcional por cidade_id, especialidade_id e advertiserId
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    // Busca parâmetros da query string
    const cidade_id = searchParams.get('cidade_id')
    const especialidade_id = searchParams.get('especialidade_id')
    const advertiserId = searchParams.get('advertiserId')

    // Construir filtros dinamicamente
    const filtros: any = {}
    if (cidade_id) filtros.cidade_id = cidade_id
    if (especialidade_id) filtros.especialidade_id = especialidade_id
    if (advertiserId) filtros.advertiserId = advertiserId

    // Busca todos os anúncios ativos com filtros, se fornecidos
    const anuncios = await prisma.anuncio.findMany({
      where: filtros,
      select: {
        id: true,
        titulo: true,
        descricao: true,
        plano: true,
        status: true,
        data_expiracao: true,
        advertiserId: true,
        cidade_id: true,
        especialidade_id: true,
        telefone: true,
        whatsapp: true,
        email: true,
        imagem_principal: true,
        endereco: true,
        createdAt: true,
        updatedAt: true
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
