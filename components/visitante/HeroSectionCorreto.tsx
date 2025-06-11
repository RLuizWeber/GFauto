'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Base de dados de estados brasileiros
const ESTADOS_BRASIL = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
];

// Base de dados de cidades por estado
const CIDADES_POR_ESTADO: { [key: string]: string[] } = {
  'RS': [
    'Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria',
    'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande',
    'Alvorada', 'Passo Fundo', 'Sapucaia do Sul', 'Uruguaiana', 'Santa Cruz do Sul',
    'Cachoeirinha', 'Bagé', 'Bento Gonçalves', 'Erechim', 'Guaíba'
  ],
  'SP': [
    'São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André',
    'Osasco', 'Ribeirão Preto', 'Sorocaba', 'Santos', 'Mauá',
    'São José dos Campos', 'Mogi das Cruzes', 'Diadema', 'Jundiaí', 'Carapicuíba'
  ],
  'RJ': [
    'Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói',
    'Belford Roxo', 'São João de Meriti', 'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda'
  ],
  'MG': [
    'Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim',
    'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga'
  ],
  'BA': [
    'Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna',
    'Juazeiro', 'Lauro de Freitas', 'Ilhéus', 'Jequié', 'Teixeira de Freitas'
  ],
  'PR': [
    'Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel',
    'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá'
  ],
  'SC': [
    'Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma',
    'Chapecó', 'Itajaí', 'Lages', 'Jaraguá do Sul', 'Palhoça'
  ],
  'GO': [
    'Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia',
    'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Novo Gama'
  ],
  'PE': [
    'Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina',
    'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão'
  ],
  'CE': [
    'Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral',
    'Crato', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá'
  ]
};

// Sugestões para o campo "O que procura?"
const SUGESTOES_SERVICOS = [
  'Oficina mecânica', 'Auto elétrica', 'Funilaria e pintura', 'Pneus e rodas',
  'Autopeças', 'Concessionária', 'Lavagem automotiva', 'Ar condicionado automotivo',
  'Alinhamento e balanceamento', 'Troca de óleo', 'Revisão completa', 'Freios',
  'Suspensão', 'Motor', 'Câmbio', 'Farol quebrado', 'Para-brisa', 'Bateria'
];

