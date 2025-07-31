/// Caminho: app/api/advertiser/register/route.ts
// Versão: 1.0
// Autor: GPT & Weber
// Data: 30/07/2025
// Comentários: Rota de cadastro simples do anunciante — campos mínimos e sem pagamentoStatus.

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const {
      nomeResponsavel,
      cpf,
      email,
      celContato,
      senha,
      especialidade,
      cidade,
      planoEscolhido
    } = await req.json()

    // validações básicas
    if (!cpf || !email || !senha) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando' },
        { status: 400 }
      )
    }

    // hash da senha
    const senhaHash = await bcrypt.hash(senha, 10)

    // cria o anunciante apenas com os campos que existem no schema.prisma
    const novo = await prisma.advertiser.create({
      data: {
        nomeResponsavel,
        cpf,
        email,
        celContato,
        senha: senhaHash,
        especialidade,
        cidade,
        planoEscolhido,
        statusCadastro: 'cadastro_simples' // valor default conforme schema.prisma
      }
    })

    return NextResponse.json(
      { id: novo.id, message: 'Cadastro criado com sucesso' },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('[REGISTER ERROR]', err)
    return NextResponse.json(
      { message: 'Erro interno ao criar cadastro' },
      { status: 500 }
    )
  }
}