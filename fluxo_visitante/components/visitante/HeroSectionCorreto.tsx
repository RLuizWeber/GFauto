'use client';

import React, { useState, useEffect } from 'react';

// Dados dos estados brasileiros
const ESTADOS_BRASILEIROS = [
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

// Mapeamento de cidades por estado (principais cidades)
const CIDADES_POR_ESTADO: { [key: string]: string[] } = {
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande', 'Alvorada', 'Passo Fundo', 'Sapucaia do Sul', 'Uruguaiana', 'Santa Cruz do Sul'],
  'SP': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Ribeirão Preto', 'Sorocaba', 'Santos', 'Mauá', 'São José dos Campos', 'Mogi das Cruzes', 'Diadema', 'Jundiaí', 'Carapicuíba'],
  'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'São João de Meriti', 'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda', 'Magé', 'Itaboraí', 'Mesquita', 'Nova Friburgo', 'Barra Mansa'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga', 'Sete Lagoas', 'Divinópolis', 'Santa Luzia', 'Ibirité', 'Poços de Caldas']
};

// Mapeamento inteligente de especialidades
const MAPEAMENTO_ESPECIALIDADES: { [key: string]: string } = {
  'farol': 'Auto Elétricas',
  'farol quebrado': 'Auto Elétricas',
  'luz': 'Auto Elétricas',
  'bateria': 'Auto Elétricas',
  'elétrica': 'Auto Elétricas',
  'auto elétrica': 'Auto Elétricas',
  'pneu': 'Borracharias',
  'pneu furado': 'Borracharias',
  'borracharia': 'Borracharias',
  'roda': 'Borracharias',
  'freio': 'Oficinas Mecânicas',
  'motor': 'Oficinas Mecânicas',
  'mecânica': 'Oficinas Mecânicas',
  'oficina': 'Oficinas Mecânicas',
  'óleo': 'Oficinas Mecânicas',
  'revisão': 'Oficinas Mecânicas',
  'chapa': 'Funilarias',
  'funilaria': 'Funilarias',
  'batida': 'Funilarias',
  'amassado': 'Funilarias',
  'pintura': 'Pinturas Automotivas',
  'tinta': 'Pinturas Automotivas',
  'riscos': 'Pinturas Automotivas'
};

