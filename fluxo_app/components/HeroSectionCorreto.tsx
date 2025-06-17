// // Caminho ajustado: fluxo_app\components

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import '../styles/HeroSection.css';

// Dados simulados de estados e cidades :
const ESTADOS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const CIDADES_POR_ESTADO: { [key: string]: string[] } = {
  'SP': ['São Paulo', 'Campinas', 'Guarulhos', 'Santos', 'São Bernardo do Campo'],
  'RJ': ['Rio de Janeiro', 'Niterói', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
  // Adicione mais estados e cidades conforme necessário
};

export default function HeroSectionCorreto() {
  const [estado, setEstado] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidade, setCidade] = useState('');
  const [busca, setBusca] = useState('');
  const [sugestoesEstados, setSugestoesEstados] = useState<string[]>([]);
  const [sugestoesCidades, setSugestoesCidades] = useState<string[]>([]);

  // Filtrar estados com base na entrada do usuário
  useEffect(() => {
    if (estado.trim() === '') {
      setSugestoesEstados([]);
      return;
    }

    const estadosFiltrados = ESTADOS.filter(e => 
      e.toLowerCase().includes(estado.toLowerCase())
    );
    setSugestoesEstados(estadosFiltrados);
  }, [estado]);

  // Filtrar cidades com base no estado selecionado e entrada do usuário
  useEffect(() => {
    if (cidade.trim() === '') {
      setSugestoesCidades([]);
      return;
    }

    // Agora permitimos buscar cidades mesmo sem estado selecionado
    if (estadoSelecionado) {
      // Se um estado foi selecionado, filtramos apenas as cidades desse estado
      const cidadesDoEstado = CIDADES_POR_ESTADO[estadoSelecionado] || [];
      const cidadesFiltradas = cidadesDoEstado.filter(c => 
        c.toLowerCase().includes(cidade.toLowerCase())
      );
      setSugestoesCidades(cidadesFiltradas);
    } else {
      // Se nenhum estado foi selecionado, buscamos em todas as cidades
      const todasCidades: string[] = [];
      Object.values(CIDADES_POR_ESTADO).forEach(cidades => {
        todasCidades.push(...cidades);
      });
      
      const cidadesFiltradas = todasCidades.filter(c => 
        c.toLowerCase().includes(cidade.toLowerCase())
      );
      setSugestoesCidades(cidadesFiltradas);
    }
  }, [cidade, estadoSelecionado]);

  const handleEstadoChange = (value: string) => {
    setEstado(value);
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
    alert(`Buscando por ${busca} em ${cidade}, ${estadoSelecionado}`);
    // Aqui você pode redirecionar para a página de resultados
  }

  return (
    <>
      {/* Header com azul sólido e cantos arredondados */}
      <section className="hero-header mx-auto max-w-screen-lg mb-8">
        <div className="container mx-auto px-4">
              <Image 
                src="/fluxo_app/images/logo.png" 
                width={180} alt="GFauto Logo" 
                 
                className="h-auto"
            />
       
            <div className="text-center md:text-right">
              <h1 className="text-3xl font-bold mb-2">Bem Vindo!</h1>
              <p className="text-xl">Acesse recursos exclusivos e informações detalhadas sobre serviços automotivos em sua região.</p>
            </div>
          </div>
      </section>

      {/* Seção principal com texto e veículos lado a lado */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Uma Proposta Ganha-Ganha</h2>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Em que todos os envolvidos ganham.</h3>
              <p className="text-gray-600 mb-6">
                Encontre os melhores serviços para seu veículo na sua cidade. Pesquise 
                oficinas, autopeças, concessionárias e muito mais.
              </p>
            </div>
            
            {/* Veículos lado a lado */}
            <div className="md:w-1/2 flex flex-row flex-nowrap justify-center items-center gap-6">
              <div className="w-1/3 flex-shrink-0">
                <Image 
                  src="/fluxo_app/images/image001.jpg" 
                  alt="Moto Azul" 
                  width={180} 
                  height={120} 
                  className="vehicle-image"
                />
              </div>
              <div className="w-1/3 flex-shrink-0">
                <Image 
                  src="/fluxo_app/images/image003.jpg" 
                  alt="Carro Vermelho" 
                  width={180} 
                  height={120} 
                  className="vehicle-image"
                />
              </div>
              <div className="w-1/3 flex-shrink-0">
                <Image 
                  src="/fluxo_app/images/image005.jpg" 
                  alt="Carro Branco" 
                  width={180} 
                  height={120} 
                  className="vehicle-image"
                />
              </div>
            </div>
          </div>
      </section>

      {/* Nova seção com espaço para conteúdo futuro */}
      <section className="section-spacer">
        <div className="container mx-auto px-4">
          <Image 
            src="/fluxo_app/images/mc4.png" 
            alt="Conteúdo Futuro" 
            width={800} 
            height={400} 
            className="mx-auto"
          />
        </div>
      </section>

      {/* Nova seção com espaço para conteúdo futuro */}

      {/* Seção de busca com fundo verde */}
      <section className="search-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Começar Agora</h2>
          
          <form onSubmit={handleSubmit} className="search-form max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {/* Campo Estado */}
              <div className="relative">
                <label htmlFor="estado" className="block text-gray-700 font-medium mb-2">Estado</label>
                <input
                  type="text"
                  id="estado"
                  value={estado}
                  onChange={(e) => handleEstadoChange(e.target.value)}
                  placeholder="Digite o estado"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                />
                {sugestoesEstados.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {sugestoesEstados.map((sugestao, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleEstadoSelect(sugestao)}
                      >
                        {sugestao}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Campo Cidade - Agora sem restrição */}
              <div className="relative">
                <label htmlFor="cidade" className="block text-gray-700 font-medium mb-2">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  value={cidade}
                  onChange={(e) => handleCidadeChange(e.target.value)}
                  placeholder="Digite o nome da cidade"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                />
                {sugestoesCidades.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {sugestoesCidades.map((sugestao, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleCidadeSelect(sugestao)}
                      >
                        {sugestao}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Campo O que procura? */}
              <div>
                <label htmlFor="busca" className="block text-gray-700 font-medium mb-2">O que procura?</label>
                <input
                  type="text"
                  id="busca"
                  value={busca}
                  onChange={handleBuscaChange}
                  placeholder="Ex: oficina, autopeças..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Botão de busca */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Buscar Serviços
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coluna 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">GFauto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400 transition duration-300">Home</a></li>
                <li><a href="#" className="hover:text-green-400 transition duration-300">Projeto 156</a></li>
                <li><a href="#" className="hover:text-green-400 transition duration-300">Radares</a></li>
                <li><a href="#" className="hover:text-green-400 transition duration-300">Anuncie</a></li>
                <li><a href="#" className="hover:text-green-400 transition duration-300">Atualize Seus Dados</a></li>
              </ul>
            </div>
            
            {/* Coluna 2 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Contato</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400 transition duration-300">WhatsApp</a></li>
                <li><a href="#" className="hover:text-green-400 transition duration-300">Fale Conosco</a></li>
              </ul>
            </div>
            
            {/* Coluna 3 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Redes Sociais</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400 transition duration-300">Twitter</a></li>
                <li><a href="#" className="hover:text-green-400 transition duration-300">Facebook</a></li>
                <li><a href="#" className="hover:text-green-400 transition duration-300">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>Direitos Reservados - <a href="#" className="text-green-400 hover:underline">www.gfauto.com.br</a> - 2001-2025</p>
          </div>
        </div>
      </footer>
    </>
  );
}
