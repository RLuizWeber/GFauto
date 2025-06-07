// Caminho: /app/api/admin/popular-fornecedores/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Chave de API para autenticação (em produção, use variáveis de ambiente)
const API_KEY = 'gfauto-admin-2025';

// Dados dos fornecedores de auto elétricas em Passo Fundo
const fornecedoresPremium = [
  {
    nome: "Auto Elétrica Voltagem Premium",
    descricao: "Especialistas em sistemas elétricos automotivos com 20 anos de experiência. Atendemos veículos nacionais e importados.",
    endereco: "Av. Brasil, 1500 - Centro, Passo Fundo - RS",
    telefone: "(54) 3311-1234",
    email: "contato@voltagempremium.com.br",
    website: "www.voltagempremium.com.br",
    plano: "premium"
  },
  {
    nome: "Eletro Car Service",
    descricao: "Serviços de auto elétrica com equipamentos de última geração. Diagnóstico computadorizado e garantia em todos os serviços.",
    endereco: "Rua Morom, 2500 - São Cristóvão, Passo Fundo - RS",
    telefone: "(54) 3313-5678",
    email: "atendimento@eletrocarservice.com.br",
    website: "www.eletrocarservice.com.br",
    plano: "premium"
  },
  {
    nome: "Master Auto Elétrica",
    descricao: "Soluções completas em auto elétrica para veículos nacionais e importados. Especialistas em injeção eletrônica e sistemas de ignição.",
    endereco: "Rua Paissandu, 1234 - Centro, Passo Fundo - RS",
    telefone: "(54) 3314-9876",
    email: "contato@masterautoeletrica.com.br",
    website: "www.masterautoeletrica.com.br",
    plano: "premium"
  }
];

const fornecedoresCortesia = [
  {
    nome: "Auto Elétrica do Paulo",
    descricao: "Serviços de auto elétrica com preços acessíveis. Atendimento rápido e eficiente.",
    endereco: "Rua Teixeira Soares, 789 - Vila Rodrigues, Passo Fundo - RS",
    telefone: "(54) 3315-4321",
    email: "paulo@autoeletrica.com.br",
    website: "",
    plano: "cortesia"
  },
  {
    nome: "Elétrica Automotiva Luz",
    descricao: "Reparos e instalação de acessórios elétricos para veículos. Orçamento sem compromisso.",
    endereco: "Av. Presidente Vargas, 456 - São José, Passo Fundo - RS",
    telefone: "(54) 3316-7890",
    email: "contato@eletricaautomotivaluz.com.br",
    website: "",
    plano: "cortesia"
  },
  {
    nome: "Auto Elétrica Confiança",
    descricao: "Serviços de auto elétrica com atendimento de emergência. Trabalhamos com todas as marcas.",
    endereco: "Rua Independência, 321 - Centro, Passo Fundo - RS",
    telefone: "(54) 3317-0123",
    email: "",
    website: "",
    plano: "cortesia"
  },
  {
    nome: "Elétrica Veicular Rápida",
    descricao: "Especialistas em alternadores e motores de partida. Atendimento rápido e eficiente.",
    endereco: "Av. Brasil Oeste, 987 - Boqueirão, Passo Fundo - RS",
    telefone: "(54) 3318-5432",
    email: "",
    website: "",
    plano: "cortesia"
  }
];

