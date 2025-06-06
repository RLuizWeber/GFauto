// Script para popular o banco de dados com especialidades automotivas padrão
// Este script deve ser executado no ambiente de desenvolvimento

const especialidadesPadrao = [
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
  "Rodas Esportivas - Novas e Usadas",
  "Correias e Mangueiras",
  "Rolamentos e Retentores",
  "Direção Hidráulica",
  "Seguro e DPVAT"
];

// Função para popular o banco de dados
async function popularEspecialidades() {
  try {
    // Aqui você deve implementar a lógica para inserir as especialidades no banco de dados
    // Exemplo usando Prisma (ajuste conforme seu ORM ou método de acesso ao banco):
    
    /*
    const prisma = new PrismaClient();
    
    for (const especialidade of especialidadesPadrao) {
      await prisma.especialidade.upsert({
        where: { nome: especialidade },
        update: {},
        create: { nome: especialidade },
      });
    }
    
    console.log('Especialidades populadas com sucesso!');
    */
    
    console.log('Lista de especialidades para popular o banco de dados:');
    especialidadesPadrao.forEach((esp, index) => {
      console.log(`${index + 1}. ${esp}`);
    });
    
  } catch (error) {
    console.error('Erro ao popular especialidades:', error);
  }
}

// Executar a função
popularEspecialidades();
