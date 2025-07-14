import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function criarSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

const ESPECIALIDADES_AUTOMOTIVAS = [
  "Acessórios Alarmes e Som",
  "Embreagens",
  "Sistemas Anti-Furto",
  "Acessórios Pick-Up / Caminhões",
  "Estofarias e Revestimento",
  "Som Automotivo",
  "Adesivação Automotiva",
  "Faróis, Lanternas e Piscas",
  "Teto Solar",
  "Aditivos em Geral",
  "Filtros - Linha Leve e Pesada",
  "Tinta Automotiva",
  "Advogados de Trânsito",
  "Freios em Geral - ABS",
  "Transporte Escolar / Turismo",
  "Air Bags e Cintos",
  "Gás Veicular",
  "Tunning",
  "Ar Condicionado - Ar quente",
  "Geometria e Balanceamento",
  "Veículos Especiais",
  "Auto Elétricas",
  "Grilos e Painéis",
  "Velocímetros - Contagiros",
  "Alto-Falantes",
  "Guinchos - Linha Leve e Pesada",
  "Vidros e Travas Elétricas",
  "Auto Peças em Geral",
  "Hidráulicos - Bombas, Painéis",
  "Bancos em Couro",
  "Injeção Eletrônica",
  "Bloqueador para Veículos",
  "Lavagens, Garagens Estacionamentos",
  "Buchas e Mancais",
  "Pára-Brisas - Rev. e Consertos",
  "Camioneta - Consertos",
  "Pára-Choques - Rev. e Recuper.",
  "Carrocerias",
  "Placas Automotivas",
  "Central Formação Condutores",
  "Pneus",
  "Chapeação e Pintura",
  "Postos de Abastecimento",
  "Chaveiro",
  "Radiadores Consertos e Limpeza",
  "Cilindros de Rodas",
  "Regulagem Eletrônica",
  "Comandos e Cilíndros Hidráulicos",
  "Retíficas",
  "Conserto de Cilindro Mestre",
  "Revenda Motos, Autos e Caminhões",
  "Conversão Bi-Combustível",
  "Correias e Mangueiras",
  "Rolamentos e Retentores",
  "Direção Hidráulica",
  "Seguros"
];

// Converter array de strings para objetos com id e nome
const ESPECIALIDADES_DADOS = ESPECIALIDADES_AUTOMOTIVAS.map(nome => ({
  nome: nome,
  slug: criarSlug(nome)
}));

async function popularEspecialidades() {
  try {
    console.log('Iniciando população da tabela especialidades...');
    
    // Limpar tabela existente
    await prisma.especialidade.deleteMany();
    
    // Inserir todas as especialidades
    const resultado = await prisma.especialidade.createMany({
      data: ESPECIALIDADES_DADOS
    });
    
    console.log(`✅ ${resultado.count} especialidades inseridas com sucesso!`);
    
    // Verificar inserção
    const total = await prisma.especialidade.count();
    console.log(`📊 Total de especialidades na tabela: ${total}`);
    
    // Mostrar algumas especialidades inseridas
    const especialidades = await prisma.especialidade.findMany({
      take: 10,
      orderBy: { nome: 'asc' }
    });
    
    console.log('\n📋 Primeiras 10 especialidades inseridas:');
    especialidades.forEach(esp => {
      console.log(`- ${esp.nome} (${esp.id})`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao popular especialidades:', error);
  } finally {
    await prisma.$disconnect();
  }
}

popularEspecialidades();