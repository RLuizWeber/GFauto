/// Caminho: app/api/advertiser/register/route.ts
// Versão: 1.1
// Autor: GPT & Weber
// Data: 27/07/2025
// Comentários: Rota da API para inserção de dados do Cadastro Simples

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nomeResponsavel,
      cpf,
      email,
      celContato,
      senha,
      planoEscolhido,
      especialidade,
      cidade
    } = body;

    // Validação mínima
    if (
      !nomeResponsavel ||
      !cpf ||
      !email ||
      !celContato ||
      !senha ||
      !especialidade ||
      !cidade
    ) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    // Verificar se já existe cpf OU email para a MESMA especialidade + cidade
    const existe = await prisma.advertiser.findFirst({
      where: {
        cpf,
        email,
        especialidade,
        cidade
      }
    });

    if (existe) {
      return NextResponse.json(
        { error: 'CPF ou E-mail já cadastrados para essa cidade e especialidade' },
        { status: 409 }
      );
    }

    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Salvar no banco
    const novoAnunciante = await prisma.advertiser.create({
      data: {
        nomeResponsavel,
        cpf,
        email,
        celContato,
        senha: senhaCriptografada,
        planoEscolhido,
        especialidade,
        cidade,
        statusCadastro: 'parcial' // padrão para cadastro simples
      }
    });

    return NextResponse.json(novoAnunciante, { status: 201 });

  } catch (erro: any) {
    console.error('Erro na API de cadastro:', erro);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
