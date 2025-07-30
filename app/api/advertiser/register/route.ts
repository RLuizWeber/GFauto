/// Caminho: app/api/advertiser/register/route.ts
// Versão: 1.0
// Autor: GPT & Weber
// Data: 29/07/2025
// Comentários: Rota de cadastro simples do anunciante.

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';   // <— named export, não default
import bcrypt from 'bcryptjs';

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
    } = await req.json();

    // validações básicas
    if (!cpf || !email || !senha) {
      return NextResponse.json({ message: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    // hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

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
        statusCadastro: 'incompleto',      // etapa inicial
        StatusPagamento: 'isento'         // use o nome conforme schema.prisma
      }
    });

    return NextResponse.json({ id: novo.id, message: 'Cadastro criado' }, { status: 201 });
  } catch (err: any) {
    console.error('[REGISTER ERROR]', err);
    return NextResponse.json({ message: 'Erro interno ao criar cadastro' }, { status: 500 });
  }
}
