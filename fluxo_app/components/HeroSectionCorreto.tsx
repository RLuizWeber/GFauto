'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../styles/HeroSection.css';

// Dados simulados de estados e cidades
const ESTADOS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const CIDADES_POR_ESTADO: { [key: string]: string[] } = {
  'SP': ['São Paulo', 'Campinas', 'Guarulhos', 'Santos', 'São Bernardo do Campo'],
  'RJ': ['Rio de Janeiro', 'Niterói', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
};

export default function HeroSectionCorreto() {
  const router = useRouter();
  const [estado, setEstado] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidade, setCidade] = useState('');
  const [busca, setBusca] = useState('');
  const [sugestoesEstados, setSugestoesEstados] = useState<string[]>([]);
  const [sugestoesCidades, setSugestoesCidades] = useState<string[]>([]);

  // Filtrar estados com base na entrada do usuário
  useEffect(() => {
    if (estado.trim() !== '') {
      const estadosFiltrados = ESTADOS.filter(e =>
        e.toLowerCase().includes(estado.toLowerCase())
      );
      setSugestoesEstados(estadosFiltrados);
    } else {
      setSugestoesEstados([]);
    }
  }, [estado]);

  // Filtrar cidades com base no estado selecionado e entrada do usuário
  useEffect(() => {
    if (cidade.trim() !== '') {
      setSugestoesCidades([]);
      return;
    }

    if (estadoSelecionado) {
      const cidadesDoEstado = CIDADES_POR_ESTADO[estadoSelecionado] || [];
      const cidadesFiltradas = cidadesDoEstado.filter(c =>
        c.toLowerCase().includes(cidade.toLowerCase())
      );
      setSugestoesCidades(cidadesFiltradas);
    } else {
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
    
    if (!estado.trim() || !cidade.trim() || !busca.trim()) {
      alert('Por favor, preencha todos os campos antes de buscar.');
      return;
    }

    const searchParams = new URLSearchParams({
      estado: estado.trim(),
      cidade: cidade.trim(),
      busca: busca.trim()
    });

    router.push(`/resultados?${searchParams.toString()}`);
  };

  return (
    <>
      {/* Header com azul sólido e cantos arredondados */}
      <section className="hero-header">
        <div className="container mx-auto px-4">
          <Image
            src="/fluxo_app/images/logo.png"
            alt="GFauto Logo"
            width={250}
            height={250}
            className="logo-image"
          />
          <h1 className="hero-title">Bem Vindo!</h1>
          <p className="hero-subtitle">
            Acesse recursos exclusivos e informações detalhadas sobre serviços automotivos em sua região.
          </p>
        </div>
      </section>

      {/* Seção Uma Proposta Ganha-Ganha */}
      <section className="ganha-ganha-section">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Uma Proposta Ganha-Ganha</h2>
          <h3 className="section-subtitle">Em que todos os envolvidos ganham.</h3>
          <p className="section-description">
            Encontre os melhores serviços para seu veículo na sua cidade. Pesquise oficinas, autopeças, concessionárias e muito mais.
          </p>
          
          {/* Imagens dos veículos */}
          <div className="vehicles-grid">
            <Image
              src="/fluxo_app/images/image003.jpg"
              alt="Motocicleta"
              width={180}
              height={120}
              className="vehicle-image"
            />
            <Image
              src="/fluxo_app/images/image001.jpg"
              alt="Carro Vermelho"
              width={180}
              height={120}
              className="vehicle-image"
            />
            <Image
              src="/fluxo_app/images/image005.jpg"
              alt="SUV Prata"
              width={180}
              height={120}
              className="vehicle-image"
            />
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

      {/* Seção Começar Agora com faixa verde */}
      <section className="comecar-agora-section">
        <div className="container mx-auto px-4">
          <h2 className="comecar-title">Começar Agora</h2>
          
          <form onSubmit={handleSubmit} className="busca-form">
            <div className="form-group">
              <label htmlFor="estado" className="form-label">Estado:</label>
              <input
                type="text"
                id="estado"
                value={estado}
                onChange={(e) => handleEstadoChange(e.target.value)}
                placeholder="Digite o estado"
                className="form-input"
                autoComplete="off"
              />
              {sugestoesEstados.length > 0 && (
                <ul className="suggestions-list">
                  {sugestoesEstados.map((sugestao, index) => (
                    <li
                      key={index}
                      onClick={() => handleEstadoSelect(sugestao)}
                      className="suggestion-item"
                    >
                      {sugestao}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cidade" className="form-label">Cidade:</label>
              <input
                type="text"
                id="cidade"
                value={cidade}
                onChange={(e) => handleCidadeChange(e.target.value)}
                placeholder="Digite o nome da cidade"
                className="form-input"
                autoComplete="off"
              />
              {sugestoesCidades.length > 0 && (
                <ul className="suggestions-list">
                  {sugestoesCidades.map((sugestao, index) => (
                    <li
                      key={index}
                      onClick={() => handleCidadeSelect(sugestao)}
                      className="suggestion-item"
                    >
                      {sugestao}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="busca" className="form-label">O que procura?</label>
              <input
                type="text"
                id="busca"
                value={busca}
                onChange={handleBuscaChange}
                placeholder="Ex: oficina, autopeças..."
                className="form-input"
                autoComplete="off"
              />
            </div>

            <button type="submit" className="buscar-button">
              Buscar Serviços
            </button>
          </form>
        </div>
      </section>

      {/* Rodapé baseado em www.gfauto.com.br */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-column">
            <h3 className="footer-title">GFauto</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/projeto156">Projeto 156</a></li>
              <li><a href="/radares">Radares</a></li>
              <li><a href="/anuncie">Anuncie</a></li>
              <li><a href="/atualize">Atualize Seus Dados</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Contato</h3>
            <ul className="footer-links">
              <li><a href="/whatsapp">WhatsApp</a></li>
              <li><a href="/contato">Fale Conosco</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Redes Sociais</h3>
            <ul className="footer-links">
              <li><a href="/twitter">Twitter</a></li>
              <li><a href="/facebook">Facebook</a></li>
              <li><a href="/instagram">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>Direitos Reservados - GFauto - 2001-2025</p>
        </div>
      </footer>
    </>
  );
}

