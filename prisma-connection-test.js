// Arquivo de teste de conexão com o Prisma
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  console.log('Iniciando teste de conexão com o banco de dados...');
  
  try {
    const prisma = new PrismaClient();
    
    // Testar conexão básica
    console.log('Tentando conectar ao banco de dados...');
    await prisma.$connect();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Testar consulta simples
    console.log('\nTentando executar consulta simples...');
    
    // Verificar se existe algum estado
    const estadoCount = await prisma.estado.count();
    console.log(`✅ Consulta executada com sucesso! Número de estados: ${estadoCount}`);
    
    // Verificar se existe alguma cidade
    const cidadeCount = await prisma.cidade.count();
    console.log(`✅ Número de cidades: ${cidadeCount}`);
    
    // Verificar se existe alguma especialidade
    const especialidadeCount = await prisma.especialidade.count();
    console.log(`✅ Número de especialidades: ${especialidadeCount}`);
    
    // Verificar se existe algum anúncio
    const anuncioCount = await prisma.anuncio.count();
    console.log(`✅ Número de anúncios: ${anuncioCount}`);
    
    await prisma.$disconnect();
    console.log('\n✅ Teste concluído com sucesso! A conexão com o banco de dados está funcionando corretamente.');
    
  } catch (error) {
    console.error('\n❌ Erro ao conectar ao banco de dados:');
    console.error(error);
    
    if (error.message.includes('P1001')) {
      console.log('\n⚠️ Erro de conexão: O banco de dados não está acessível.');
      console.log('Verifique se:');
      console.log('- O servidor do banco de dados está em execução');
      console.log('- A string de conexão (DATABASE_URL) está correta');
      console.log('- Não há firewall bloqueando a conexão');
    } else if (error.message.includes('P1003')) {
      console.log('\n⚠️ Erro de banco de dados: O banco de dados não existe.');
      console.log('Você precisa criar o banco de dados antes de conectar.');
    } else if (error.message.includes('P1017')) {
      console.log('\n⚠️ Erro de servidor: Conexão recusada.');
      console.log('Verifique se o servidor está aceitando conexões do seu IP.');
    } else if (error.message.includes('P1000')) {
      console.log('\n⚠️ Erro de autenticação: Credenciais inválidas.');
      console.log('Verifique o usuário e senha na string de conexão.');
    }
    
    process.exit(1);
  }
}

testConnection();
