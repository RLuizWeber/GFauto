// HeroSectionCorreto.tsx - Versão Definitiva com Tailwind CSS
// Localização: GFauto/fluxo_app/components/HeroSectionCorreto.tsx
// VERSÃO FINAL: Sem rodapé (componente global), com Tailwind CSS exclusivamente

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Dados simulados de estados e cidades = \GFauto\fluxo_app\components
const estadosCidades = {
  'AC': { nome: 'Acre', cidades: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'] },
  'AL': { nome: 'Alagoas', cidades: ['Maceió', 'Arapiraca', 'Palmeira dos Índios'] },
  'AP': { nome: 'Amapá', cidades: ['Macapá', 'Santana', 'Laranjal do Jari'] },
  'AM': { nome: 'Amazonas', cidades: ['Manaus', 'Parintins', 'Itacoatiara'] },
  'BA': { nome: 'Bahia', cidades: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro', 'Ilhéus'] },
  'CE': { nome: 'Ceará', cidades: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral'] },
  'DF': { nome: 'Distrito Federal', cidades: ['Brasília', 'Taguatinga', 'Ceilândia'] },
  'ES': { nome: 'Espírito Santo', cidades: ['Vitória', 'Vila Velha', 'Cariacica', 'Serra'] },
  'GO': { nome: 'Goiás', cidades: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde'] },
  'MA': { nome: 'Maranhão', cidades: ['São Luís', 'Imperatriz', 'Timon', 'Caxias'] },
  'MT': { nome: 'Mato Grosso', cidades: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop'] },
  'MS': { nome: 'Mato Grosso do Sul', cidades: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá'] },
  'MG': { nome: 'Minas Gerais', cidades: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros'] },
  'PA': { nome: 'Pará', cidades: ['Belém', 'Ananindeua', 'Santarém', 'Marabá'] },
  'PB': { nome: 'Paraíba', cidades: ['João Pessoa', 'Campina Grande', 'Santa Rita'] },
  'PR': { nome: 'Paraná', cidades: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais'] },
  'PE': { nome: 'Pernambuco', cidades: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina'] },
  'PI': { nome: 'Piauí', cidades: ['Teresina', 'Parnaíba', 'Picos', 'Piripiri'] },
  'RJ': { nome: 'Rio de Janeiro', cidades: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Campos dos Goytacazes'] },
  'RN': { nome: 'Rio Grande do Norte', cidades: ['Natal', 'Mossoró', 'Parnamirim'] },
  'RS': { nome: 'Rio Grande do Sul', cidades: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Passo Fundo'] },
  'RO': { nome: 'Rondônia', cidades: ['Porto Velho', 'Ji-Paraná', 'Ariquemes'] },
  'RR': { nome: 'Roraima', cidades: ['Boa Vista', 'Rorainópolis', 'Caracaraí'] },
  'SC': { nome: 'Santa Catarina', cidades: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó'] },
  'SP': { nome: 'São Paulo', cidades: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Sorocaba', 'Ribeirão Preto'] },
  'SE': { nome: 'Sergipe', cidades: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto'] },
  'TO': { nome: 'Tocantins', cidades: ['Palmas', 'Araguaína', 'Gurupi'] }
};
// Adicione mais estados e cidades conforme necessário

const HeroSectionCorreto: React.FC = () => {
  // ADICIONADO: Inicialização do router
  const router = useRouter();
  
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [oqueProcura, setOqueProcura] = useState('');
  const [sugestoesEstado, setSugestoesEstado] = useState<string[]>([]);
  const [sugestoesCidade, setSugestoesCidade] = useState<string[]>([]);
  const [mostrarSugestoesEstado, setMostrarSugestoesEstado] = useState(false);
  const [mostrarSugestoesCidade, setMostrarSugestoesCidade] = useState(false);

  // Função para buscar estados
  const buscarEstados = (termo: string) => {
    if (!termo) return [];
    
    const termoLower = termo.toLowerCase();
    return Object.entries(estadosCidades)
      .filter(([sigla, dados]) => 
        sigla.toLowerCase().includes(termoLower) || 
        dados.nome.toLowerCase().includes(termoLower)
      )
      .map(([sigla, dados]) => `${sigla} - ${dados.nome}`)
      .slice(0, 5);
  };

  // Função para buscar cidades
  const buscarCidades = (termo: string) => {
    if (!termo) return [];
    
    const termoLower = termo.toLowerCase();
    let cidadesEncontradas: string[] = [];

    // Agora permitimos buscar cidades mesmo sem estado selecionado
    if (estado) {
      // Se um estado foi selecionado, filtramos apenas as cidades desse estado
      const siglaEstado = estado.split(' - ')[0];
      const dadosEstado = estadosCidades[siglaEstado as keyof typeof estadosCidades];
      if (dadosEstado) {
        cidadesEncontradas = dadosEstado.cidades
          .filter(cidade => cidade.toLowerCase().includes(termoLower))
          .slice(0, 5);
      }
    } else {
      // Se nenhum estado foi selecionado, buscamos em todas as cidades
      Object.entries(estadosCidades).forEach(([sigla, dados]) => {
        const cidadesDoEstado = dados.cidades
          .filter(cidade => cidade.toLowerCase().includes(termoLower))
          .map(cidade => `${cidade} - ${sigla}`);
        cidadesEncontradas.push(...cidadesDoEstado);
      });
      cidadesEncontradas = cidadesEncontradas.slice(0, 5);
    }

    return cidadesEncontradas;
  };

  // Handlers para os campos
  const handleEstadoChange = (valor: string) => {
    setEstado(valor);
    if (valor) {
      const sugestoes = buscarEstados(valor);
      setSugestoesEstado(sugestoes);
      setMostrarSugestoesEstado(sugestoes.length > 0);
    } else {
      setSugestoesEstado([]);
      setMostrarSugestoesEstado(false);
    }
  };

  const handleCidadeChange = (valor: string) => {
    setCidade(valor);
    if (valor) {
      const sugestoes = buscarCidades(valor);
      setSugestoesCidade(sugestoes);
      setMostrarSugestoesCidade(sugestoes.length > 0);
    } else {
      setSugestoesCidade([]);
      setMostrarSugestoesCidade(false);
    }
  };

  const selecionarEstado = (estadoSelecionado: string) => {
    setEstado(estadoSelecionado);
    setMostrarSugestoesEstado(false);
    setSugestoesEstado([]);
  };

  const selecionarCidade = (cidadeSelecionada: string) => {
    setCidade(cidadeSelecionada);
    setMostrarSugestoesCidade(false);
    setSugestoesCidade([]);
  };

  // MODIFICADO: Função handleSubmit com redirecionamento
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica dos campos
    if (!estado && !cidade && !oqueProcura) {
      alert('Por favor, preencha pelo menos um campo para realizar a busca.');
      return;
    }

    // Construir a URL de redirecionamento com os parâmetros de busca
    const params = new URLSearchParams();
    
    if (estado) {
      const estadoLimpo = estado.includes(' - ') ? estado.split(' - ')[0] : estado;
      params.append('estado', estadoLimpo);
    }
    
    if (cidade) {
      const cidadeLimpa = cidade.includes(' - ') ? cidade.split(' - ')[0] : cidade;
      params.append('cidade', cidadeLimpa);
    }
    
    if (oqueProcura) {
      params.append('busca', oqueProcura);
    }

    // Redirecionar para a página de resultados
    router.push(`/resultados?${params.toString()}`);
  };

  // Fechar sugestões quando clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setMostrarSugestoesEstado(false);
      setMostrarSugestoesCidade(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Logo e Boas-vindas */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-600 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <img 
                src="/fluxo_app/images/logo.png" 
                alt="GFauto Logo" 
                className="w-64 h-auto"
                style={{ width: '250px' }}
              />
            </div>
            <div className="text-center md:text-right">
              <h1 className="text-4xl font-bold text-white mb-4">Bem Vindo!</h1>
              <p className="text-xl text-white font-semibold">
                Acesse recursos exclusivos e informações detalhadas sobre serviços automotivos em sua região.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção da Proposta Ganha-Ganha */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-4xl font-bold text-blue-600 mb-4">Uma Proposta Ganha-Ganha</h2>
              <h3 className="text-2xl font-semibold text-gray-700 mb-6">Em que todos os envolvidos ganham.</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Encontre os melhores serviços para seu veículo na sua cidade. 
                Pesquise oficinas, autopeças, concessionárias e muito mais.
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center space-x-4">
              <img src="/fluxo_app/images/image001.jpg" alt="Moto Azul" className="w-32 h-24 object-cover rounded-lg shadow-md" />
              <img src="/fluxo_app/images/image003.jpg" alt="Carro Vermelho" className="w-32 h-24 object-cover rounded-lg shadow-md" />
              <img src="/fluxo_app/images/image005.jpg" alt="SUV Branca" className="w-32 h-24 object-cover rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Começar Agora com Faixa Verde */}
      <section className="bg-green-500 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Começar Agora</h3>
            <p className="text-xl text-white font-semibold">Uma Proposta Ganha-Ganha</p>
            <p className="text-lg text-white">Em que todos os envolvidos ganham.</p>
          </div>
          
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Campo Estado */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <input
                    type="text"
                    id="estado"
                    value={estado}
                    onChange={(e) => handleEstadoChange(e.target.value)}
                    placeholder="Ex: RS ou Rio Grande do Sul"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    autoComplete="off"
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                  />
                  {mostrarSugestoesEstado && sugestoesEstado.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {sugestoesEstado.map((sugestao, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => selecionarEstado(sugestao)}
                        >
                          {sugestao}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Campo Cidade */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    value={cidade}
                    onChange={(e) => handleCidadeChange(e.target.value)}
                    placeholder="Digite o nome da cidade"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    autoComplete="off"
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                  />
                  {mostrarSugestoesCidade && sugestoesCidade.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {sugestoesCidade.map((sugestao, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => selecionarCidade(sugestao)}
                        >
                          {sugestao}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Campo O que procura */}
                <div>
                  <label htmlFor="oqueProcura" className="block text-sm font-medium text-gray-700 mb-2">O que procura?</label>
                  <input
                    type="text"
                    id="oqueProcura"
                    value={oqueProcura}
                    onChange={(e) => setOqueProcura(e.target.value)}
                    placeholder="Ex: oficina, autopeças, concessionária"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    autoComplete="off"
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                  />
                </div>
              </div>

              {/* Botão de busca */}
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

      {/* Seção do Mascote */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <img 
            src="/fluxo_app/images/mc4.png" 
            alt="Mascote GFauto" 
            className="mx-auto"
            style={{ width: '250px', height: 'auto' }}
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSectionCorreto;