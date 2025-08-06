// Nome do Código: route.ts (Login Anunciante)
// Versão: 2.0
// Autor: Weber & Dev Team
// Data: 2025-08-05
// Hora: 17:30
// Comentários: Rota de login do anunciante para o Cadastro Simples - corrigida para usar CPF e senha hasheada

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cpf, senha } = body

    console.log('=== LOGIN ATTEMPT ===');
    console.log('CPF recebido:', cpf);
    console.log('Senha recebida:', senha ? '***' : 'vazia');

    if (!cpf || !senha) {
      return NextResponse.json({ error: 'CPF e senha são obrigatórios.' }, { status: 400 })
    }

    // Remover formatação do CPF para busca
    const cpfLimpo = cpf.replace(/\D/g, '');
    console.log('CPF limpo para busca:', cpfLimpo);

    const advertiser = await prisma.advertiser.findFirst({ 
      where: { cpf: cpfLimpo } 
    })

    console.log('Anunciante encontrado:', !!advertiser);
    if (advertiser) {
      console.log('ID do anunciante:', advertiser.id);
      console.log('Email verificado:', advertiser.emailVerificado);
      console.log('Status cadastro:', advertiser.statusCadastro);
    }

    if (!advertiser) {
      return NextResponse.json({ error: 'CPF não encontrado ou senha inválida' }, { status: 404 })
    }

    // Verificar se o email foi confirmado
    if (!advertiser.emailVerificado) {
      return NextResponse.json({ 
        error: 'Conta não confirmada. Verifique seu email e clique no link de confirmação antes de fazer login.',
        needsEmailConfirmation: true 
      }, { status: 403 })
    }

    // Verificar senha hasheada
    const senhaValida = await bcrypt.compare(senha, advertiser.senha);
    console.log('Senha válida:', senhaValida);

    if (!senhaValida) {
      return NextResponse.json({ error: 'CPF não encontrado ou senha inválida' }, { status: 401 })
    }

    // Retornar dados do anunciante (sem a senha)
    const { senha: _, ...anunciante } = advertiser;
    
    return NextResponse.json({
      success: true,
      anunciante,
      message: 'Login realizado com sucesso'
    }, { status: 200 })

  } catch (error) {
    console.error('[LOGIN_ADVERTISER]', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
