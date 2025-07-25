// Nome do Código: route.ts
// Versão: 1.0
// Autor: Weber & Dev Team
// Data: 2025-07-21
// Hora: 20:12
// Comentários: Rota da API para inserção de dados do Cadastro Simples

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const novo = await prisma.advertiser.create({
      data: {
        id: uuidv4(),
        nomeResponsavel: body.nomeResponsavel,
        cpf: body.cpf,
        email: body.email,
        celContato: body.celContato,
        planoEscolhido: body.planoEscolhido,
        statusCadastro: 'cadastro_simples',
        emailVerificado: false,
      },
    })
    return NextResponse.json({ id: novo.id })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao cadastrar' }, { status: 500 })
  }
}
