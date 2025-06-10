'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSectionCorreto() {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [estadoSugestoes, setEstadoSugestoes] = useState<string[]>([]);
  const [cidadeSugestoes, setCidadeSugestoes] = useState<string[]>([]);
  const [especialidadeSugestoes, setEspecialidadeSugestoes] = useState<string[]>([]);
  const [cidadeHabilitada, setCidadeHabilitada] = useState(false);
  const router = useRouter();

  // Estados brasileiros
  const estados = [
    'AC - Acre', 'AL - Alagoas', 'AP - Amapá', 'AM - Amazonas', 'BA - Bahia',
    'CE - Ceará', 'DF - Distrito Federal', 'ES - Espírito Santo', 'GO - Goiás',
    'MA - Maranhão', 'MT - Mato Grosso', 'MS - Mato Grosso do Sul', 'MG - Minas Gerais',
    'PA - Pará', 'PB - Paraíba', 'PR - Paraná', 'PE - Pernambuco', 'PI - Piauí',
    'RJ - Rio de Janeiro', 'RN - Rio Grande do Norte', 'RS - Rio Grande do Sul',
    'RO - Rondônia', 'RR - Roraima', 'SC - Santa Catarina', 'SP - São Paulo',
    'SE - Sergipe', 'TO - Tocantins'
  ];

  // Cidades do RS (exemplo)
  const cidadesRS = [
    'Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria',
    'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande'
  ];

  // Especialidades
  const especialidades = [
    'Auto Elétricas', 'Mecânicas', 'Funilarias', 'Concessionárias',
    'Autopeças', 'Pneus e Rodas', 'Vidros Automotivos', 'Som e Acessórios',
    'Seguros', 'Despachantes'
  ];

  // Mapeamento inteligente
  const mapeamento = {
    'farol quebrado': 'Auto Elétricas',
    'auto elétrica': 'Auto Elétricas',
    'elétrica': 'Auto Elétricas',
    'motor': 'Mecânicas',
    'freio': 'Mecânicas',
    'batida': 'Funilarias',
    'amassado': 'Funilarias'
  };

  // Autocompletar Estado
  const handleEstadoChange = (value: string) => {
    setEstado(value);
    if (value.length > 0) {
      const filtrados = estados.filter(est => 
        est.toLowerCase().includes(value.toLowerCase())
      );
      setEstadoSugestoes(filtrados);
    } else {
      setEstadoSugestoes([]);
      setCidadeHabilitada(false);
      setCidade('');
    }
  };

  // Selecionar Estado
  const selecionarEstado = (estadoSelecionado: string) => {
    setEstado(estadoSelecionado);
    setEstadoSugestoes([]);
    setCidadeHabilitada(true);
    setCidade('');
  };

  // Autocompletar Cidade
  const handleCidadeChange = (value: string) => {
    if (!cidadeHabilitada) return;
    setCidade(value);
    if (value.length > 0) {
      const filtradas = cidadesRS.filter(cid => 
        cid.toLowerCase().includes(value.toLowerCase())
      );
      setCidadeSugestoes(filtradas);
    } else {
      setCidadeSugestoes([]);
    }
  };

  // Selecionar Cidade
  const selecionarCidade = (cidadeSelecionada: string) => {
    setCidade(cidadeSelecionada);
    setCidadeSugestoes([]);
  };

  // Autocompletar Especialidade
  const handleEspecialidadeChange = (value: string) => {
    setEspecialidade(value);
    
    // Verificar mapeamento inteligente
    const mapeado = mapeamento[value.toLowerCase()];
    if (mapeado) {
      setEspecialidadeSugestoes([mapeado]);
    } else if (value.length > 0) {
      const filtradas = especialidades.filter(esp => 
        esp.toLowerCase().includes(value.toLowerCase())
      );
      setEspecialidadeSugestoes(filtradas);
    } else {
      setEspecialidadeSugestoes([]);
    }
  };

  // Selecionar Especialidade
  const selecionarEspecialidade = (especialidadeSelecionada: string) => {
    setEspecialidade(especialidadeSelecionada);
    setEspecialidadeSugestoes([]);
  };

  // Buscar Serviços
  const buscarServicos = () => {
    if (!estado || !cidade || !especialidade) {
      alert('Por favor preencha todos os campos');
      return;
    }
    
    const params = new URLSearchParams({
      estado: estado,
      cidade: cidade,
      especialidade: especialidade
    });
    
    router.push(`/resultados?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER AZUL - Conforme novo modelo */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Logo à esquerda - 200px altura proporcional */}
            <div className="mb-6 lg:mb-0">
              <img 
                src="/images/fluxo_visitante/logo.png" 
                alt="Pesquise o melhor lugar para o seu carro" 
                className="h-48 w-auto object-contain"
              />
            </div>
            
            {/* Textos à direita - Conforme especificado */}
            <div className="text-center lg:text-right lg:ml-8">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Bem Vindo!</h1>
              <p className="text-lg lg:text-xl leading-relaxed max-w-2xl">
                Acesse recursos exclusivos e informações detalhadas sobre serviços automotivos em sua região.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO CENTRAL - Duas Colunas conforme especificado */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Coluna Esquerda - Textos conforme AjustesSolicitados.txt */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-6">
                Uma Proposta Ganha-Ganha
              </h2>
              <h3 className="text-2xl lg:text-3xl text-blue-500 mb-8">
                Em que todos os envolvidos ganham.
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Encontre os melhores serviços para seu veículo na sua cidade. Pesquise oficinas, autopeças, concessionárias e muito mais.
              </p>
            </div>

            {/* Coluna Direita - 3 Veículos (150px cada) */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
              <div className="text-center">
                <img 
                  src="/images/fluxo_visitante/image001.jpg" 
                  alt="Moto azul" 
                  className="h-32 w-auto object-contain mx-auto mb-2"
                />
              </div>
              <div className="text-center">
                <img 
                  src="/images/fluxo_visitante/image003.jpg" 
                  alt="Carro vermelho" 
                  className="h-32 w-auto object-contain mx-auto mb-2"
                />
              </div>
              <div className="text-center">
                <img 
                  src="/images/fluxo_visitante/image005.jpg" 
                  alt="Carro branco" 
                  className="h-32 w-auto object-contain mx-auto mb-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TARJA VERDE - Cantos arredondados conforme especificado */}
      <div className="bg-green-500 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-green-600 mb-8">
              Começar Agora
            </h3>
            
            {/* 3 Campos na mesma linha - SEM dropdown conforme solicitado */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Campo Estado */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado
                </label>
                <input
                  type="text"
                  value={estado}
                  onChange={(e) => handleEstadoChange(e.target.value)}
                  placeholder="Ex: RS ou Rio Grande do Sul"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                />
                {estadoSugestoes.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {estadoSugestoes.map((sugestao, index) => (
                      <div
                        key={index}
                        onClick={() => selecionarEstado(sugestao)}
                        className="px-4 py-2 hover:bg-green-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {sugestao}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Campo Cidade */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => handleCidadeChange(e.target.value)}
                  placeholder={cidadeHabilitada ? "Digite sua cidade" : "Selecione um estado primeiro"}
                  disabled={!cidadeHabilitada}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    cidadeHabilitada 
                      ? 'border-gray-300 focus:border-green-500 bg-white' 
                      : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                  }`}
                />
                {cidadeSugestoes.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {cidadeSugestoes.map((sugestao, index) => (
                      <div
                        key={index}
                        onClick={() => selecionarCidade(sugestao)}
                        className="px-4 py-2 hover:bg-green-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {sugestao}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Campo O que procura */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  O que procura?
                </label>
                <input
                  type="text"
                  value={especialidade}
                  onChange={(e) => handleEspecialidadeChange(e.target.value)}
                  placeholder="Ex: farol quebrado, auto elétrica"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                />
                {especialidadeSugestoes.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {especialidadeSugestoes.map((sugestao, index) => (
                      <div
                        key={index}
                        onClick={() => selecionarEspecialidade(sugestao)}
                        className="px-4 py-2 hover:bg-green-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {sugestao}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Botão Buscar Serviços - Abaixo dos campos */}
            <div className="text-center">
              <button
                onClick={buscarServicos}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Buscar Serviços
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
