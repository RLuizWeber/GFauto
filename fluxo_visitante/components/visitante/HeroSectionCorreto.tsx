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

// Base de dados de cidades por estado (principais cidades)
const CIDADES_POR_ESTADO: { [key: string]: string[] } = {
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria'],
  'SP': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André'],
  'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
  'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna'],
  'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'],
  'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma'],
  'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia'],
  'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina'],
  'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral']
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

  // Handlers para os campos
  const handleEstadoChange = (valor: string) => {
    setEstado(valor);
    buscarEstados(valor);
    
    // Limpar cidade quando estado muda
    setCidade('');
    setEstadoSelecionado('');
    setSugestoesCidade([]);
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
    setCidade(''); // Limpar cidade
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

    // Validar se cidade pertence ao estado selecionado
    if (estadoSelecionado) {
      const cidadesDoEstado = CIDADES_POR_ESTADO[estadoSelecionado] || [];
      const cidadeValida = cidadesDoEstado.some(c => 
        cidade.toLowerCase().includes(c.toLowerCase())
      );
      
      if (!cidadeValida) {
        alert(`A cidade "${cidade}" não foi encontrada no estado selecionado. Por favor, selecione uma cidade válida.`);
        return;
      }
    }

    // Redirecionar para página de resultados
    const params = new URLSearchParams({
      estado: estadoSelecionado || estado,
      cidade: cidade,
      servico: servico
    });
    
    router.push(`/resultados?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header Azul Sólido com Logo e Textos */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            
            {/* Logo Principal */}
            <div className="flex-shrink-0 mb-8 lg:mb-0">
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

      {/* Seção Central - Duas Colunas */}
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
          
          {/* Formulário de Busca */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleBuscar} className="space-y-6">
              
              {/* Três Campos na Mesma Linha */}
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