const HeroSectionCorreto: React.FC = () => {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [estadoSugestoes, setEstadoSugestoes] = useState<typeof ESTADOS_BRASILEIROS>([]);
  const [cidadeSugestoes, setCidadeSugestoes] = useState<string[]>([]);
  const [especialidadeSugestoes, setEspecialidadeSugestoes] = useState<string[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>('');

  // Autocompletar Estado
  useEffect(() => {
    if (estado.length > 0) {
      const filtrados = ESTADOS_BRASILEIROS.filter(est => 
        est.sigla.toLowerCase().includes(estado.toLowerCase()) ||
        est.nome.toLowerCase().includes(estado.toLowerCase())
      );
      setEstadoSugestoes(filtrados);
    } else {
      setEstadoSugestoes([]);
    }
  }, [estado]);

  // Autocompletar Cidade
  useEffect(() => {
    if (cidade.length > 0 && estadoSelecionado) {
      const cidadesDoEstado = CIDADES_POR_ESTADO[estadoSelecionado] || [];
      const filtradas = cidadesDoEstado.filter(cid => 
        cid.toLowerCase().includes(cidade.toLowerCase())
      );
      setCidadeSugestoes(filtradas);
    } else {
      setCidadeSugestoes([]);
    }
  }, [cidade, estadoSelecionado]);

  // Autocompletar Especialidade
  useEffect(() => {
    if (especialidade.length > 0) {
      const especialidadesUnicas = Array.from(new Set(Object.values(MAPEAMENTO_ESPECIALIDADES)));
      const filtradas = especialidadesUnicas.filter(esp => 
        esp.toLowerCase().includes(especialidade.toLowerCase())
      );
      setEspecialidadeSugestoes(filtradas);
    } else {
      setEspecialidadeSugestoes([]);
    }
  }, [especialidade]);

  const selecionarEstado = (estadoObj: typeof ESTADOS_BRASILEIROS[0]) => {
    setEstado(`${estadoObj.sigla} - ${estadoObj.nome}`);
    setEstadoSelecionado(estadoObj.sigla);
    setEstadoSugestoes([]);
    setCidade(''); // Limpar cidade quando mudar estado
  };

  const selecionarCidade = (cidadeNome: string) => {
    setCidade(cidadeNome);
    setCidadeSugestoes([]);
  };

  const selecionarEspecialidade = (especialidadeNome: string) => {
    setEspecialidade(especialidadeNome);
    setEspecialidadeSugestoes([]);
  };

  const buscarServicos = () => {
    if (!estadoSelecionado || !cidade || !especialidade) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Mapear especialidade se necessário
    const especialidadeFinal = MAPEAMENTO_ESPECIALIDADES[especialidade.toLowerCase()] || especialidade;

    // Redirecionar para página de resultados
    const url = `/resultados?estado=${estadoSelecionado}&cidade=${encodeURIComponent(cidade)}&especialidade=${encodeURIComponent(especialidadeFinal)}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Azul - Conforme print de referência */}
      <div className="bg-blue-500 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Logo à esquerda */}
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              <img 
                src="/images/fluxo_visitante/logo.png" 
                alt="Pesquise o melhor lugar para o seu carro" 
                className="h-auto max-w-full"
                style={{ width: '200px' }}
              />
            </div>
            
            {/* Textos à direita */}
            <div className="text-center lg:text-right">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Bem Vindo!</h1>
              <p className="text-xl lg:text-2xl">
                Acesse recursos exclusivos e informações detalhadas sobre serviços automotivos em sua região.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Central - Conforme print de referência */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Coluna Esquerda - Textos */}
            <div>
              <h2 className="text-4xl font-bold text-blue-600 mb-6">Uma Proposta Ganha-Ganha</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Em que todos os envolvidos ganham.</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Encontre os melhores serviços para seu veículo na sua cidade. 
                Pesquise oficinas, autopeças, concessionárias e muito mais.
              </p>
            </div>
            
            {/* Coluna Direita - 3 Veículos LADO A LADO */}
            <div className="flex justify-center items-center gap-6">
              {/* Moto Azul */}
              <div className="flex-shrink-0">
                <img 
                  src="/images/fluxo_visitante/image001.jpg" 
                  alt="Moto" 
                  className="h-auto max-w-full rounded-lg shadow-md"
                  style={{ width: '180px' }}
                />
              </div>
              
              {/* Carro Vermelho */}
              <div className="flex-shrink-0">
                <img 
                  src="/images/fluxo_visitante/image003.jpg" 
                  alt="Carro Vermelho" 
                  className="h-auto max-w-full rounded-lg shadow-md"
                  style={{ width: '180px' }}
                />
              </div>
              
              {/* Carro Branco */}
              <div className="flex-shrink-0">
                <img 
                  src="/images/fluxo_visitante/image005.jpg" 
                  alt="Carro Branco" 
                  className="h-auto max-w-full rounded-lg shadow-md"
                  style={{ width: '180px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarja Verde com Cantos Arredondados - Conforme print de referência */}
      <div className="bg-green-500 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-green-500 rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Começar Agora</h2>
            
            {/* 3 Campos na Mesma Linha */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Campo Estado */}
              <div className="relative">
                <label className="block text-white font-semibold mb-2">Estado</label>
                <input
                  type="text"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  placeholder="Ex: RS ou Rio Grande do Sul"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                {estadoSugestoes.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                    {estadoSugestoes.map((est, index) => (
                      <div
                        key={index}
                        onClick={() => selecionarEstado(est)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      >
                        {est.sigla} - {est.nome}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Campo Cidade */}
              <div className="relative">
                <label className="block text-white font-semibold mb-2">Cidade</label>
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder={estadoSelecionado ? "Digite sua cidade" : "Selecione um estado primeiro"}
                  disabled={!estadoSelecionado}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 disabled:bg-gray-200"
                />
                {cidadeSugestoes.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                    {cidadeSugestoes.map((cid, index) => (
                      <div
                        key={index}
                        onClick={() => selecionarCidade(cid)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      >
                        {cid}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Campo O que procura */}
              <div className="relative">
                <label className="block text-white font-semibold mb-2">O que procura?</label>
                <input
                  type="text"
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  placeholder="Ex: farol quebrado, auto elétrica"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                {especialidadeSugestoes.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                    {especialidadeSugestoes.map((esp, index) => (
                      <div
                        key={index}
                        onClick={() => selecionarEspecialidade(esp)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      >
                        {esp}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Botão Buscar Serviços */}
            <div className="text-center">
              <button
                onClick={buscarServicos}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300 shadow-lg"
              >
                Buscar Serviços
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionCorreto;
