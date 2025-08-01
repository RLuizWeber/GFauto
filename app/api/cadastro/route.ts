// Caminho: app/api/cadastro/route.ts
// Versão: 2025-08-01
// Autor: IA para Weber (revisão Eng. Responsável GFauto)
// Propósito: Cadastro simples do anunciante, conforme fluxo GFauto.
// Campos manipulados: email, nomeResponsavel, cpf, celContato, senha, planoEscolhido, razaoSocial, nomeFantasia, cnpj, cargo, enderecoEmpresa, bairro, cidade, estado, cep, emailVerificado, statusCadastro

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// --- Função utilitária para validar CPF ---
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;
  return true;
}

// --- Função utilitária para validar CNPJ ---
function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '')
  if (cnpj.length !== 14) return false
  if (/^(\d)\1+$/.test(cnpj)) return false
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  let digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado !== +digitos.charAt(0)) return false
  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado !== +digitos.charAt(1)) return false
  return true
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // --- Validação dos campos obrigatórios ---
    if (
      !body.email ||
      !body.senha ||
      !body.cpf ||
      !body.celContato ||
      !body.nomeResponsavel ||
      !body.planoEscolhido
    ) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 })
    }

    // --- Validação de formato de e-mail ---
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    }

    // --- Validação do CPF ---
    if (!validarCPF(body.cpf)) {
      return NextResponse.json({ error: 'CPF inválido.' }, { status: 400 })
    }

    // --- Validação do CNPJ, se informado ---
    if (body.cnpj && !validarCNPJ(body.cnpj)) {
      return NextResponse.json({ error: 'CNPJ inválido.' }, { status: 400 })
    }

    // --- Hash da senha ---
    const hashedPassword = await bcrypt.hash(body.senha, 10)

    // --- Criação dinâmica do objeto data ---
    const data: any = {
      email: body.email.toLowerCase().trim(),
      nomeResponsavel: body.nomeResponsavel.trim(),
      cpf: body.cpf.trim(),
      celContato: body.celContato.trim(),
      senha: hashedPassword,
      planoEscolhido: body.planoEscolhido,
      emailVerificado: false,
      statusCadastro: 'cadastro_incompleto'
    }

    // Campos opcionais só entram se existirem
    if (body.razaoSocial) data.razaoSocial = body.razaoSocial
    if (body.nomeFantasia) data.nomeFantasia = body.nomeFantasia
    if (body.cnpj) data.cnpj = body.cnpj
    if (body.cargo) data.cargo = body.cargo
    if (body.enderecoEmpresa) data.enderecoEmpresa = body.enderecoEmpresa
    if (body.bairro) data.bairro = body.bairro
    if (body.cidade) data.cidade = body.cidade
    if (body.estado) data.estado = body.estado
    if (body.cep) data.cep = body.cep

    // --- Criação do anunciante ---
    const novoAnunciante = await prisma.advertiser.create({
      data
    })

    // --- Remove senha do retorno ---
    const { senha, ...anuncianteSemSenha } = novoAnunciante

    return NextResponse.json(anuncianteSemSenha, { status: 201 })
  } catch (error) {
    console.error('[CADASTRO_ADVERTISER_ERROR]', error)
    return NextResponse.json({ error: 'Erro ao cadastrar anunciante.' }, { status: 500 })
  }
}
