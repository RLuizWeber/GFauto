/// Caminho: app/api/advertiser/route.ts
// Versão: 2.0
// Autor: GPT & Weber
// Data: 01/08/2025
// Comentários: Rota para operações gerais do anunciante (listagem, conclusão do cadastro, edição e deleção).
// - NÃO deve ser usada para cadastro simples (POST vai para /register).
// - PATCH serve para conclusão do cadastro, conforme fluxoAnunciante_completo.md.

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: lista todos os anunciantes (poderia ser limitado/paginado em produção)
export async function GET() {
  try {
    const anunciantes = await prisma.advertiser.findMany()
    return NextResponse.json(anunciantes)
  } catch (err: any) {
    console.error('[GET ADVERTISERS ERROR]', err)
    return NextResponse.json(
      { message: 'Erro ao buscar anunciantes.' },
      { status: 500 }
    )
  }
}

// PATCH: conclusão do cadastro (atualiza campos adicionais após cadastro simples)
export async function PATCH(req: Request) {
  try {
    const data = await req.json()
    const { id, ...camposAtualizar } = data

    if (!id) {
      return NextResponse.json({ message: 'ID do anunciante faltando.' }, { status: 400 })
    }

    // Remove campos que não existem no schema.prisma
    const camposValidos: any = {}
    const camposPermitidos = [
      'nomeFantasia', 'razaoSocial', 'imagemUrl', 'slogan', 'descricao',
      'nomeParaAnuncio', 'cargo', 'cep', 'cidade', 'estado', 'bairro', 'enderecoEmpresa',
      'celContato2', 'cnpj', 'especialidade', 'emailVerificado', 'planoEscolhido', 'slogan',
      'statusCadastro', 'imagemUrl'
    ]
    for (const key of camposPermitidos) {
      if (key in camposAtualizar && camposAtualizar[key] !== undefined) {
        camposValidos[key] = camposAtualizar[key]
      }
    }

    // Atualiza registro
    const atualizado = await prisma.advertiser.update({
      where: { id },
      data: camposValidos
    })

    return NextResponse.json(
      { id: atualizado.id, message: 'Cadastro atualizado com sucesso.' },
      { status: 200 }
    )
  } catch (err: any) {
    console.error('[PATCH ADVERTISER ERROR]', err)
    return NextResponse.json(
      { message: 'Erro ao atualizar cadastro.' },
      { status: 500 }
    )
  }
}

// DELETE: remove anunciante (requer id no body ou query, depende do fluxo real)
export async function DELETE(req: Request) {
  try {
    const data = await req.json()
    const { id } = data

    if (!id) {
      return NextResponse.json({ message: 'ID do anunciante faltando.' }, { status: 400 })
    }

    await prisma.advertiser.delete({ where: { id } })

    return NextResponse.json(
      { message: 'Anunciante removido com sucesso.' },
      { status: 200 }
    )
  } catch (err: any) {
    console.error('[DELETE ADVERTISER ERROR]', err)
    return NextResponse.json(
      { message: 'Erro ao remover anunciante.' },
      { status: 500 }
    )
  }
}
