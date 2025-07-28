/// Caminho: app/api/advertiser/login/route.ts
// Versão: 1.0
// Autor: GPT & Weber
// Data: 27/07/2025
// Comentários: Rota da API para autenticação do anunciante com base no CPF e senha.

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { cpf, senha } = await req.json();

    const anunciante = await prisma.advertiser.findFirst({
      where: { cpf },
    });

    if (!anunciante || !anunciante.senha) {
      return NextResponse.json({ message: 'CPF não encontrado ou senha inválida' }, { status: 401 });
    }

    const senhaValida = await bcrypt.compare(senha, anunciante.senha);

    if (!senhaValida) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Login bem-sucedido',
      nome: anunciante.nomeFantasia || anunciante.nomeRazaoSocial,
      id: anunciante.id,
      plano: anunciante.planoEscolhido,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
  }
}