export async function GET(request: NextRequest) {
  // Verificar autenticação
  const apiKey = request.nextUrl.searchParams.get('key');
  if (apiKey !== API_KEY) {
    return NextResponse.json(
      { error: 'Acesso não autorizado' },
      { status: 401 }
    );
  }

  try {
    const prisma = new PrismaClient();
    
    // Verificar se já existe o estado do Rio Grande do Sul
    let estado = await prisma.estado.findFirst({
      where: {
        sigla: 'RS'
      }
    });
    
    // Se não existir, criar o estado
    if (!estado) {
      estado = await prisma.estado.create({
        data: {
          nome: 'Rio Grande do Sul',
          sigla: 'RS'
        }
      });
      console.log('Estado criado:', estado);
    } else {
      console.log('Estado encontrado:', estado);
    }
    
    // Verificar se já existe a cidade de Passo Fundo
    let cidade = await prisma.cidade.findFirst({
      where: {
        nome: 'Passo Fundo',
        estadoId: estado.id
      }
    });
    
    // Se não existir, criar a cidade
    if (!cidade) {
      cidade = await prisma.cidade.create({
        data: {
          nome: 'Passo Fundo',
          estadoId: estado.id
        }
      });
      console.log('Cidade criada:', cidade);
    } else {
      console.log('Cidade encontrada:', cidade);
    }
    
    // Verificar se já existe a especialidade Auto Elétricas
    let especialidade = await prisma.especialidade.findFirst({
      where: {
        nome: 'Auto Elétricas'
      }
    });
    
    // Se não existir, criar a especialidade
    if (!especialidade) {
      especialidade = await prisma.especialidade.create({
        data: {
          nome: 'Auto Elétricas',
          slug: 'auto-eletricas'
        }
      });
      console.log('Especialidade criada:', especialidade);
    } else {
      console.log('Especialidade encontrada:', especialidade);
    }
    
    // Criar fornecedores premium
    const resultadosPremium = await Promise.all(
      fornecedoresPremium.map(async (fornecedor) => {
        // Verificar se o fornecedor já existe
        const fornecedorExistente = await prisma.anuncio.findFirst({
          where: {
            titulo: fornecedor.nome,
            especialidadeId: especialidade.id
          }
        });
        
        if (fornecedorExistente) {
          return { status: 'existente', fornecedor: fornecedorExistente };
        }
        
        // Gerar um ID de preferência único para o Mercado Pago (simulado)
        const mercadopagoPreferenceId = `pref_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        
        // Criar novo fornecedor usando o modelo Anuncio
        const novoFornecedor = await prisma.anuncio.create({
          data: {
            titulo: fornecedor.nome,
            descricao: fornecedor.descricao,
            endereco: fornecedor.endereco,
            telefone: fornecedor.telefone,
            email: fornecedor.email || null,
            site: fornecedor.website || null,
            plano: fornecedor.plano,
            especialidadeId: especialidade.id,
            cidadeId: cidade.id,
            // Campos obrigatórios do modelo Anuncio
            advertiserId: 'admin', // ID do anunciante (admin para registros do sistema)
            mercadopagoPreferenceId: mercadopagoPreferenceId,
            status: 'PUBLICADO' // Status do anúncio (enum StatusAnuncio)
          }
        });
        
        return { status: 'criado', fornecedor: novoFornecedor };
      })
    );
    
    // Criar fornecedores cortesia
    const resultadosCortesia = await Promise.all(
      fornecedoresCortesia.map(async (fornecedor) => {
        // Verificar se o fornecedor já existe
        const fornecedorExistente = await prisma.anuncio.findFirst({
          where: {
            titulo: fornecedor.nome,
            especialidadeId: especialidade.id
          }
        });
        
        if (fornecedorExistente) {
          return { status: 'existente', fornecedor: fornecedorExistente };
        }
        
        // Gerar um ID de preferência único para o Mercado Pago (simulado)
        const mercadopagoPreferenceId = `pref_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        
        // Criar novo fornecedor usando o modelo Anuncio
        const novoFornecedor = await prisma.anuncio.create({
          data: {
            titulo: fornecedor.nome,
            descricao: fornecedor.descricao,
            endereco: fornecedor.endereco,
            telefone: fornecedor.telefone,
            email: fornecedor.email || null,
            site: fornecedor.website || null,
            plano: fornecedor.plano,
            especialidadeId: especialidade.id,
            cidadeId: cidade.id,
            // Campos obrigatórios do modelo Anuncio
            advertiserId: 'admin', // ID do anunciante (admin para registros do sistema)
            mercadopagoPreferenceId: mercadopagoPreferenceId,
            status: 'PUBLICADO' // Status do anúncio (enum StatusAnuncio)
          }
        });
        
        return { status: 'criado', fornecedor: novoFornecedor };
      })
    );
    
    await prisma.$disconnect();
    
    return NextResponse.json({
      success: true,
      estado,
      cidade,
      especialidade,
      fornecedoresPremium: resultadosPremium,
      fornecedoresCortesia: resultadosCortesia
    });
    
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
    return NextResponse.json(
      { error: 'Erro ao popular banco de dados', details: error },
      { status: 500 }
    );
  }
}
