// Nome do Código: route.ts (Login Anunciante)
// Versão: 1.0
// Autor: Weber & Dev Team
// Data: 2025-07-25
// Hora: 20:53
// Comentários: Rota de login do anunciante para o Cadastro Simples

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, senha } = body

    if (!email || !senha) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 })
    }

    const advertiser = await prisma.advertiser.findUnique({ where: { email } })

    if (!advertiser) {
      return NextResponse.json({ error: 'E-mail não encontrado.' }, { status: 404 })
    }

    if (advertiser.senha !== senha) {
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 })
    }

    return NextResponse.json(advertiser, { status: 200 })
  } catch (error) {
    console.error('[LOGIN_ADVERTISER]', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
