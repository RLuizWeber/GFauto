// HeroSectionCorreto.tsx - Versão Atualizada SEM Rodapé
// Localização: GFauto/fluxo_app/components/HeroSectionCorreto.tsx
// O rodapé agora é um componente global em components/global/Footer.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './HeroSection.css';

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
    <div className="hero-container">
      {/* Header com Logo e Boas-vindas */}
      <section className="header-top">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <img 
                src="/fluxo_app/images/logo.png" 
                alt="GFauto Logo" 
                className="logo"
              />
            </div>
            <div className="welcome-section">
              <h1 className="welcome-title">Bem Vindo!</h1>
              <p className="welcome-subtitle">
                Acesse recursos exclusivos e informações detalhadas sobre serviços automotivos em sua região.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção da Proposta Ganha-Ganha */}
      <section className="proposta-section">
        <div className="container">
          <div className="proposta-content">
            <div className="proposta-text">
              <h2 className="proposta-title">Uma Proposta Ganha-Ganha</h2>
              <h3 className="proposta-subtitle">Em que todos os envolvidos ganham.</h3>
              <p className="proposta-description">
                Encontre os melhores serviços para seu veículo na sua cidade. 
                Pesquise oficinas, autopeças, concessionárias e muito mais.
              </p>
            </div>
            <div className="proposta-images">
              <img src="/fluxo_app/images/image001.jpg" alt="Moto Azul" className="vehicle-image" />
              <img src="/fluxo_app/images/image003.jpg" alt="Carro Vermelho" className="vehicle-image" />
              <img src="/fluxo_app/images/image005.jpg" alt="SUV Branca" className="vehicle-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Começar Agora com Faixa Verde */}
      <section className="search-section">
        <div className="container">
          <div className="text-center mb-8">
            <h3 className="search-title">Começar Agora</h3>
          </div>
          
          <div className="search-form">
            <form onSubmit={handleSubmit} className="busca-form">
              <div className="form-grid">
                {/* Campo Estado */}
                <div className="form-group" onClick={(e) => e.stopPropagation()}>
                  <label htmlFor="estado" className="form-label">Estado</label>
                  <input
                    type="text"
                    id="estado"
                    value={estado}
                    onChange={(e) => handleEstadoChange(e.target.value)}
                    placeholder="Ex: RS ou Rio Grande do Sul"
                    className="form-input"
                    autoComplete="off"
                  />
                  {mostrarSugestoesEstado && sugestoesEstado.length > 0 && (
                    <div className="sugestoes">
                      {sugestoesEstado.map((sugestao, index) => (
                        <div
                          key={index}
                          className="sugestao-item"
                          onClick={() => selecionarEstado(sugestao)}
                        >
                          {sugestao}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Campo Cidade */}
                <div className="form-group" onClick={(e) => e.stopPropagation()}>
                  <label htmlFor="cidade" className="form-label">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    value={cidade}
                    onChange={(e) => handleCidadeChange(e.target.value)}
                    placeholder="Digite o nome da cidade"
                    className="form-input"
                    autoComplete="off"
                  />
                  {mostrarSugestoesCidade && sugestoesCidade.length > 0 && (
                    <div className="sugestoes">
                      {sugestoesCidade.map((sugestao, index) => (
                        <div
                          key={index}
                          className="sugestao-item"
                          onClick={() => selecionarCidade(sugestao)}
                        >
                          {sugestao}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Campo O que procura */}
                <div className="form-group">
                  <label htmlFor="oqueProcura" className="form-label">O que procura?</label>
                  <input
                    type="text"
                    id="oqueProcura"
                    value={oqueProcura}
                    onChange={(e) => setOqueProcura(e.target.value)}
                    placeholder="Ex: oficina, autopeças, concessionária"
                    className="form-input"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Botão de busca */}
              <div className="button-container">
                <button type="submit" className="search-button">
                  Buscar Serviços
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Seção do Mascote */}
      <section className="mascote-section">
        <div className="container">
          <div className="mascote-container">
            <img 
              src="/fluxo_app/images/mc4.png" 
              alt="Mascote GFauto" 
              className="mascote-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSectionCorreto;