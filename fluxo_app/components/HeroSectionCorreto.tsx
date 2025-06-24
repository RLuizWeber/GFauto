// HeroSectionCorreto.tsx - Versão Corrigida com Tailwind CSS e Rodapé
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Dados simulados de estados e cidades
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
};

export default function HeroSectionCorreto() {
  const router = useRouter();
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
      const cidadesDoEstado = CIDADES_POR_ESTADO[estadoSelecionado] || [];
      cidadesEncontradas = cidadesDoEstado.filter(cidade =>
        cidade.toLowerCase().includes(termoLower)
      );
    } else {
      Object.values(CIDADES_POR_ESTADO).forEach(cidades => {
        const cidadesFiltradas = cidades.filter(cidade =>
          cidade.toLowerCase().includes(termoLower)
        );
        cidadesEncontradas.push(...cidadesFiltradas);
      });
    }

    setSugestoesCidades(cidadesEncontradas.slice(0, 10));
  };

  // Função para detectar estado automaticamente
  const detectarEstado = (valor: string) => {
    const valorLower = valor.toLowerCase();
    
    const estadoPorSigla = ESTADOS_BRASIL.find(estado =>
      estado.sigla.toLowerCase() === valorLower
    );
    
    if (estadoPorSigla) {
      return estadoPorSigla.sigla;
    }
    
    const estadoPorNome = ESTADOS_BRASIL.find(estado =>
      estado.nome.toLowerCase() === valorLower
    );
    
    if (estadoPorNome) {
      return estadoPorNome.sigla;
    }
    
    const estadoParcial = ESTADOS_BRASIL.find(estado =>
      estado.nome.toLowerCase().includes(valorLower) && valorLower.length > 2
    );
    
    if (estadoParcial) {
      return estadoParcial.sigla;
    }
    
    return '';
  };

  useEffect(() => {
    buscarEstados(estado);
  }, [estado]);

  useEffect(() => {
    buscarCidades(cidade);
  }, [cidade, estadoSelecionado]);

  const handleEstadoChange = (valor: string) => {
    setEstado(valor);
    
    const estadoDetectado = detectarEstado(valor);
    if (estadoDetectado) {
      setEstadoSelecionado(estadoDetectado);
      setSugestoesEstados([]);
      setCidade('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!estado.trim() || !cidade.trim() || !busca.trim()) {
      alert('Por favor, preencha todos os campos antes de buscar.');
      return;
    }

    const searchParams = new URLSearchParams({
      estado: estadoSelecionado || estado.trim(),
      cidade: cidade.trim(),
      especialidade: busca.trim()
    });

    router.push(`/resultados?${searchParams.toString()}`);
  };

  return (
    <>
      {/* Header com azul sólido */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-600 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <Image
                src="/fluxo_app/images/logo.png"
                alt="GFauto Logo"
                width={250}
                height={250}
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

      {/* Seção Uma Proposta Ganha-Ganha */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-4xl font-bold text-blue-600 mb-4">Uma Proposta Ganha-Ganha</h2>
              <h3 className="text-2xl font-semibold text-gray-700 mb-6">Em que todos os envolvidos ganham.</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Encontre os melhores serviços para seu veículo na sua cidade. Pesquise oficinas, autopeças, concessionárias e muito mais.
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center space-x-4">
              <Image
                src="/fluxo_app/images/image003.jpg"
                alt="Carro Vermelho"
                width={180}
                height={120}
                className="w-32 h-24 object-cover rounded-lg shadow-md"
                style={{ width: '180px' }}
              />
              <Image
                src="/fluxo_app/images/image001.jpg"
                alt="Moto Azul"
                width={180}
                height={120}
                className="w-32 h-24 object-cover rounded-lg shadow-md"
                style={{ width: '180px' }}
              />
              <Image
                src="/fluxo_app/images/image005.jpg"
                alt="SUV Prata"
                width={180}
                height={120}
                className="w-32 h-24 object-cover rounded-lg shadow-md"
                style={{ width: '180px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Verde "Começar Agora" */}
      <section className="bg-green-500 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Começar Agora</h3>
          </div>
          
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    autoComplete="off"
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                  />
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
                  <label htmlFor="cidade" className="block text-sm font-semibold text-gray-700 mb-2">
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
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                  />
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
                  <label htmlFor="busca" className="block text-sm font-semibold text-gray-700 mb-2">
                    O que procura?
                  </label>
                  <input
                    type="text"
                    id="busca"
                    value={busca}
                    onChange={handleBuscaChange}
                    placeholder="Ex: oficina, autopeças, concessionária"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    style={{ appearance: 'none', WebkitAppearance: 'none' }}
                  />
                </div>
              </div>

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
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <Image
            src="/fluxo_app/images/mc4.png"
            alt="Mascote GFauto - Manda Chuva"
            width={250}
            height={250}
            className="mx-auto"
            style={{ width: '250px', height: 'auto' }}
          />
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Sobre o GFauto</h4>
              <ul className="space-y-2">
                <li><a href="/home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="/projeto-156" className="text-gray-300 hover:text-white transition-colors">Projeto 156</a></li>
                <li><a href="/radares" className="text-gray-300 hover:text-white transition-colors">Radares</a></li>
                <li><a href="/anuncie" className="text-gray-300 hover:text-white transition-colors">Anuncie</a></li>
                <li><a href="/atualize-seus-dados" className="text-gray-300 hover:text-white transition-colors">Atualize Seus Dados</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Contato</h4>
              <ul className="space-y-2">
                <li><a href="https://wa.me/5551999999999" className="text-gray-300 hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="/fale-conosco" className="text-gray-300 hover:text-white transition-colors">Fale Conosco</a></li>
                <li><a href="/anunciar-servicos" className="text-gray-300 hover:text-white transition-colors">Anunciar Serviços</a></li>
                <li><a href="/planos-e-precos" className="text-gray-300 hover:text-white transition-colors">Planos e Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Redes Sociais</h4>
              <ul className="space-y-2">
                <li><a href="https://twitter.com/gfauto" className="text-gray-300 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="https://facebook.com/gfauto" className="text-gray-300 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="https://instagram.com/gfauto" className="text-gray-300 hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/termos-de-uso" className="text-gray-300 hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="/politica-de-privacidade" className="text-gray-300 hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="/politica-de-cookies" className="text-gray-300 hover:text-white transition-colors">Política de Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">Direitos Reservados - GFauto - 2001-2025</p>
          </div>
        </div>
      </footer>
    </>
  );
}

