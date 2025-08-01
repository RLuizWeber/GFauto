/// Caminho: app/api/advertiser/register/route.ts
// Versão: 1.2
// Autor: GPT & Weber
// Data: 31/07/2025
// Comentários:
// - Rota de Cadastro Simples do anunciante, de acordo com o fluxo documentado em fluxoAnunciante_completo.md.
// - Recebe e valida os campos mínimos obrigatórios conforme schema.prisma e fluxo do GFauto.
// - Cria o registro no banco via Prisma. Não envia campos opcionais vazios. Não envia id, createdAt ou updatedAt (gerados pelo Prisma).

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    // Extrai apenas os campos obrigatórios do body da request
    const {
      nomeResponsavel,
      cpf,
      email,
      celContato,
      senha,
      planoEscolhido,
      especialidade,
      cidade
    } = await req.json()

    // Validação: Todos os campos obrigatórios devem estar presentes e não vazios
    if (!nomeResponsavel || !cpf || !email || !celContato || !senha || !planoEscolhido) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando' },
        { status: 400 }
      )
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10)

    // Monta o objeto de criação, incluindo apenas os opcionais se houverem valores
    const data: any = {
      nomeResponsavel,
      cpf,
      email,
      celContato,
      senha: senhaHash,
      planoEscolhido
    }
    if (especialidade) data.especialidade = especialidade
    if (cidade) data.cidade = cidade

    // Cria o novo anunciante no banco
    const novo = await prisma.advertiser.create({ data })

    // Resposta de sucesso
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
