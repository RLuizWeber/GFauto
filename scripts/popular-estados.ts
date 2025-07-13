import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESTADOS_BRASILEIROS = [
  { id: 'AC', nome: 'Acre', sigla: 'AC' },
  { id: 'AL', nome: 'Alagoas', sigla: 'AL' },
  { id: 'AP', nome: 'Amapá', sigla: 'AP' },
  { id: 'AM', nome: 'Amazonas', sigla: 'AM' },
  { id: 'BA', nome: 'Bahia', sigla: 'BA' },
  { id: 'CE', nome: 'Ceará', sigla: 'CE' },
  { id: 'DF', nome: 'Distrito Federal', sigla: 'DF' },
  { id: 'ES', nome: 'Espírito Santo', sigla: 'ES' },
  { id: 'GO', nome: 'Goiás', sigla: 'GO' },
  { id: 'MA', nome: 'Maranhão', sigla: 'MA' },
  { id: 'MT', nome: 'Mato Grosso', sigla: 'MT' },
  { id: 'MS', nome: 'Mato Grosso do Sul', sigla: 'MS' },
  { id: 'MG', nome: 'Minas Gerais', sigla: 'MG' },
  { id: 'PA', nome: 'Pará', sigla: 'PA' },
  { id: 'PB', nome: 'Paraíba', sigla: 'PB' },
  { id: 'PR', nome: 'Paraná', sigla: 'PR' },
  { id: 'PE', nome: 'Pernambuco', sigla: 'PE' },
  { id: 'PI', nome: 'Piauí', sigla: 'PI' },
  { id: 'RJ', nome: 'Rio de Janeiro', sigla: 'RJ' },
  { id: 'RN', nome: 'Rio Grande do Norte', sigla: 'RN' },
  { id: 'RS', nome: 'Rio Grande do Sul', sigla: 'RS' },
  { id: 'RO', nome: 'Rondônia', sigla: 'RO' },
  { id: 'RR', nome: 'Roraima', sigla: 'RR' },
  { id: 'SC', nome: 'Santa Catarina', sigla: 'SC' },
  { id: 'SP', nome: 'São Paulo', sigla: 'SP' },
  { id: 'SE', nome: 'Sergipe', sigla: 'SE' },
  { id: 'TO', nome: 'Tocantins', sigla: 'TO' }
];

async function popularEstados() {
  try {
    console.log('Iniciando população da tabela estados...');
    
    // Limpar tabela existente
    await prisma.estado.deleteMany();
    
    // Inserir todos os estados
    const resultado = await prisma.estado.createMany({
      data: ESTADOS_BRASILEIROS
    });
    
    console.log(`✅ ${resultado.count} estados inseridos com sucesso!`);
    
    // Verificar inserção
    const total = await prisma.estado.count();
    console.log(`📊 Total de estados na tabela: ${total}`);
    
  } catch (error) {
    console.error('❌ Erro ao popular estados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

popularEstados();
