// GFauto/fluxo_app/components/HeroSectionCorreto.tsx - Versão Modificada até primeiro ajuste das margens da tarja verde..
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ADICIONADO: Import do useRouter
import Image from 'next/image';
import '../styles/HeroSection.css';

// Dados simulados de estados e cidades = \GFauto\fluxo_app\components
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
  'PE': [
    'Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina',
    'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão'
  ],
  'CE': [
    'Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral',
    'Crato', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá'
  ],
  'SC': [
    'Joinville', 'Florianópolis', 'Blumenau', 'São José', 'Criciúma',
    'Chapecó', 'Itajaí', 'Lages', 'Jaraguá do Sul', 'Palhoça'
  ],
  'GO': [
    'Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia',
    'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Novo Gama'
  ]
  // Adicione mais estados e cidades conforme necessário
};

export default function HeroSectionCorreto() {
  const router = useRouter(); // ADICIONADO: Inicialização do router
  const [estado, setEstado] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidade, setCidade] = useState('');
  const [busca, setBusca] = useState('');
  const [sugestoesEstados, setSugestoesEstados] = useState<string[]>([]);
  const [sugestoesCidades, setSugestoesCidades] = useState<string[]>([]);

  // Função para buscar estados por sigla ou nome
  const buscarEstados = (termo: string) => {
    if (!termo || termo.length < 1) {
      setSugestoesEstados([]);
      return;
    }

    const termoLower = termo.toLowerCase();
    const estadosEncontrados = ESTADOS_BRASIL.filter(estado =>
      estado.sigla.toLowerCase().includes(termoLower) ||
      estado.nome.toLowerCase().includes(termoLower)
    );

    setSugestoesEstados(estadosEncontrados.map(e => e.sigla));
  };

  // Função para buscar cidades
  const buscarCidades = (termo: string) => {
    if (!termo || termo.length < 2) {
      setSugestoesCidades([]);
      return;
    }

    const termoLower = termo.toLowerCase();
    let cidadesEncontradas: string[] = [];

    if (estadoSelecionado) {
      // Agora permitimos buscar cidades mesmo sem estado selecionado
      // Se um estado foi selecionado, filtramos apenas as cidades desse estado
      const cidadesDoEstado = CIDADES_POR_ESTADO[estadoSelecionado] || [];
      cidadesEncontradas = cidadesDoEstado.filter(cidade =>
        cidade.toLowerCase().includes(termoLower)
      );
    } else {
      // Se nenhum estado foi selecionado, buscamos em todas as cidades
      Object.values(CIDADES_POR_ESTADO).forEach(cidades => {
        const cidadesFiltradas = cidades.filter(cidade =>
          cidade.toLowerCase().includes(termoLower)
        );
        cidadesEncontradas.push(...cidadesFiltradas);
      });
    }

    setSugestoesCidades(cidadesEncontradas.slice(0, 10)); // Limitar a 10 sugestões
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

  // Filtrar estados com base na entrada do usuário
  useEffect(() => {
    buscarEstados(estado);
  }, [estado]);

  // Filtrar cidades com base no estado selecionado e entrada do usuário
  useEffect(() => {
    buscarCidades(cidade);
  }, [cidade, estadoSelecionado]);

  // Handler para mudança de estado com detecção automática
  const handleEstadoChange = (valor: string) => {
    setEstado(valor);
    
    // Detectar estado automaticamente
    const estadoDetectado = detectarEstado(valor);
    if (estadoDetectado) {
      setEstadoSelecionado(estadoDetectado);
      setSugestoesEstados([]);
      setCidade(''); // Limpar cidade quando estado muda
    } else {
      setEstadoSelecionado('');
      setCidade('');
    }
  };

  const handleEstadoSelect = (value: string) => {
    setEstado(value);
    setEstadoSelecionado(value);
    setSugestoesEstados([]);
  };

  const handleCidadeChange = (value: string) => {
    setCidade(value);
  };

  const handleCidadeSelect = (value: string) => {
    setCidade(value);
    setSugestoesCidades([]);
  };

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
  };

  // MODIFICADO: Função handleSubmit com redirecionamento
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica dos campos
    if (!estado.trim() || !cidade.trim() || !busca.trim()) {
      alert('Por favor, preencha todos os campos antes de buscar.');
      return;
    }

    // Construir a URL de redirecionamento com os parâmetros de busca
    const searchParams = new URLSearchParams({
      estado: estadoSelecionado || estado.trim(),
      cidade: cidade.trim(),
      especialidade: busca.trim()
    });

    // Redirecionar para a página de resultados
    router.push(`/resultados?${searchParams.toString()}`);
  };

  return (
    <>
      {/* Header com azul sólido e cantos arredondados */}
      <section className="hero-header">
        <div className="container mx-auto px-4">
          <div className="header-content">
            <Image
              src="/fluxo_app/images/logo.png"
              alt="GFauto Logo"
              width={180}
              height={180}
	// alterado de className="logo-image" para a linha abaixo		  
              className="logo-image ml-5"
            />
            <div className="header-text">
              <h1 className="hero-title">Bem Vindo!</h1>
              <p className="hero-subtitle">
                Acesse recursos exclusivos e informações detalhadas sobre serviços automotivos em sua região.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Uma Proposta Ganha-Ganha */}
      <section className="ganha-ganha-section">
        <div className="container mx-auto px-4">
          <div className="ganha-ganha-content">
            <div className="ganha-ganha-text">
              <h2 className="section-title">Uma Proposta Ganha-Ganha</h2>
              <h3 className="section-subtitle">Em que todos os envolvidos ganham.</h3>
              <p className="section-description">
                Encontre os melhores serviços para seu veículo na sua cidade. Pesquise oficinas, autopeças, concessionárias e muito mais.
              </p>
            </div>
            <div className="vehicles-grid">
              <Image
                src="/fluxo_app/images/image003.jpg"
                alt="Carro Vermelho"
                width={180}
                className="vehicle-image"
              />
              <Image
                src="/fluxo_app/images/image001.jpg"
                alt="Carro Vermelho"
                width={180}
                className="vehicle-image"
              />
              <Image
                src="/fluxo_app/images/image005.jpg"
                alt="SUV Prata"
                width={180}
                className="vehicle-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Verde "Começar Agora" */}
      <section className="comecar-agora-section">
        <div className="max-w-7xl mx-auto px-4">
          {/* Título da Seção */}
          <div className="text-center mb-2">
            <h3 className="comecar-agora-title">
              Começar Agora
            </h3>
          </div>
          
          {/* Formulário de Busca com Cantos Arredondados */}
          <div className="busca-form-container">
            <form onSubmit={handleSubmit} className="busca-form">
              
              {/* Três Campos na Mesma Linha */}
              <div className="form-grid">
                
                {/* Campo Estado */}
                <div className="relative">
                  <label htmlFor="estado" className="form-label">
                    Estado
                  </label>
                  <input
                    type="text"
                    id="estado"
                    value={estado}
                    onChange={(e) => handleEstadoChange(e.target.value)}
                    placeholder="Ex: RS ou Rio Grande do Sul"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    autoComplete="off"
                  />
                  {/* Sugestões de Estados */}
                  {sugestoesEstados.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                      {sugestoesEstados.map((sugestao, index) => (
                        <li
                          key={index}
                          onClick={() => handleEstadoSelect(sugestao)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          {sugestao}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Campo Cidade */}
                <div className="relative">
                  <label htmlFor="cidade" className="form-label">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    value={cidade}
                    onChange={(e) => handleCidadeChange(e.target.value)}
                    placeholder="Digite o nome da cidade"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    autoComplete="off"
                  />
                  {/* Sugestões de Cidades */}
                  {sugestoesCidades.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                      {sugestoesCidades.map((sugestao, index) => (
                        <li
                          key={index}
                          onClick={() => handleCidadeSelect(sugestao)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          {sugestao}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Campo O que procura */}
                <div className="relative">
                  <label htmlFor="busca" className="form-label">
                    O que procura?
                  </label>
                  <input
                    type="text"
                    id="busca"
                    value={busca}
                    onChange={handleBuscaChange}
                    placeholder="Ex: oficina, autopeças, concessionária"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Botão de Busca */}
              <div className="text-center">
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Buscar Serviços
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Mascote */}
      <section className="mascot-section">
        <div className="container mx-auto px-4 text-center">
          <Image
            src="/fluxo_app/images/mc4.png"
            alt="Mascote GFauto - Manda Chuva"
            width={250}
            height={250}
            className="mascot-image mx-auto"
          />
        </div>
      </section>
    </>
  );
}