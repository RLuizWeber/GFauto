import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CidadeIBGE {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        id: number;
        sigla: string;
        nome: string;
      }
    }
  }
}

async function buscarCidadesIBGE(): Promise<CidadeIBGE[]> {
  try {
    console.log('🔄 Buscando municípios da API IBGE...');
    
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios' );
    
    if (!response.ok) {
      throw new Error(`Erro na API IBGE: ${response.status}`);
    }
    
    const cidades: CidadeIBGE[] = await response.json();
    console.log(`📥 ${cidades.length} municípios encontrados na API IBGE`);
    
    return cidades;
    
  } catch (error) {
    console.error('❌ Erro ao buscar cidades da API IBGE:', error);
    throw error;
  }
}

function criarSlug(nome: string, siglaEstado: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
    + '-' + siglaEstado.toLowerCase();
}

async function popularCidades() {
  try {
    // Verificar se estados existem
    const totalEstados = await prisma.estado.count();
    if (totalEstados === 0) {
      console.log('❌ Nenhum estado encontrado. Execute primeiro o script de estados.');
      return;
    }
    
    console.log(`✅ ${totalEstados} estados encontrados no banco`);
    
    // CORREÇÃO: Buscar estados do banco e criar mapa sigla → ID
    const estados = await prisma.estado.findMany();
    const estadoMap = new Map(estados.map(e => [e.sigla, e.id]));
    
    const cidadesIBGE = await buscarCidadesIBGE();
    
    console.log('🗑️ Limpando tabela cidades...');
    await prisma.cidade.deleteMany();
    
    console.log('💾 Processando e inserindo cidades...');
    
    // CORREÇÃO: Usar ID real do estado em vez da sigla
    const cidadesParaInserir = cidadesIBGE.map(cidade => {
      const siglaEstado = cidade.microrregiao.mesorregiao.UF.sigla;
      const slug = criarSlug(cidade.nome, siglaEstado);
      
      return {
        id: slug,
        nome: cidade.nome,
        estadoId: estadoMap.get(siglaEstado)  // CORREÇÃO: Usa ID real do estado
      };
    });
    
    // Inserir em lotes para melhor performance
    const TAMANHO_LOTE = 1000;
    let totalInserido = 0;
    
    for (let i = 0; i < cidadesParaInserir.length; i += TAMANHO_LOTE) {
      const lote = cidadesParaInserir.slice(i, i + TAMANHO_LOTE);
      
      const resultado = await prisma.cidade.createMany({
        data: lote
      });
      
      totalInserido += resultado.count;
      console.log(`📦 Lote ${Math.floor(i/TAMANHO_LOTE) + 1}: ${resultado.count} cidades inseridas`);
    }
    
    console.log(`✅ ${totalInserido} cidades inseridas com sucesso!`);
    
    // Verificar inserção por estado
    const estadosComCidades = await prisma.estado.findMany({
      include: {
        _count: {
          select: { cidades: true }
        }
      },
      orderBy: { sigla: 'asc' }
    });
    
    console.log('\n📊 Cidades por estado:');
    estadosComCidades.forEach(estado => {
      console.log(`${estado.sigla}: ${estado._count.cidades} cidades`);
    });
    
    const totalCidades = await prisma.cidade.count();
    console.log(`\n📈 Total de cidades na tabela: ${totalCidades}`);
    
  } catch (error) {
    console.error('❌ Erro ao popular cidades:', error);
  } finally {
    await prisma.$disconnect();
  }
}

popularCidades();