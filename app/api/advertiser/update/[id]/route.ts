/// Caminho: app/api/advertiser/update/[id]/route.ts
// Versão: 1.0
// Autor: GPT & Weber
// Data: 27/07/2025
// Comentários: Rota da API para atualização dos dados do anunciante durante a Conclusão do Cadastro.

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Definição do schema de validação Zod
const updateSchema = z.object({
  nomeFantasia: z.string().optional(),
  nomeRazaoSocial: z.string().optional(),
  imagemUrl: z.string().optional(),
  slogan: z.string().optional(),
  descricao: z.string().optional(),
  nomeParaAnuncio: z.string().optional()
})

// Método PUT - Atualização dos dados do anunciante
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params

  try {
    const body = await req.json()
    const parsed = updateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const advertiser = await prisma.advertiser.findUnique({ where: { id } })

    if (!advertiser) {
      return NextResponse.json({ error: 'Anunciante não encontrado' }, { status: 404 })
    }

    const updated = await prisma.advertiser.update({
      where: { id },
      data: parsed.data
    })

    return NextResponse.json({ message: 'Atualizado com sucesso', advertiser: updated }, { status: 200 })

  } catch (err) {
    console.error('[PUT /api/advertiser/update/[id]]', err)
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 })
  }
}
