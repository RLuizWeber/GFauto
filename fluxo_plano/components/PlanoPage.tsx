// Local: GFauto/fluxo_plano/components/
'use client';

import React, { useState } from 'react';
import '../styles/PlanoPage.css';

const PlanoPage = () => {
  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);

  const handlePlanoClick = (plano: string, periodo?: string, valor?: number) => {
    const planoCompleto = periodo ? `${plano}-${periodo}` : plano;
    setPlanoSelecionado(planoCompleto);
    
    // Futuramente redirecionará para cadastro/login
    console.log(`Plano selecionado: ${plano}${periodo ? ` - ${periodo}` : ''}${valor ? ` - R$ ${valor}` : ''}`);
    
    // TODO: Implementar redirecionamento para cadastro/login
    // if (plano === 'cortesia') {
    //   router.push('/cadastro?plano=cortesia');
    // } else {
    //   router.push('/cadastro?plano=premium&periodo=' + periodo + '&valor=' + valor);
    // }
  };

  return (
    <div className="plano-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="logos-container">
            <img 
              src="/fluxo_plano/images/logo_gf.png" 
              alt="GFauto - Plataforma Automotiva" 
              className="logo-gf"
            />
            <img 
              src="/fluxo_plano/images/mc4.png" 
              alt="Mascote GFauto" 
              className="mascote-mc4"
            />
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">
              Anuncie seu serviço/produto automotivo no GFauto
            </h1>
            <h2 className="hero-subtitle">
              Escolha seu Plano
            </h2>
            <p className="hero-description">
              Conecte-se com milhares de clientes que procuram serviços automotivos na sua região
            </p>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section className="planos-section">
        <div className="planos-container">
          <div className="planos-grid">
            
            {/* Plano Cortesia */}
            <div className="plano-card plano-cortesia">
              <div className="plano-header">
                <h3 className="plano-titulo">Plano Cortesia</h3>
                <div className="plano-preco">
                  <span className="preco-valor">Gratuito</span>
                  <span className="preco-periodo">Enquanto existirmos</span>
                </div>
              </div>

              <button 
                className={`btn-plano btn-cortesia ${planoSelecionado === 'cortesia' ? 'selecionado' : ''}`}
                onClick={() => handlePlanoClick('cortesia')}
              >
                Free / Gratuíto
              </button>

              <div className="funcionalidades">
                <h4 className="funcionalidades-titulo">O que está incluído:</h4>
                <ul className="funcionalidades-lista">
                  <li className="funcionalidade-item incluido">
                    <span className="check-icon">✓</span>
                    <span>Dados básicos da empresa</span>
                  </li>
                  <li className="funcionalidade-item incluido">
                    <span className="check-icon">✓</span>
                    <span>Formulário para atualizar informações</span>
                  </li>
	              <li className="funcionalidade-item nao-incluido">
                    <span className="check-icon">✗</span>
                    <span>Foto da fachada ou cartão de visitas</span>
                  </li>
                  <li className="funcionalidade-item incluido">
                    <span className="check-icon">✓</span>
                    <span>Atualização de dados pelo próprio anunciante</span>
                  </li>
                  <li className="funcionalidade-item nao-incluido">
                    <span className="check-icon">✗</span>
                    <span>Aparece abaixo dos anúncios Premium</span>
                  </li>
                  <li className="funcionalidade-item nao-incluido">
                    <span className="check-icon">✗</span>
                    <span>Sem destaque visual especial</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Plano Premium */}
            <div className="plano-card plano-premium destaque">
              <div className="badge-popular">Mais Popular</div>
              
              <div className="plano-header">
                <h3 className="plano-titulo">Plano Premium</h3>
                <div className="plano-preco">
                  <span className="preco-valor">A partir de R$ 36</span>
                  <span className="preco-periodo">por ano</span>
                </div>
              </div>

              <div className="opcoes-premium">
                <button 
                  className={`btn-plano btn-premium ${planoSelecionado === 'premium-1ano' ? 'selecionado' : ''}`}
                  onClick={() => handlePlanoClick('premium', '1 ano', 36)}
                >
                  <span className="periodo">1 Ano</span>
                  <span className="valor">R$ 36,00</span>
                  <span className="descricao">Pagamento único</span>
                </button>
                
                <button 
                  className={`btn-plano btn-premium ${planoSelecionado === 'premium-2anos' ? 'selecionado' : ''}`}
                  onClick={() => handlePlanoClick('premium', '2 anos', 60)}
                >
                  <span className="periodo">2 Anos</span>
                  <span className="valor">R$ 60,00</span>
                  <span className="descricao">Economia de R$ 12</span>
                </button>
                
                <button 
                  className={`btn-plano btn-premium melhor-oferta ${planoSelecionado === 'premium-3anos' ? 'selecionado' : ''}`}
                  onClick={() => handlePlanoClick('premium', '3 anos', 75)}
                >
                  <span className="badge-oferta">Melhor Oferta</span>
                  <span className="periodo">3 Anos</span>
                  <span className="valor">R$ 75,00</span>
                  <span className="descricao">Economia de R$ 33</span>
                </button>
              </div>

              <div className="funcionalidades">
                <h4 className="funcionalidades-titulo">Tudo do Cortesia, mais:</h4>
                <ul className="funcionalidades-lista">
                  <li className="funcionalidade-item incluido">
                    <span className="check-icon">✓</span>
                    <span>Aparece sempre no topo da lista</span>
                  </li>
                  <li className="funcionalidade-item incluido">
                    <span className="check-icon">✓</span>
                    <span>Destaque visual com badge "Premium"</span>
                  </li>
                  <li className="funcionalidade-item incluido">
                    <span className="check-icon">✓</span>
                    <span>Busca de localização pelo Google</span>
                  </li>
                  <li className="funcionalidade-item incluido">
                    <span className="check-icon">✓</span>
                    <span>Rotação entre anúncios Premium</span>
                  </li>
                  <li className="funcionalidade-item incluido">
                    <span className="check-icon">✓</span>
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gatilho Mental */}
         <div className="roi-section">
			<div className="roi-card">
				<h3 className="roi-titulo">💰 Retorno Garantido</h3>
					<p className="roi-texto">
						Se você conseguir <strong>apenas 1 cliente no ano</strong>,
						o investimento já estará <strong>mais do que pago</strong>.
					</p>
				</div>
			</div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="preview-section">
        <div className="preview-container">
          <div className="preview-header">
            <h3 className="preview-titulo">Como seu anúncio vai aparecer</h3>
            <p className="preview-subtitulo">Veja a diferença entre os planos na prática</p>
          </div>

          <div className="busca-exemplo">
            <div className="busca-input">
              <span>🔍 Autopeças em São Paulo/SP</span>
            </div>
          </div>

          {/* Anúncios Premium */}
          <div className="anuncios-premium">
            <div className="secao-titulo">
              <span className="badge-premium">Anúncios Premium</span>
              <span className="posicao">Aparecem primeiro</span>
            </div>

            <div className="anuncio-card premium-demo">
              <div className="anuncio-content">
                <div className="anuncio-imagem">
                  <img src="/fluxo_plano/images/carrao.jpg" alt="Auto Peças Carrão" />
                </div>
                <div className="anuncio-info">
                  <h4>Auto Peças Carrão</h4>
                  <p>Auto Peças Novas e Usadas • Nacionais e Importadas</p>
                  <div className="contato">
                    <span>📞 (11) 0000-1111</span>
                    <span>📱 WhatsApp</span>
                  </div>
                  <p className="endereco">Rua das Flores, 721 - Centro - São Paulo/SP</p>
                </div>
                <div className="anuncio-acoes">
                  <button className="btn-acao">Localizar no Mapa</button>
                  <button className="btn-acao">Atualizar Dados</button>
                </div>
              </div>
            </div>

            <div className="anuncio-card premium-demo">
              <div className="anuncio-content">
                <div className="anuncio-imagem">
                  <img src="/fluxo_plano/images/Mas.jpg" alt="Mas Auto Peças" />
                </div>
                <div className="anuncio-info">
                  <h4>Mas Auto Peças</h4>
                  <p>Tudo em Peças para o Seu Veículo • Seriedade e Confiança</p>
                  <div className="contato">
                    <span>📞 (11) 0000-1111</span>
                    <span>📱 WhatsApp</span>
                  </div>
                  <p className="endereco">Rua Tiradentes, 1.359 - Centro - São Paulo/SP</p>
                </div>
                <div className="anuncio-acoes">
                  <button className="btn-acao">Localizar no Mapa</button>
                  <button className="btn-acao">Atualizar Dados</button>
                </div>
              </div>
            </div>
          </div>

          {/* Anúncios Cortesia */}
          <div className="anuncios-cortesia">
            <div className="secao-titulo">
              <span className="badge-cortesia">Anúncios Cortesia</span>
              <span className="posicao">Aparecem depois dos Premium</span>
            </div>

            <div className="lista-cortesia">
              <div className="item-cortesia">
                <span className="nome">Kuaze Nova Autopeças</span>
                <span className="endereco">Rua Frei Francisco, 320 - Jardins - São Paulo/SP</span>
              </div>
              <div className="item-cortesia">
                <span className="nome">Rigo Autopeças</span>
                <span className="endereco">Rua Coronel Vicente, 1.431 - Centro - São Paulo/SP</span>
              </div>
              <div className="item-cortesia">
                <span className="nome">Barreto Autopeças</span>
                <span className="endereco">Av. Brasil, 3.420 - Loja 08 - Centro - São Paulo/SP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-section">
        <div className="cta-container">
          <h3 className="cta-titulo">Pronto para começar?</h3>
          <p className="cta-texto">
            Escolha seu plano e comece a receber clientes hoje mesmo
          </p>
          <div className="cta-buttons">
            <button 
              className="btn-cta btn-cortesia-cta"
              onClick={() => handlePlanoClick('cortesia')}
            >
              Começar Grátis
            </button>
            <button 
              className="btn-cta btn-premium-cta"
              onClick={() => handlePlanoClick('premium', '1 ano', 36)}
            >
              Escolher Premium
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanoPage;