// Script para popular o banco de dados com fornecedores de auto elétricas em Passo Fundo
// Este script deve ser executado no ambiente de desenvolvimento

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Iniciando população do banco de dados...');

    // Verificar se já existe o estado do Rio Grande do Sul
    const estadoRS = await prisma.estado.upsert({
      where: { sigla: 'RS' },
      update: {},
      create: {
        id: 'rs',
        nome: 'Rio Grande do Sul',
        sigla: 'RS'
      }
    });
    console.log('Estado criado/verificado:', estadoRS.nome);

    // Inserir a cidade de Passo Fundo se não existir
    const cidadePassoFundo = await prisma.cidade.upsert({
      where: { 
        nome_estado_id: {
          nome: 'Passo Fundo',
          estado_id: 'rs'
        }
      },
      update: {},
      create: {
        id: 'passo_fundo',
        nome: 'Passo Fundo',
        estado_id: 'rs'
      }
    });
    console.log('Cidade criada/verificada:', cidadePassoFundo.nome);

    // Inserir a especialidade "Auto Elétricas" se não existir
    const especialidadeAutoEletricas = await prisma.especialidade.upsert({
      where: { nome: 'Auto Elétricas' },
      update: {},
      create: {
        id: 'auto_eletricas',
        nome: 'Auto Elétricas'
      }
    });
    console.log('Especialidade criada/verificada:', especialidadeAutoEletricas.nome);

    // Fornecedores premium
    const fornecedoresPremium = [
      {
        id: 'auto_eletrica_premium_1',
        nome: 'Auto Elétrica Voltagem Premium',
        descricao: 'Especialistas em sistemas elétricos automotivos com mais de 20 anos de experiência. Atendimento personalizado e garantia em todos os serviços.',
        endereco: 'Av. Brasil, 1500 - Centro, Passo Fundo - RS',
        telefone: '(54) 3311-1234',
        email: 'contato@voltagempremium.com.br',
        website: 'www.voltagempremium.com.br',
        tipo: 'premium',
        cidade_id: 'passo_fundo'
      },
      {
        id: 'auto_eletrica_premium_2',
        nome: 'Eletro Car Service',
        descricao: 'Serviços completos de auto elétrica com equipamentos de última geração. Técnicos certificados e peças originais.',
        endereco: 'Rua Morom, 2340 - Centro, Passo Fundo - RS',
        telefone: '(54) 3313-5678',
        email: 'atendimento@eletrocarservice.com.br',
        website: 'www.eletrocarservice.com.br',
        tipo: 'premium',
        cidade_id: 'passo_fundo'
      },
      {
        id: 'auto_eletrica_premium_3',
        nome: 'Master Auto Elétrica',
        descricao: 'Soluções completas em auto elétrica para veículos nacionais e importados. Diagnóstico computadorizado e serviço expresso.',
        endereco: 'Av. Presidente Vargas, 980 - São Cristóvão, Passo Fundo - RS',
        telefone: '(54) 3314-9012',
        email: 'master@masterautoeletrica.com.br',
        website: 'www.masterautoeletrica.com.br',
        tipo: 'premium',
        cidade_id: 'passo_fundo'
      }
    ];

    // Fornecedores cortesia
    const fornecedoresCortesia = [
      {
        id: 'auto_eletrica_cortesia_1',
        nome: 'Auto Elétrica do Paulo',
        descricao: 'Serviços de auto elétrica para todos os tipos de veículos. Atendimento rápido e preços acessíveis.',
        endereco: 'Rua Independência, 450 - Vila Rodrigues, Passo Fundo - RS',
        telefone: '(54) 3316-7890',
        email: 'paulo@autoeletricadopaulo.com.br',
        website: '',
        tipo: 'cortesia',
        cidade_id: 'passo_fundo'
      },
      {
        id: 'auto_eletrica_cortesia_2',
        nome: 'Elétrica Automotiva Luz',
        descricao: 'Reparos elétricos, instalação de acessórios e manutenção preventiva. Orçamento sem compromisso.',
        endereco: 'Rua Teixeira Soares, 789 - Boqueirão, Passo Fundo - RS',
        telefone: '(54) 3317-3456',
        email: 'contato@eletricaautomotivaluz.com.br',
        website: '',
        tipo: 'cortesia',
        cidade_id: 'passo_fundo'
      },
      {
        id: 'auto_eletrica_cortesia_3',
        nome: 'Auto Elétrica Confiança',
        descricao: 'Serviços de auto elétrica com qualidade e honestidade. Atendemos chamados de emergência.',
        endereco: 'Av. Rio Grande do Sul, 1234 - Petrópolis, Passo Fundo - RS',
        telefone: '(54) 3318-6789',
        email: 'autoeletricaconfianca@gmail.com',
        website: '',
        tipo: 'cortesia',
        cidade_id: 'passo_fundo'
      },
      {
        id: 'auto_eletrica_cortesia_4',
        nome: 'Elétrica Veicular Rápida',
        descricao: 'Serviços de auto elétrica com agilidade e bom preço. Especialistas em alternadores e motores de partida.',
        endereco: 'Rua Paissandu, 567 - Centro, Passo Fundo - RS',
        telefone: '(54) 3319-0123',
        email: 'rapida@eletricaveicular.com.br',
        website: '',
        tipo: 'cortesia',
        cidade_id: 'passo_fundo'
      }
    ];

    // Inserir todos os fornecedores premium
    for (const fornecedor of fornecedoresPremium) {
      const createdFornecedor = await prisma.fornecedor.upsert({
        where: { id: fornecedor.id },
        update: fornecedor,
        create: fornecedor
      });
      console.log('Fornecedor premium criado/atualizado:', createdFornecedor.nome);

      // Relacionar com a especialidade
      await prisma.fornecedorEspecialidade.upsert({
        where: {
          fornecedor_id_especialidade_id: {
            fornecedor_id: fornecedor.id,
            especialidade_id: 'auto_eletricas'
          }
        },
        update: {},
        create: {
          fornecedor_id: fornecedor.id,
          especialidade_id: 'auto_eletricas'
        }
      });
    }

    // Inserir todos os fornecedores cortesia
    for (const fornecedor of fornecedoresCortesia) {
      const createdFornecedor = await prisma.fornecedor.upsert({
        where: { id: fornecedor.id },
        update: fornecedor,
        create: fornecedor
      });
      console.log('Fornecedor cortesia criado/atualizado:', createdFornecedor.nome);

      // Relacionar com a especialidade
      await prisma.fornecedorEspecialidade.upsert({
        where: {
          fornecedor_id_especialidade_id: {
            fornecedor_id: fornecedor.id,
            especialidade_id: 'auto_eletricas'
          }
        },
        update: {},
        create: {
          fornecedor_id: fornecedor.id,
          especialidade_id: 'auto_eletricas'
        }
      });
    }

    console.log('População do banco de dados concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
