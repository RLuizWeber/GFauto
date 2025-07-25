import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CidadeIBGE {
  id: number;
  nome: string;
  microrregiao?: {
    mesorregiao?: {
      UF?: {
        id: number;
        sigla: string;
        nome: string;
      }
    }
  } | null;
  'regiao-imediata'?: {
    'regiao-intermediaria'?: {
      UF?: {
        id: number;
        sigla: string;
        nome: string;
      }
    }
  } | null;
}

async function buscarCidadesIBGE(): Promise<CidadeIBGE[]> {
  try {
    console.log('🔄 Buscando municípios da API IBGE...');
    
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
    
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

function obterSiglaEstado(cidade: CidadeIBGE): string | null {
  // Tentar primeira estrutura: microrregiao.mesorregiao.UF.sigla
  try {
    const sigla1 = cidade.microrregiao?.mesorregiao?.UF?.sigla;
    if (sigla1) return sigla1;
  } catch (error) {
    console.warn(`⚠️ Erro ao acessar microrregiao para cidade ${cidade.nome}:`, error);
  }
  
  // Tentar segunda estrutura: regiao-imediata.regiao-intermediaria.UF.sigla
  try {
    const sigla2 = cidade['regiao-imediata']?.['regiao-intermediaria']?.UF?.sigla;
    if (sigla2) return sigla2;
  } catch (error) {
    console.warn(`⚠️ Erro ao acessar regiao-imediata para cidade ${cidade.nome}:`, error);
  }
  
  return null;
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
    
    // Buscar estados do banco e criar mapa sigla → ID
    const estados = await prisma.estado.findMany();
    const estadoMap = new Map(estados.map(e => [e.sigla, e.id]));
    
    const cidadesIBGE = await buscarCidadesIBGE();
    
    console.log('🗑️ Limpando tabela cidades...');
    await prisma.cidade.deleteMany();
    
    console.log('💾 Processando e inserindo cidades...');
    
    // Filtrar e processar cidades válidas
    const cidadesValidas: Array<{id: string, nome: string, estadoId: string}> = [];
    let cidadesInvalidas = 0;
    
    for (const cidade of cidadesIBGE) {
      try {
        const siglaEstado = obterSiglaEstado(cidade);
        
        if (!siglaEstado) {
          console.warn(`⚠️ Cidade sem sigla de estado: ${cidade.nome} (ID: ${cidade.id})`);
          cidadesInvalidas++;
          continue;
        }
        
        if (!estadoMap.has(siglaEstado)) {
          console.warn(`⚠️ Estado não encontrado no banco: ${siglaEstado} para cidade ${cidade.nome}`);
          cidadesInvalidas++;
          continue;
        }
        
        const slug = criarSlug(cidade.nome, siglaEstado);
        const estadoId = estadoMap.get(siglaEstado)!;
        
        cidadesValidas.push({
          id: slug,
          nome: cidade.nome,
          estadoId: estadoId
        });
        
      } catch (error) {
        console.error(`❌ Erro ao processar cidade ${cidade.nome}:`, error);
        cidadesInvalidas++;
      }
    }
    
    console.log(`📋 ${cidadesValidas.length} cidades válidas para inserção`);
    console.log(`⚠️ ${cidadesInvalidas} cidades inválidas ignoradas`);
    
    if (cidadesValidas.length === 0) {
      console.log('❌ Nenhuma cidade válida encontrada. Abortando inserção.');
      return;
    }
    
    // Inserir em lotes para melhor performance
    const TAMANHO_LOTE = 1000;
    let totalInserido = 0;
    
    for (let i = 0; i < cidadesValidas.length; i += TAMANHO_LOTE) {
      const lote = cidadesValidas.slice(i, i + TAMANHO_LOTE);
      
      try {
        const resultado = await prisma.cidade.createMany({
          data: lote,
          skipDuplicates: true // Evita erros de duplicação
        });
        
        totalInserido += resultado.count;
        console.log(`📦 Lote ${Math.floor(i/TAMANHO_LOTE) + 1}: ${resultado.count} cidades inseridas`);
        
      } catch (error) {
        console.error(`❌ Erro ao inserir lote ${Math.floor(i/TAMANHO_LOTE) + 1}:`, error);
        // Continua com o próximo lote
      }
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