export default function HeroSectionCorreto() {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [servico, setServico] = useState('');
  const [sugestoesEstado, setSugestoesEstado] = useState<typeof ESTADOS_BRASIL>([]);
  const [sugestoesCidade, setSugestoesCidade] = useState<string[]>([]);
  const [sugestoesServico, setSugestoesServico] = useState<string[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>('');
  const router = useRouter();

  // Função para buscar estados
  const buscarEstados = (termo: string) => {
    if (termo.length === 0) {
      setSugestoesEstado([]);
      return;
    }
    
    const termoLower = termo.toLowerCase();
    const resultados = ESTADOS_BRASIL.filter(estado => 
      estado.nome.toLowerCase().includes(termoLower) || 
      estado.sigla.toLowerCase().includes(termoLower)
    );
    setSugestoesEstado(resultados);
  };

  // Função para buscar cidades
  const buscarCidades = (termo: string) => {
    if (!estadoSelecionado || termo.length === 0) {
      setSugestoesCidade([]);
      return;
    }
    
    const cidadesDoEstado = CIDADES_POR_ESTADO[estadoSelecionado] || [];
    const termoLower = termo.toLowerCase();
    const resultados = cidadesDoEstado.filter(cidade => 
      cidade.toLowerCase().includes(termoLower)
    );
    setSugestoesCidade(resultados);
  };

  // Função para buscar serviços
  const buscarServicos = (termo: string) => {
    if (termo.length === 0) {
      setSugestoesServico([]);
      return;
    }
    
    const termoLower = termo.toLowerCase();
    const resultados = SUGESTOES_SERVICOS.filter(servico => 
      servico.toLowerCase().includes(termoLower)
    );
    setSugestoesServico(resultados);
  };

  // Função para detectar estado automaticamente
  const detectarEstado = (valor: string) => {
    const valorLower = valor.toLowerCase();
    
    // Buscar por sigla exata
    const estadoPorSigla = ESTADOS_BRASIL.find(estado => 
      estado.sigla.toLowerCase() === valorLower
    );
    if (estadoPorSigla) {
      return estadoPorSigla.sigla;
    }
    
    // Buscar por nome completo
    const estadoPorNome = ESTADOS_BRASIL.find(estado => 
      estado.nome.toLowerCase() === valorLower
    );
    if (estadoPorNome) {
      return estadoPorNome.sigla;
    }
    
    // Buscar por nome parcial
    const estadoParcial = ESTADOS_BRASIL.find(estado => 
      estado.nome.toLowerCase().includes(valorLower) && valorLower.length > 2
    );
    if (estadoParcial) {
      return estadoParcial.sigla;
    }
    
    return '';
  };

  // Handlers para os campos
  const handleEstadoChange = (valor: string) => {
    setEstado(valor);
    buscarEstados(valor);
    
    // Detectar estado automaticamente
    const estadoDetectado = detectarEstado(valor);
    if (estadoDetectado) {
      setEstadoSelecionado(estadoDetectado);
    } else {
      setEstadoSelecionado('');
      setCidade('');
    }
  };

  const handleCidadeChange = (valor: string) => {
    setCidade(valor);
    buscarCidades(valor);
  };

  const handleServicoChange = (valor: string) => {
    setServico(valor);
    buscarServicos(valor);
  };

  // Selecionar estado
  const selecionarEstado = (estadoObj: typeof ESTADOS_BRASIL[0]) => {
    setEstado(`${estadoObj.sigla} - ${estadoObj.nome}`);
    setEstadoSelecionado(estadoObj.sigla);
    setSugestoesEstado([]);
    setCidade('');
  };

  // Selecionar cidade
  const selecionarCidade = (cidadeNome: string) => {
    setCidade(cidadeNome);
    setSugestoesCidade([]);
  };

  // Selecionar serviço
  const selecionarServico = (servicoNome: string) => {
    setServico(servicoNome);
    setSugestoesServico([]);
  };

  // Função de busca
  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!estado || !cidade || !servico) {
      alert('Por favor, preencha todos os campos antes de buscar.');
      return;
    }

    if (!estadoSelecionado) {
      alert('Por favor, selecione um estado válido.');
      return;
    }

    // Validar se cidade pertence ao estado selecionado
    const cidadesDoEstado = CIDADES_POR_ESTADO[estadoSelecionado] || [];
    const cidadeValida = cidadesDoEstado.some(c => 
      cidade.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(cidade.toLowerCase())
    );
    
    if (!cidadeValida) {
      alert(`A cidade "${cidade}" não foi encontrada no estado selecionado. Por favor, selecione uma cidade válida.`);
      return;
    }

    // Redirecionar para página de resultados conforme README
    const params = new URLSearchParams({
      estado: estadoSelecionado,
      cidade: cidade,
      especialidade: servico
    });
    
    router.push(`/resultados?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header com Logo e Textos "Bem Vindo!" */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Logo Principal - 200px largura */}
            <div className="flex-shrink-0">
              <img 
                src="/images/fluxo_visitante/logo.png" 
                alt="Pesquise o melhor lugar para o seu carro" 
                className="h-auto max-w-full"
                style={{ width: '200px' }}
              />
            </div>
            
            {/* Textos do Header */}
            <div className="flex-1 lg:ml-12 text-center lg:text-right">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Bem Vindo!
              </h1>
              <p className="text-xl lg:text-2xl leading-relaxed">
                Acesse recursos exclusivos e informações detalhadas sobre serviços automotivos em sua região.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Central - Textos e 3 Veículos LADO A LADO */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Coluna Esquerda - Textos conforme especificação */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-6">
                Uma Proposta Ganha-Ganha
              </h2>
              
              <h3 className="text-2xl lg:text-3xl font-semibold text-blue-500 mb-8">
                Em que todos os envolvidos ganham.
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Encontre os melhores serviços para seu veículo na sua cidade. Pesquise oficinas, autopeças, concessionárias e muito mais.
              </p>
            </div>
            
            {/* Coluna Direita - 3 Veículos LADO A LADO (150px cada) */}
            <div className="flex justify-center items-center gap-4 flex-wrap lg:flex-nowrap">
              
              {/* Moto Azul - 150px largura */}
              <div className="flex-shrink-0">
                <img 
                  src="/images/fluxo_visitante/image001.jpg" 
                  alt="Moto" 
                  className="h-auto max-w-full rounded-lg shadow-md"
                  style={{ width: '150px' }}
                />
              </div>
              
              {/* Carro Vermelho - 150px largura */}
              <div className="flex-shrink-0">
                <img 
                  src="/images/fluxo_visitante/image003.jpg" 
                  alt="Carro Vermelho" 
                  className="h-auto max-w-full rounded-lg shadow-md"
                  style={{ width: '150px' }}
                />
              </div>
              
              {/* Carro Branco - 150px largura */}
              <div className="flex-shrink-0">
                <img 
                  src="/images/fluxo_visitante/image005.jpg" 
                  alt="Carro Branco" 
                  className="h-auto max-w-full rounded-lg shadow-md"
                  style={{ width: '150px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarja Verde com Cantos Arredondados */}
      <section className="bg-green-500 py-12 px-4">
        <div className="container mx-auto">
          
          {/* Título da Seção */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Começar Agora
            </h3>
          </div>
          
          {/* Formulário de Busca com Cantos Arredondados */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleBuscar} className="space-y-6">
              
              {/* Três Campos na Mesma Linha SEM dropdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Campo Estado */}
                <div className="relative">
                  <label htmlFor="estado" className="block text-sm font-semibold text-gray-700 mb-2">
                    Estado
                  </label>
                  <input
                    type="text"
                    id="estado"
                    value={estado}
                    onChange={(e) => handleEstadoChange(e.target.value)}
                    placeholder="Ex: RS ou Rio Grande do Sul"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  
                  {/* Sugestões de Estados */}
                  {sugestoesEstado.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {sugestoesEstado.map((estado, index) => (
                        <div
                          key={index}
                          onClick={() => selecionarEstado(estado)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <span className="font-semibold text-blue-600">{estado.sigla}</span> - {estado.nome}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Campo Cidade - Habilita após selecionar estado */}
                <div className="relative">
                  <label htmlFor="cidade" className="block text-sm font-semibold text-gray-700 mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    value={cidade}
                    onChange={(e) => handleCidadeChange(e.target.value)}
                    placeholder={estadoSelecionado ? "Digite o nome da cidade" : "Selecione um estado primeiro"}
                    disabled={!estadoSelecionado}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    autoComplete="off"
                  />
                  
                  {/* Sugestões de Cidades */}
                  {sugestoesCidade.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {sugestoesCidade.map((cidade, index) => (
                        <div
                          key={index}
                          onClick={() => selecionarCidade(cidade)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          {cidade}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Campo O que procura? */}
                <div className="relative">
                  <label htmlFor="servico" className="block text-sm font-semibold text-gray-700 mb-2">
                    O que procura?
                  </label>
                  <input
                    type="text"
                    id="servico"
                    value={servico}
                    onChange={(e) => handleServicoChange(e.target.value)}
                    placeholder="Ex: farol quebrado, auto elétrica"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  
                  {/* Sugestões de Serviços */}
                  {sugestoesServico.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {sugestoesServico.map((servico, index) => (
                        <div
                          key={index}
                          onClick={() => selecionarServico(servico)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          {servico}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Botão de Busca */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Buscar Serviços
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
