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
  'mecanica': 'Oficinas Mecânicas'
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
  
  // Estado selecionado (sigla) - CORRIGIDO
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
  
  // Handlers para seleção de sugestões - CORRIGIDO
  const selecionarEstado = (estadoObj: typeof ESTADOS_BRASIL[0]) => {
    setEstado(`${estadoObj.sigla} - ${estadoObj.nome}`);
    setEstadoSelecionado(estadoObj.sigla); // IMPORTANTE: Define o estado selecionado
    setMostrarEstadoSugestoes(false);
    setCidade(''); // Limpar cidade
    setCidadeSugestoes([]); // Limpar sugestões de cidade
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
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        
        {/* Logo GFauto - PRIMEIRO */}
        <div className="text-center mb-8">
          <img 
            src="/images/fluxo_visitante/logo_gf.png" 
            alt="GFauto Logo" 
            className="mx-auto h-auto"
            style={{ width: '180px' }}
          />
        </div>
        
        {/* Manda Chuva - SEGUNDO */}
        <div className="text-center mb-8">
          <img 
            src="/images/fluxo_visitante/mc4.png" 
            alt="Manda Chuva" 
            className="mx-auto h-auto"
            style={{ width: '180px' }}
          />
        </div>
        
        {/* Título e Descrição */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Encontre serviços automotivos na sua cidade
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A plataforma que conecta você aos melhores profissionais automotivos
          </p>
        </div>

        {/* Formulário de Busca - TERCEIRO */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleBuscar} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Campo Estado */}
              <div className="relative">
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                  Informe o Estado:
                </label>
                <input
                  type="text"
                  id="estado"
                  value={estado}
                  onChange={(e) => handleEstadoChange(e.target.value)}
                  onFocus={() => setMostrarEstadoSugestoes(true)}
                  onBlur={() => setTimeout(() => setMostrarEstadoSugestoes(false), 200)}
                  placeholder="Ex: RS ou Rio Grande do Sul"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                
                {/* Sugestões de Estados */}
                {mostrarEstadoSugestoes && estadoSugestoes.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {estadoSugestoes.map((est) => (
                      <div
                        key={est.sigla}
                        onClick={() => selecionarEstado(est)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium">{est.sigla}</span> - {est.nome}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Campo Cidade - CORRIGIDO */}
              <div className="relative">
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                  Informe a Cidade:
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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !estadoSelecionado ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  disabled={!estadoSelecionado}
                  required
                />
                
                {/* Sugestões de Cidades */}
                {mostrarCidadeSugestoes && cidadeSugestoes.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {cidadeSugestoes.map((cid) => (
                      <div
                        key={cid}
                        onClick={() => selecionarCidade(cid)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {cid}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Campo O que Procura */}
              <div className="relative">
                <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                
                {/* Sugestões de Especialidades */}
                {mostrarEspecialidadeSugestoes && especialidadeSugestoes.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {especialidadeSugestoes.map((esp) => (
                      <div
                        key={esp}
                        onClick={() => selecionarEspecialidade(esp)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {esp}
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
              >
                Buscar Serviços
              </button>
            </div>
          </form>
        </div>

        {/* Moto - QUARTO */}
        <div className="text-center mt-12">
          <img 
            src="/images/fluxo_visitante/image001.jpg" 
            alt="Moto" 
            className="mx-auto h-auto rounded-lg shadow-lg"
            style={{ width: '180px' }}
          />
        </div>
      </div>
    </section>
  );
}
