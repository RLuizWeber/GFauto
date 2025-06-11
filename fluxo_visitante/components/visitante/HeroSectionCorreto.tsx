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
  ]
};

// Especialidades disponíveis
const ESPECIALIDADES = [
  'Auto Elétricas',
  'Auto Peças',
  'Oficinas Mecânicas',
  'Funilaria e Pintura',
  'Pneus e Rodas',
  'Som e Acessórios',
  'Vidros Automotivos',
  'Ar Condicionado Automotivo',
  'Injeção Eletrônica',
  'Suspensão e Freios'
];

// Mapeamento inteligente de termos
const MAPEAMENTO_BUSCA: { [key: string]: string } = {
  'farol': 'Auto Elétricas',
  'farol quebrado': 'Auto Elétricas',
  'luz': 'Auto Elétricas',
  'bateria': 'Auto Elétricas',
  'elétrica': 'Auto Elétricas',
  'eletrica': 'Auto Elétricas',
  'peça': 'Auto Peças',
  'peças': 'Auto Peças',
  'pecas': 'Auto Peças',
  'motor': 'Oficinas Mecânicas',
  'mecânica': 'Oficinas Mecânicas',
  'mecanica': 'Oficinas Mecânicas',
  'funilaria': 'Funilaria e Pintura',
  'pintura': 'Funilaria e Pintura',
  'amassado': 'Funilaria e Pintura',
  'pneu': 'Pneus e Rodas',
  'pneus': 'Pneus e Rodas',
  'roda': 'Pneus e Rodas',
  'rodas': 'Pneus e Rodas',
  'som': 'Som e Acessórios',
  'radio': 'Som e Acessórios',
  'rádio': 'Som e Acessórios',
  'vidro': 'Vidros Automotivos',
  'vidros': 'Vidros Automotivos',
  'parabrisa': 'Vidros Automotivos',
  'ar condicionado': 'Ar Condicionado Automotivo',
  'ar': 'Ar Condicionado Automotivo',
  'injeção': 'Injeção Eletrônica',
  'injecao': 'Injeção Eletrônica',
  'suspensão': 'Suspensão e Freios',
  'suspensao': 'Suspensão e Freios',
  'freio': 'Suspensão e Freios',
  'freios': 'Suspensão e Freios'
};

