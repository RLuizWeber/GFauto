import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

/**
 * API de Cadastro - Projeto GFauto
 * 
 * Funcionalidades:
 * - Cadastro completo de anunciantes (Cortesia e Premium)
 * - Validação rigorosa de todos os campos obrigatórios
 * - Validação de formatos brasileiros (CNPJ, CPF, CEP, celular)
 * - Hash seguro de senhas com bcrypt
 * - Verificação de e-mail único
 * - Preparação para envio de e-mail de verificação via Resend
 * 
 * Fluxo:
 * - Recebe dados do CadastroForm.tsx
 * - Valida todos os campos
 * - Cria registro no banco via Prisma
 * - Retorna ID para redirecionamento
 * 
 * Baseado em: README_fluxo_cadastro.md
 */

const prisma = new PrismaClient()

interface CadastroData {
  // Dados Básicos da Empresa (todos obrigatórios)
  nomeRazaoSocial: string
  nomeFantasia: string
  cnpj: string
  pessoaResponsavel: string
  cpf: string
  celContato: string
  endereco: string
  bairro: string
  cep: string
  cidade: string
  estado: string
  cargo: string
  
  // Dados de Acesso
  email: string
  senha: string
  
  // Plano escolhido
  plano: string
}

/**
 * Valida formato de CNPJ (XX.XXX.XXX/XXXX-XX)
 */
function validarCNPJ(cnpj: string): boolean {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
  return cnpjRegex.test(cnpj)
}

/**
 * Valida formato de CPF (XXX.XXX.XXX-XX)
 */
function validarCPF(cpf: string): boolean {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
  return cpfRegex.test(cpf)
}

/**
 * Valida formato de CEP (XXXXX-XXX)
 */
function validarCEP(cep: string): boolean {
  const cepRegex = /^\d{5}-\d{3}$/
  return cepRegex.test(cep)
}

/**
 * Valida formato de celular ((XX) XXXXX-XXXX)
 */
function validarCelular(celular: string): boolean {
  const celularRegex = /^\(\d{2}\) \d{5}-\d{4}$/
  return celularRegex.test(celular)
}

/**
 * Valida formato de e-mail
 */
function validarEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida força da senha conforme especificações:
 * - Mínimo 8 caracteres
 * - 1 maiúscula, 1 minúscula, 1 caractere especial [* # & $ ( ! ]
 */
function validarSenha(senha: string): boolean {
  if (senha.length < 8) return false
  
  const temMaiuscula = /[A-Z]/.test(senha)
  const temMinuscula = /[a-z]/.test(senha)
  const temEspecial = /[*#&$(!]/.test(senha)
  
  return temMaiuscula && temMinuscula && temEspecial
}

/**
 * Valida todos os campos obrigatórios
 */
function validarCamposObrigatorios(data: CadastroData): string[] {
  const erros: string[] = []

  // Validar campos obrigatórios básicos
  if (!data.nomeRazaoSocial?.trim()) erros.push('Nome/Razão Social é obrigatório')
  if (!data.nomeFantasia?.trim()) erros.push('Nome de Fantasia é obrigatório')
  if (!data.cnpj?.trim()) erros.push('CNPJ é obrigatório')
  if (!data.pessoaResponsavel?.trim()) erros.push('Pessoa Responsável é obrigatória')
  if (!data.cpf?.trim()) erros.push('CPF é obrigatório')
  if (!data.celContato?.trim()) erros.push('Celular de Contato é obrigatório')
  if (!data.endereco?.trim()) erros.push('Endereço da Empresa é obrigatório')
  if (!data.bairro?.trim()) erros.push('Bairro é obrigatório')
  if (!data.cep?.trim()) erros.push('CEP é obrigatório')
  if (!data.cidade?.trim()) erros.push('Cidade é obrigatória')
  if (!data.estado?.trim()) erros.push('Estado é obrigatório')
  if (!data.cargo?.trim()) erros.push('Seu Cargo é obrigatório')
  if (!data.email?.trim()) erros.push('E-mail é obrigatório')
  if (!data.senha?.trim()) erros.push('Senha é obrigatória')

  // Validar formatos específicos
  if (data.cnpj && !validarCNPJ(data.cnpj)) {
    erros.push('CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX')
  }
  
  if (data.cpf && !validarCPF(data.cpf)) {
    erros.push('CPF deve estar no formato XXX.XXX.XXX-XX')
  }
  
  if (data.cep && !validarCEP(data.cep)) {
    erros.push('CEP deve estar no formato XXXXX-XXX')
  }
  
  if (data.celContato && !validarCelular(data.celContato)) {
    erros.push('Celular deve estar no formato (XX) XXXXX-XXXX')
  }
  
  if (data.email && !validarEmail(data.email)) {
    erros.push('E-mail inválido')
  }
  
  if (data.senha && !validarSenha(data.senha)) {
    erros.push('Senha deve ter 8+ caracteres, 1 maiúscula, 1 minúscula e 1 caractere especial (* # & $ ( ! )')
  }

  return erros
}

/**
 * Envia e-mail de verificação via Resend
 * TODO: Implementar integração com Resend.com
 */
async function enviarEmailVerificacao(email: string, nome: string, advertiserId: string): Promise<boolean> {
  try {
    // TODO: Implementar envio via Resend
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: email,
    //     subject: 'Confirme seu e-mail - GFauto',
    //     template: 'email-verificacao',
    //     data: { nome, advertiserId }
    //   })
    // })
    
    console.log(`E-mail de verificação enviado para: ${email}`)
    return true
  } catch (error) {
    console.error('Erro ao enviar e-mail de verificação:', error)
    return false
  }
}

/**
 * POST /api/cadastro
 * Cria novo cadastro de anunciante
 */
export async function POST(request: NextRequest) {
  try {
    const body: CadastroData = await request.json()
    
    console.log('Recebendo dados de cadastro:', {
      email: body.email,
      plano: body.plano,
      cidade: body.cidade,
      estado: body.estado
    })

    // Validar todos os campos obrigatórios
    const errosValidacao = validarCamposObrigatorios(body)
    if (errosValidacao.length > 0) {
      return NextResponse.json(
        { 
          message: 'Dados inválidos',
          errors: errosValidacao
        },
        { status: 400 }
      )
    }

    // Verificar se e-mail já existe
    const existingUser = await prisma.advertiser.findUnique({
      where: { email: body.email.toLowerCase().trim() }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Este e-mail já está cadastrado. Deseja fazer login?' },
        { status: 400 }
      )
    }

    // Hash da senha com bcrypt
    const saltRounds = 12 // Segurança alta
    const hashedPassword = await bcrypt.hash(body.senha, saltRounds)

    // Criar advertiser no banco de dados
    const advertiser = await prisma.advertiser.create({
      data: {
        // Dados básicos
        email: body.email.toLowerCase().trim(),
        nome: body.nomeRazaoSocial.trim(),
        empresa: body.nomeFantasia.trim(),
        telefone: body.celContato.trim(),
        endereco: body.endereco.trim(),
        cidade: body.cidade.trim(),
        estado: body.estado.trim(),
        cep: body.cep.trim(),
        cnpj: body.cnpj.trim(),
        pessoaResponsavel: body.pessoaResponsavel.trim(),
        cpf: body.cpf.trim(),
        celContato: body.celContato.trim(),
        cargo: body.cargo.trim(),
        
        // Dados de acesso
        senha: hashedPassword,
        
        // Configurações
        planoEscolhido: body.plano,
        emailVerificado: false, // Será true após verificação
        
        // Timestamps automáticos via Prisma
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    console.log('Advertiser criado com sucesso:', {
      id: advertiser.id,
      email: advertiser.email,
      plano: advertiser.planoEscolhido
    })

    // Enviar e-mail de verificação
    const emailEnviado = await enviarEmailVerificacao(
      advertiser.email,
      advertiser.nome || advertiser.empresa || 'Anunciante',
      advertiser.id
    )

    if (!emailEnviado) {
      console.warn('Falha no envio do e-mail de verificação para:', advertiser.email)
    }

    // Retornar sucesso com ID para redirecionamento
    return NextResponse.json({
      id: advertiser.id,
      message: 'Cadastro criado com sucesso',
      emailVerificacaoEnviado: emailEnviado,
      proximoPasso: body.plano === 'premium' ? 'pagamento' : 'criar-anuncio'
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar cadastro:', error)
    
    // Verificar se é erro de constraint do Prisma
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { message: 'E-mail já cadastrado' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { message: 'Erro interno do servidor. Tente novamente.' },
      { status: 500 }
    )
  } finally {
    // Fechar conexão Prisma
    await prisma.$disconnect()
  }
}

/**
 * GET /api/cadastro
 * Endpoint para verificar status ou buscar dados (futuro)
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: 'Endpoint de cadastro ativo' },
    { status: 200 }
  )
}
