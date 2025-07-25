// Nome do Código: app/api/advertiser/route.ts
// Versão: 1.0
// Autor: Equipe Dev GFauto com suporte OpenAI
// Data: 22/07/2025
// Hora: 22:45 
// Comentários: Rota completa CRUD Advertiser (Anunciante), campos conforme banco NeonDB.

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST - Cadastrar Anunciante
export async function POST(req: Request) {
  try {
    const data = await req.json()

    const novoAnunciante = await prisma.advertiser.create({
      data: {
        id: data.id,
        email: data.email,
        senha: data.senha,
        cpf: data.cpf,
        nomeFantasia: data.nomeFantasia,
        razaoSocial: data.razaoSocial,
        nomeResponsavel: data.nomeResponsavel,
        nomeParaAnuncio: data.nomeParaAnuncio,
        cargo: data.cargo,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
        bairro: data.bairro,
        enderecoEmpresa: data.enderecoEmpresa,
        telefone: data.telefone,
        celContato: data.celContato,
        celContato2: data.celContato2,
        emailVerificado: data.emailVerificado,
        especialidade: data.especialidade,
        planoEscolhido: data.planoEscolhido,
        imagemUrl: data.imagemUrl,
        slogan: data.slogan,
        descricao: data.descricao,
        statusCadastro: data.statusCadastro,
      }
    })

    return NextResponse.json(novoAnunciante)

  } catch (error) {
    console.error('Erro ao cadastrar anunciante:', error)
    return NextResponse.json({ error: 'Erro ao cadastrar anunciante.' }, { status: 500 })
  }
}

// GET - Buscar Anunciante por e-mail
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório.' }, { status: 400 })
    }

    const anunciante = await prisma.advertiser.findUnique({
      where: { email }
    })

    return NextResponse.json(anunciante)

  } catch (error) {
    console.error('Erro ao buscar anunciante:', error)
    return NextResponse.json({ error: 'Erro ao buscar anunciante.' }, { status: 500 })
  }
}

// PUT - Editar Anunciante
export async function PUT(req: Request) {
  try {
    const data = await req.json()

    const anunciante = await prisma.advertiser.update({
      where: { id: data.id },
      data: {
        ...data
      }
    })

    return NextResponse.json(anunciante)

  } catch (error) {
    console.error('Erro ao editar anunciante:', error)
    return NextResponse.json({ error: 'Erro ao editar anunciante.' }, { status: 500 })
  }
}

// DELETE - Remover Anunciante
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório.' }, { status: 400 })
    }

    await prisma.advertiser.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Anunciante removido com sucesso.' })

  } catch (error) {
    console.error('Erro ao remover anunciante:', error)
    return NextResponse.json({ error: 'Erro ao remover anunciante.' }, { status: 500 })
  }
}