export default function HeroSectionCorreto() {
  const router = useRouter();
  
  // Estados do formulário
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  
  // Estados para autocompletar
  const [estadoSugestoes, setEstadoSugestoes] = useState<typeof ESTADOS_BRASIL>([]);
  const [cidadeSugestoes, setCidadeSugestoes] = useState<string[]>([]);
  const [especialidadeSugestoes, setEspecialidadeSugestoes] = useState<string[]>([]);
  
  // Estados para controle de exibição
  const [mostrarEstadoSugestoes, setMostrarEstadoSugestoes] = useState(false);
  const [mostrarCidadeSugestoes, setMostrarCidadeSugestoes] = useState(false);
  const [mostrarEspecialidadeSugestoes, setMostrarEspecialidadeSugestoes] = useState(false);
  
  // Estado selecionado (sigla)
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  
  // Função para filtrar estados
  const filtrarEstados = (termo: string) => {
    if (!termo) return [];
    const termoLower = termo.toLowerCase();
    return ESTADOS_BRASIL.filter(est => 
      est.sigla.toLowerCase().includes(termoLower) ||
      est.nome.toLowerCase().includes(termoLower)
    );
  };
  
  // Função para filtrar cidades
  const filtrarCidades = (termo: string, estadoSigla: string) => {
    if (!estadoSigla) return [];
    const cidades = CIDADES_POR_ESTADO[estadoSigla] || [];
    if (!termo) return cidades;
    
    const termoLower = termo.toLowerCase();
    return cidades.filter(cidade => 
      cidade.toLowerCase().includes(termoLower)
    );
  };
  
  // Função para filtrar especialidades
  const filtrarEspecialidades = (termo: string) => {
    if (!termo) return ESPECIALIDADES;
    
    const termoLower = termo.toLowerCase();
    const especialidadeMapeada = MAPEAMENTO_BUSCA[termoLower];
    if (especialidadeMapeada) {
      return [especialidadeMapeada];
    }
    
    return ESPECIALIDADES.filter(esp => 
      esp.toLowerCase().includes(termoLower)
    );
  };
  
  // Handlers para mudanças nos campos
  const handleEstadoChange = (valor: string) => {
    setEstado(valor);
    setEstadoSugestoes(filtrarEstados(valor));
    setMostrarEstadoSugestoes(true);
    
    // Limpar cidade quando estado muda
    setCidade('');
    setEstadoSelecionado('');
  };
  
  const handleCidadeChange = (valor: string) => {
    setCidade(valor);
    if (estadoSelecionado) {
      setCidadeSugestoes(filtrarCidades(valor, estadoSelecionado));
      setMostrarCidadeSugestoes(true);
    }
  };
  
  const handleEspecialidadeChange = (valor: string) => {
    setEspecialidade(valor);
    setEspecialidadeSugestoes(filtrarEspecialidades(valor));
    setMostrarEspecialidadeSugestoes(true);
  };
  
  // Handlers para seleção de sugestões
  const selecionarEstado = (estadoObj: typeof ESTADOS_BRASIL[0]) => {
    setEstado(`${estadoObj.sigla} - ${estadoObj.nome}`);
    setEstadoSelecionado(estadoObj.sigla);
    setMostrarEstadoSugestoes(false);
    setCidade('');
    setCidadeSugestoes([]);
  };
  
  const selecionarCidade = (cidadeNome: string) => {
    setCidade(cidadeNome);
    setMostrarCidadeSugestoes(false);
  };
  
  const selecionarEspecialidade = (espNome: string) => {
    setEspecialidade(espNome);
    setMostrarEspecialidadeSugestoes(false);
  };
  
  // Handler para busca
  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!estadoSelecionado || !cidade || !especialidade) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    // Verificar se a cidade pertence ao estado
    const cidadesDoEstado = CIDADES_POR_ESTADO[estadoSelecionado] || [];
    if (!cidadesDoEstado.includes(cidade)) {
      alert(`A cidade "${cidade}" não pertence ao estado selecionado. Por favor, escolha uma cidade válida.`);
      return;
    }
    
    // Redirecionar para página de resultados
    const params = new URLSearchParams({
      estado: estadoSelecionado,
      cidade: cidade,
      especialidade: especialidade
    });
    
    router.push(`/resultados?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header Azul Sólido - Conforme Referência */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            
            {/* Logo Principal - 200px largura */}
            <div className="flex-shrink-0 mb-8 lg:mb-0">
              <img 
                src="/images/fluxo_visitante/logo.png" 
                alt="Pesquise o melhor lugar para o seu carro" 
                className="h-auto"
                style={{ width: '200px' }}
              />
            </div>
            
            {/* Textos do Header - Conforme Referência */}
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

      {/* Seção Central - Duas Colunas Conforme Referência */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Coluna Esquerda - Textos */}
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
            
            {/* Coluna Direita - 3 Veículos LADO A LADO */}
            <div className="flex justify-center items-center gap-6">
              
              {/* Moto Azul - 180px largura */}
              <div className="flex-shrink-0">
                <img 
                  src="/images/fluxo_visitante/image001.jpg" 
                  alt="Moto" 
                  className="h-auto rounded-lg shadow-md"
                  style={{ width: '180px' }}
                />
              </div>
              
              {/* Carro Vermelho - 180px largura */}
              <div className="flex-shrink-0">
                <img 
                  src="/images/fluxo_visitante/image003.jpg" 
                  alt="Carro Vermelho" 
                  className="h-auto rounded-lg shadow-md"
                  style={{ width: '180px' }}
                />
              </div>
              
              {/* Carro Branco - 180px largura */}
              <div className="flex-shrink-0">
                <img 
                  src="/images/fluxo_visitante/image005.jpg" 
                  alt="Carro Branco" 
                  className="h-auto rounded-lg shadow-md"
                  style={{ width: '180px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarja Verde com Cantos Arredondados - Conforme Referência */}
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
              
              {/* Três Campos na Mesma Linha - Conforme Referência */}
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
                    onFocus={() => setMostrarEstadoSugestoes(true)}
                    onBlur={() => setTimeout(() => setMostrarEstadoSugestoes(false), 200)}
                    placeholder="Ex: RS ou Rio Grande do Sul"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    required
                  />
                  
                  {/* Sugestões de Estados */}
                  {mostrarEstadoSugestoes && estadoSugestoes.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {estadoSugestoes.map((est) => (
                        <div
                          key={est.sigla}
                          onMouseDown={() => selecionarEstado(est)}
                          className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <span className="font-semibold text-green-600">{est.sigla}</span> - {est.nome}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Campo Cidade */}
                <div className="relative">
                  <label htmlFor="cidade" className="block text-sm font-semibold text-gray-700 mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    value={cidade}
                    onChange={(e) => handleCidadeChange(e.target.value)}
                    onFocus={() => {
                      if (estadoSelecionado) {
                        setCidadeSugestoes(filtrarCidades(cidade, estadoSelecionado));
                        setMostrarCidadeSugestoes(true);
                      }
                    }}
                    onBlur={() => setTimeout(() => setMostrarCidadeSugestoes(false), 200)}
                    placeholder={estadoSelecionado ? "Digite sua cidade" : "Selecione um estado primeiro"}
                    className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      !estadoSelecionado ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    disabled={!estadoSelecionado}
                    required
                  />
                  
                  {/* Sugestões de Cidades */}
                  {mostrarCidadeSugestoes && cidadeSugestoes.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {cidadeSugestoes.map((cid) => (
                        <div
                          key={cid}
                          onMouseDown={() => selecionarCidade(cid)}
                          className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          {cid}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Campo O que Procura */}
                <div className="relative">
                  <label htmlFor="especialidade" className="block text-sm font-semibold text-gray-700 mb-2">
                    O que procura?
                  </label>
                  <input
                    type="text"
                    id="especialidade"
                    value={especialidade}
                    onChange={(e) => handleEspecialidadeChange(e.target.value)}
                    onFocus={() => setMostrarEspecialidadeSugestoes(true)}
                    onBlur={() => setTimeout(() => setMostrarEspecialidadeSugestoes(false), 200)}
                    placeholder="Ex: farol quebrado, auto elétrica"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    required
                  />
                  
                  {/* Sugestões de Especialidades */}
                  {mostrarEspecialidadeSugestoes && especialidadeSugestoes.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {especialidadeSugestoes.map((esp) => (
                        <div
                          key={esp}
                          onMouseDown={() => selecionarEspecialidade(esp)}
                          className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          {esp}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Botão Buscar Serviços - Abaixo dos Campos */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
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
